import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { BLE } from '@ionic-native/ble/ngx';

import { NextObserver, Observable, Subject, empty, from, interval, of } from 'rxjs';
import { distinct, distinctUntilChanged, filter, finalize, map, tap, startWith, switchMap } from 'rxjs/operators';

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

class BLEPeripheral implements Peripheral {

  type = 'ble';

  name: string;

  address: string;

  lastWritten: string;

  constructor(device: any, private ble: BLE, private logger: LoggingService) {
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
      let isConnected = false;
      let lastReceived = null;
      this.lastWritten = null;
      this.ble.connect(this.address).subscribe({
        next: peripheral => {
          this.logger.info('Connected to BLE device', peripheral);
          isConnected = true;
          this.ble.startNotification(this.address, SERVICE_UUID, NOTIFY_UUID).subscribe({
            next: ([data, _]) => {
              if (this.logger.isDebugEnabled()) {
                const s = bufferToString(data);
                if (s !== lastReceived) {
                  this.logger.debug('BLE received ' + s);
                  lastReceived = s;
                }
              }
              this.onNotify(data, subscriber);
            },
            error: err => this.onError(err, subscriber)
          });
          if (connected) {
            // this should resolve *after* this.ble.startNotification is installed
            this.ble.isConnected(this.address).then(() => {
              this.logger.info('BLE device ready');
              if (isConnected) {
                connected.next(undefined);
              }
            }).catch((err) => {
              this.logger.error('BLE device not connected', err);
            });
          }
        },
        error: obj => {
          if (obj instanceof Error) {
            this.logger.error('BLE connection error', obj);
            subscriber.error(obj);
          } else if (!isConnected) {
            this.logger.error('BLE connection error', obj);
            subscriber.error(new Error('Connection error'));
          } else {
            this.logger.info('BLE device disconnected', obj);
            subscriber.complete();
          }
          isConnected = false;
        },
        complete: () => {
          this.logger.info('BLE connection closed');
          subscriber.complete();
          isConnected = false;
        }
      });
      return () => {
        this.disconnect(disconnected);
      };
    });
  }

  private createObserver(disconnected?: NextObserver<void>) {
    return {
      next: (value: ArrayBuffer) => {
        if (this.logger.isDebugEnabled()) {
          const s = bufferToString(value);
          if (s !== this.lastWritten) {
            this.logger.debug('BLE write ' + s);
            this.lastWritten = s;
          }
        }
        this.write(value);
      },
      error: (err: any) => this.logger.error('BLE user error', err),
      complete: () => this.disconnect(disconnected)
    };
  }

  private write(value: ArrayBuffer) {
    this.ble.writeWithoutResponse(this.address, SERVICE_UUID, OUTPUT_UUID, value).catch(error => {
      this.logger.error('BLE write error', error);
    });
  }

  private disconnect(disconnected?: NextObserver<void>) {
    this.logger.debug('Closing BLE connection to ' + this.address);
    this.ble.disconnect(this.address).then(() => {
      this.logger.info('BLE disconnected from ' + this.address);
    }).catch(error => {
      this.logger.error('BLE disconnect error', error);
    }).then(() => {
      if (disconnected) {
        disconnected.next(undefined);
      }
    });
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
export class BLEBackend extends Backend {

  private scanner: Observable<any>;

  constructor(private ble: BLE, private logger: LoggingService, private platform: Platform) {
    super();

    this.scanner = from(this.platform.ready()).pipe(
      switchMap(readySource => {
        if (readySource == 'cordova') {
          // TODO: use BLE state listeners when available in ionic-native?
          return interval(1000).pipe(
            startWith(null),
            switchMap(() => {
              return from(this.ble.isEnabled().then(() => true, () => false));
            })
          );
        } else {
          return of(false);
        }
      }),
      distinctUntilChanged(),
      switchMap(enabled => {
        if (enabled) {
          this.logger.debug('Start scanning for BLE devices');
          return this.ble.startScanWithOptions([], { reportDuplicates: true }).pipe(
            finalize(() => this.logger.debug('Stop scanning for BLE devices'))
          );
        } else {
          this.logger.debug('Not scanning for BLE devices');
          return empty();
        }
      })
    );
  }

  scan(): Observable<Peripheral> {
    return this.scanner.pipe(
      distinct(device => device.id),
      tap(device => this.logger.debug('Discovered BLE device:', device)),
      filter(device => /Control.Unit/i.test(device.name || '')),
      tap(device => this.logger.info('Discovered new BLE device:', device)),
      map(device => new BLEPeripheral(device, this.ble, this.logger))
    );
  }
}
