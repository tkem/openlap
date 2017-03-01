import { Injectable, NgZone } from '@angular/core';

import { Platform } from 'ionic-angular';

import { BLE } from 'ionic-native';

import { Observable, Subject } from 'rxjs';
import { NextObserver } from 'rxjs/Observer';

import { Backend } from './backend';
import { Peripheral } from '../carrera';
import { Logger } from '../logging';

const SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
const OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
const NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';

const DOLLAR = '$'.charCodeAt(0);

function wrapNative<T>(observable: Observable<T>, zone: NgZone) {
  return new Observable<T>(subscriber => {
    const subscription = observable.subscribe({
      next: obj => zone.run(() => subscriber.next(obj)),
      error: obj => zone.run(() => subscriber.error(obj)),
      complete: () => zone.run(() => subscriber.complete())
    });
    return () => {
      subscription.unsubscribe();
    };
  });
}

class BLEPeripheral implements Peripheral {

  type = 'ble';

  name: string;

  address: string;

  constructor(device: any, private logger: Logger, private zone: NgZone) {
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
      this.logger.debug('Connecting to BLE device ' + this.address);
      let isConnected = false;
      BLE.connect(this.address).subscribe({
        next: peripheral => {
          this.logger.info('Connected to BLE device', peripheral);
          isConnected = true;
          BLE.startNotification(this.address, SERVICE_UUID, NOTIFY_UUID).subscribe({
            next: data => this.onNotify(data, subscriber),
            error: err => this.onError(err, subscriber)
          });
          if (connected) {
            this.zone.run(() => connected.next(undefined));
          }
        },
        error: obj => {
          if (obj instanceof Error) {
            this.logger.error('BLE connection error', obj);
            this.zone.run(() => subscriber.error(obj));
          } else if (!isConnected) {
            this.logger.error('BLE connection error', obj);
            this.zone.run(() => subscriber.error(new Error('Connection error')));
          } else {
            this.logger.info('BLE device disconnected', obj);
            this.zone.run(() => subscriber.complete());
          }
        },
        complete: () => {
          this.logger.info('BLE connection closed');
          this.zone.run(() => subscriber.complete());
        }
      });
      return () => {
        this.disconnect(disconnected);
      };
    });
  }

  private createObserver(disconnected?: NextObserver<void>) {
    return {
      next: (value: ArrayBuffer) => this.write(value),
      error: (err: any) => this.logger.error('BLE user error', err),
      complete: () => this.disconnect(disconnected)
    };
  }

  private write(value: ArrayBuffer) {
    //this.logger.debug('BLE write', this.address, value);
    BLE.writeWithoutResponse(this.address, SERVICE_UUID, OUTPUT_UUID, value).catch(error => {
      this.logger.error('BLE write error', error);
    });
  }

  private disconnect(disconnected?: NextObserver<void>) {
    this.logger.debug('Closing BLE connection to ' + this.address);
    BLE.disconnect(this.address).then(() => {
      this.logger.info('BLE disconnected from ' + this.address);
    }).catch(error => {
      this.logger.error('BLE disconnect error', error);
    }).then(() => {
      if (disconnected) {
        this.zone.run(() => disconnected.next(undefined));
      }
    });
  }

  private onNotify(data, subscriber) {
    // strip trailing '$' and prepend missing '0'/'?' for notifications
    // TODO: only handle version specially and drop '?'?
    let view = new Uint8Array(data);
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
export class BLEBackend extends Backend {

  private scanner: Observable<any>;

  constructor(private logger: Logger, private platform: Platform, private zone: NgZone) {
    super();

    this.scanner = Observable.from(platform.ready()).switchMap(readySource => {
      if (readySource == 'cordova') {
        // TODO: use BLE state listeners when available in ionic-native?
        return Observable.interval(1000).startWith(null).switchMap(() => {
          return Observable.from(BLE.isEnabled().then(() => true, () => false));
        });
      } else {
        return Observable.of(false);
      }
    }).distinctUntilChanged().switchMap(enabled => {
      if (enabled) {
        return wrapNative(BLE.startScanWithOptions([], { reportDuplicates: true }), this.zone);
      } else {
        return Observable.empty();
      } 
    }).share();
  }

  scan(): Observable<Peripheral> {
    // TODO: use and adapt rssi?
    return this.scanner.distinct(device => device.id).do(device => {
      this.logger.debug('Found BLE device', device);
    }).filter(device => {
      return /Control.Unit/i.test(device.name || '');
    }).map(device => {
      this.logger.info('New BLE device', device);
      return new BLEPeripheral(device, this.logger, this.zone);
    });
  }
}
