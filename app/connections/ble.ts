import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { BLE } from 'ionic-native';

import { Connection, Device, ConnectionProvider } from './connection';

const SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
const OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
const NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';

const DOLLAR = '$'.charCodeAt(0);

export class BLEConnection extends Subject<ArrayBuffer> implements Connection {

  private subscription: any;

  private logEnabled = false;
  
  constructor(private peripheral) {
    super();
    this.log('Creating BLE connection');
    BLE.startNotification(peripheral.id, SERVICE_UUID, NOTIFY_UUID).map(data => {
      this.log('Received BLE data', data);
      // strip trailing '$' and prepend missing '0'/'?' for notifications
      let view = new Uint8Array(data);
      if (view[view.length - 1] == DOLLAR) {
        view.copyWithin(1, 0);
        view[0] = view.length == 6 ? 0x30 : 0x3f;
      }
      return view.buffer;
    }).subscribe(this);
  }

  send(data: ArrayBuffer) {
    this.log('Sending BLE data', data);
    BLE.writeWithoutResponse(this.peripheral.id, SERVICE_UUID, OUTPUT_UUID, data);
  }

  close() {
    this.log('Closing BLE connection');
    BLE.disconnect(this.peripheral.id);
  }
  
  private log(message: string, data?: ArrayBuffer) {
    if (this.logEnabled) {
      let now = Date.now();
      if (data) {
        console.log(now.toString() + ": " + message + " " + String.fromCharCode.apply(null, new Uint8Array(data)));
      } else {
        console.log(now.toString() + ": " + message);
      }
    }
  }
}

@Injectable()
export class BLEProvider extends ConnectionProvider {
  connect(device: Device) {
    return new Promise((resolve, reject) => {
      BLE.connect(device.id).subscribe(peripheral => resolve(new BLEConnection(peripheral)), reject);
    });
  }
}
