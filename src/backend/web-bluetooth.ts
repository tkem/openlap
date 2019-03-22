import { Injectable, NgZone } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Observable, Subject } from 'rxjs';
import { NextObserver } from 'rxjs/Observer';

import { Backend } from './backend';
import { DataView, Peripheral } from '../carrera';
import { Logger } from '../core';

const SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
const OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
const NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';

const DOLLAR = '$'.charCodeAt(0);

function bufferToString(buffer: ArrayBuffer) {
  // TODO: special DataView.convertToString() method?
  const v = new DataView(buffer);
  return v.toString();
}

class WebBluetoothPeripheral implements Peripheral {

  type = 'web-bluetooth';

  name: string;

  address: string;

  output: Promise<any>;

  lastWritten: string;

  constructor(private device: any, private logger: Logger, private zone: NgZone) {
    this.name = device.name;
    this.address = device.id;
  }

  connect(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    const observable = this.createObservable(connected, disconnected)
    const observer = this.createObserver(disconnected);
    return Subject.create(observer, observable);
  }

  equals(other: Peripheral) {
    return other && other.type === this.type && other.address === this.address;
  }

  private createObservable(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    return new Observable<ArrayBuffer>(subscriber => {
      this.logger.info('Connecting to BLE device ' + this.address);
      const service = this.device.gatt.connect().then(server => {
        return server.getPrimaryService(SERVICE_UUID);
      });
      const notify = service.then(s => s.getCharacteristic(NOTIFY_UUID));
      const eventListener = (event) => {
        const data = event.target.value.buffer;
        if (this.logger.isDebugEnabled()) {
          const s = bufferToString(data);
          if (s !== lastReceived) {
            this.logger.debug('BLE received ' + s);
            lastReceived = s;
          }
        }
        this.onNotify(data, subscriber);
      };
      let lastReceived = null;
      this.lastWritten = null;
      this.output = service.then(s => s.getCharacteristic(OUTPUT_UUID));
      notify.then(characteristic => {
        return characteristic.startNotifications().then(_ => characteristic);
      }).then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', eventListener);
        this.logger.info('BLE device ready');
        if (connected) {
          this.zone.run(() => connected.next(undefined));
        }
      }).catch(error => {
        this.onError(error, subscriber);
      });
      return () => {
        notify.then(characteristic => {
          return characteristic.stopNotifications().then(_ => characteristic);
        }).then(characteristic => {
            characteristic.removeEventListener('characteristicvaluechanged', eventListener);
        }).catch(error => {
            this.logger.error('Error stopping BLE notifications', error);
        }).then(_ => {
          this.disconnect(disconnected);
        });
      };
    });
  }

  private createObserver(disconnected?: NextObserver<void>) {
    return {
      next: (value: ArrayBuffer) => {
        if (this.device.gatt.connected && this.output) {
          if (this.logger.isDebugEnabled()) {
            const s = bufferToString(value);
            if (s !== this.lastWritten) {
              this.logger.debug('BLE write ' + s);
              this.lastWritten = s;
            }
          }
          this.output.then(characteristic => {
            return characteristic.writeValue(value);
          }).catch(error => {
            this.logger.error('BLE write error', error);
          });
        } else {
          this.logger.error('BLE write while device disconnected');
        }
      },
      error: (err: any) => this.logger.error('BLE user error', err),
      complete: () => this.disconnect(disconnected)
    };
  }

  private disconnect(disconnected?: NextObserver<void>) {
    if (this.device.gatt.connected) {
      this.logger.debug('Closing BLE connection to ' + this.address);
      try {
        this.device.gatt.disconnect();
      } catch (error) {
        this.logger.debug('Error closing BLE connection', error);
      }
      this.output = null;
      if (disconnected) {
        this.zone.run(() => disconnected.next(undefined));
      }
    }
  }

  private onNotify(data, subscriber) {
    // strip trailing '$' and prepend missing '0'/'?' for notifications
    // TODO: only handle version specially and drop '?'?
    const view = new Uint8Array(data);
    if (view[view.length - 1] == DOLLAR) {
      view.copyWithin(1, 0);
      view[0] = view.length == 6 ? 0x30 : 0x3f;
    }
    this.zone.run(() => subscriber.next(view.buffer));
  }

  private onError(error, subscriber) {
    this.zone.run(() => subscriber.error(error));
  }
}

@Injectable()
export class WebBluetoothBackend extends Backend {

  private navigator: any = window.navigator;

  private device: Promise<any>;

  constructor(private logger: Logger, private platform: Platform, private zone: NgZone) {
    super();
  }

  scan(): Observable<Peripheral> {
    return Observable.from(this.platform.ready()).switchMap(readySource => {
      if (readySource != 'cordova' && this.navigator.bluetooth) {
        return Observable.from(this.requestDevice()).catch(err => {
          this.logger.error('Error requesting BLE device', err);
          return Observable.empty();
        });
      } else {
        return Observable.empty();
      }
    });
  }

  private requestDevice(): Promise<any> {
    if (this.device) {
      return this.device;  // avoid multiple pop-up dialogs
    } else {
      return this.navigator.bluetooth.requestDevice({
        filters: [{ name: 'Control_Unit' }],
        optionalServices: [SERVICE_UUID]
      }).then(device => {
        const p = new WebBluetoothPeripheral(device, this.logger, this.zone);
        this.device = Promise.resolve(p);
        return p;
      });
    }
  }
}
