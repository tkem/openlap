import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { NextObserver, Observable, Subject, empty, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Backend } from './backend';
import { DataView, Peripheral } from '../carrera';
import { LoggingService } from '../services';

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

  constructor(private device: any, private logger: LoggingService) {
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
      this.logger.info('Connecting to Web Bluetooth device ' + this.address);
      const service = this.device.gatt.connect().then(server => {
        return server.getPrimaryService(SERVICE_UUID);
      });
      const notify = service.then(s => s.getCharacteristic(NOTIFY_UUID));
      const eventListener = (event) => {
        const data = event.target.value.buffer;
        if (this.logger.isDebugEnabled()) {
          const s = bufferToString(data);
          if (s !== lastReceived) {
            this.logger.debug('Web Bluetooth received ' + s);
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
        this.logger.info('Web Bluetooth device ready');
        if (connected) {
          connected.next(undefined);
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
            this.logger.error('Error stopping Web Bluetooth notifications', error);
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
              this.logger.debug('Web Bluetooth write ' + s);
              this.lastWritten = s;
            }
          }
          this.output.then(characteristic => {
            return characteristic.writeValue(value);
          }).catch(error => {
            this.logger.error('Web Bluetooth write error', error);
          });
        } else {
          this.logger.error('Web Bluetooth write while device disconnected');
        }
      },
      error: (err: any) => this.logger.error('Web Bluetooth user error', err),
      complete: () => this.disconnect(disconnected)
    };
  }

  private disconnect(disconnected?: NextObserver<void>) {
    if (this.device.gatt.connected) {
      this.logger.debug('Closing Web Bluetooth connection to ' + this.address);
      try {
        this.device.gatt.disconnect();
      } catch (error) {
        this.logger.debug('Error closing Web Bluetooth connection', error);
      }
      this.output = null;
      if (disconnected) {
        disconnected.next(undefined);
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
    subscriber.next(view.buffer);
  }

  private onError(error, subscriber) {
    subscriber.error(error);
  }
}

@Injectable()
export class WebBluetoothBackend extends Backend {

  private navigator: any = window.navigator;

  private device: Promise<any>;

  constructor(private logger: LoggingService, private platform: Platform) {
    super();
  }

  scan(): Observable<Peripheral> {
    return from(this.platform.ready()).pipe(
      switchMap(readySource => {
        if (readySource != 'cordova' && this.navigator.bluetooth) {
          return from(this.requestDevice()).pipe(
            catchError(err => {
              this.logger.error('Error requesting Web Bluetooth device', err);
              return empty();
            })
          );
        } else {
          return empty();
        }
      })
    );
  }

  private requestDevice(): Promise<any> {
    if (this.device) {
      return this.device;  // avoid multiple pop-up dialogs
    } else {
      return this.navigator.bluetooth.requestDevice({
        filters: [{ name: 'Control_Unit' }],
        optionalServices: [SERVICE_UUID]
      }).then(device => {
        const p = new WebBluetoothPeripheral(device, this.logger);
        this.device = Promise.resolve(p);
        return p;
      });
    }
  }
}
