import { NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Connection } from '../cu';
import { Logger } from '../logger';

const SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
const OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
const NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';

const DOLLAR = '$'.charCodeAt(0);

export class BLEConnection extends Subject<ArrayBuffer> implements Connection {
  
  constructor(private ble: any, private peripheral: any, private zone: NgZone, private logger?: Logger) {
    super();
    this.log('Creating BLE connection');
    this.ble.startNotification(
      this.peripheral.id, SERVICE_UUID, NOTIFY_UUID,
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
      error => {
        this.zone.run(() => this.error(error));
      }
    );
  }

  write(data: ArrayBuffer) {
    this.log('Sending BLE data', data);
    return new Promise<void>((resolve, reject) => {
      this.ble.writeWithoutResponse(
        this.peripheral.id, SERVICE_UUID, OUTPUT_UUID, data,
        () => this.zone.run(resolve),
        error => this.zone.run(() => reject(error))
      );
    });
  }

  close() {
    this.log('Closing BLE connection');
    return new Promise<void>((resolve, reject) => {
      this.ble.disconnect(
        this.peripheral.id,
        () => this.zone.run(() => { this.complete(); resolve() }),
        error => this.zone.run(() => reject(error))
      );
    });
  }
  
  private log(message: string, data?: ArrayBuffer) {
    if (this.logger) {
      let now = Date.now();
      if (data) {
        this.logger.debug(now.toString() + ": " + message + " " + String.fromCharCode.apply(null, new Uint8Array(data)));
      } else {
        this.logger.debug(now.toString() + ": " + message);
      }
    }
  }

  static connect(ble: any, id: string, zone: NgZone, logger: Logger) {
    return new Promise<Connection>((resolve, reject) => {
      ble.connect(
        id, 
        peripheral => resolve(new BLEConnection(ble, peripheral, zone, logger)), 
        reject
      );
    });
  }
}
