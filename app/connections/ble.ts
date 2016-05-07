import {Connection, Device, Provider} from './connection';
import {EventEmitter, Injectable} from 'angular2/core';
import {BLE} from 'ionic-native';
import 'rxjs/add/operator/map';

const SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
const OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
const NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';

const DOLLAR = '$'.charCodeAt(0);

export class BLEConnection implements Connection {

  private emitter: any;

  constructor(private peripheral) {
    console.log('Create BLE connection', peripheral);
    this.emitter = BLE.startNotification(peripheral.id, SERVICE_UUID, NOTIFY_UUID).map(data => {
      // strip trailing '$' and prepend missing '0'/'?' for notifications
      let view = new Uint8Array(data);
      if (view[view.length - 1] == DOLLAR) {
        view.copyWithin(1, 0);
        view[0] = view.length == 6 ? 0x30 : 0x3f;
      }
      return view.buffer;
    });
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any) {
    this.emitter.subscribe(generatorOrNext, error, complete);
  }

  send(data: ArrayBuffer) {
    BLE.writeWithoutResponse(this.peripheral.id, SERVICE_UUID, OUTPUT_UUID, data);
  }

  close() {
    BLE.disconnect(this.peripheral.id);
  }
}

@Injectable()
export class BLEProvider extends Provider {
  constructor() {
    super();
    BLE.enable().then(() => {
      console.log("Bluetooth is enabled");
    });
  }

  connect(device: Device) {
    return BLE.connect(device.id).map(peripheral => new BLEConnection(peripheral));
  }

  scan() {
    // TODO: stopScan() when disposed
    return BLE.startScan([/*SERVICE_UUID*/]);
  }
}
