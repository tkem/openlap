import { Injectable, NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Connection, Device, ConnectionProvider } from './connection';
import { Logger, Plugins } from '../providers';

const SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
const OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
const NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';

const DOLLAR = '$'.charCodeAt(0);

export class BLEConnection extends Subject<ArrayBuffer> implements Connection {

  private logEnabled = false;
  
  constructor(private ble: any, private logger: Logger, private zone: NgZone, private peripheral: any) {
    super();
    this.log('Creating BLE connection');
    this.ble.startNotification(this.peripheral.id, SERVICE_UUID, NOTIFY_UUID,
      data => {
        this.log('Received BLE data', data);
        // strip trailing '$' and prepend missing '0'/'?' for notifications
        let view = new Uint8Array(data);
        if (view[view.length - 1] == DOLLAR) {
          view.copyWithin(1, 0);
          view[0] = view.length == 6 ? 0x30 : 0x3f;
        }
        this.zone.run(() => this.next(view.buffer)); 
      },
      error => this.error(error)
    );
  }

  send(data: ArrayBuffer) {
    this.log('Sending BLE data', data);
    this.ble.writeWithoutResponse(this.peripheral.id, SERVICE_UUID, OUTPUT_UUID, data,
      undefined,
      error => this.error(error)
    );
  }

  close() {
    this.log('Closing BLE connection');
    this.ble.disconnect(this.peripheral.id);
    this.zone.run(() => this.complete());
  }
  
  error(e: any) {
    this.logger.error("BLE connection error", e);
    this.ble.disconnect(this.peripheral.id);
    this.zone.run(() => super.error(e));
  }

  private log(message: string, data?: ArrayBuffer) {
    if (this.logEnabled) {
      let now = Date.now();
      if (data) {
        this.logger.debug(now.toString() + ": " + message + " " + String.fromCharCode.apply(null, new Uint8Array(data)));
      } else {
        this.logger.debug(now.toString() + ": " + message);
      }
    }
  }
}

@Injectable()
export class BLEProvider extends ConnectionProvider {
  constructor(private logger: Logger, private plugins: Plugins, private zone: NgZone) {
    super();
  }   

  connect(device: Device) {
    return this.enable().then(ble => {
      return new Promise<Connection>((resolve, reject) => {
        ble.connect(
          device.id, 
          peripheral => resolve(new BLEConnection(ble, this.logger, this.zone, peripheral)), 
          reject
        );
      });
    });
  }

  private enable(): Promise<any> {
    return this.plugins.get('ble').then(ble => {
      return new Promise((resolve, reject) => {
        ble.enable(() => resolve(ble), () => reject(new Error('BLE not enabled')));
      });
    });
  }
}
