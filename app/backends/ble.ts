import { Injectable, NgZone } from '@angular/core';

import { Platform } from 'ionic-angular';

import { BLE } from 'ionic-native';

import { Peripheral } from '../carrera';

import { Observable, Observer, NextObserver, Subject, Subscription } from '../rxjs';

import { Logger } from '../providers';

import { Backend } from './backend';

const SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
const OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
const NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';

const DOLLAR = '$'.charCodeAt(0);

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
    return new Subject<ArrayBuffer>(observer, observable);
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
          this.logger.info('Connected to BLE device:', peripheral);
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
            this.logger.error('BLE connection error:', obj);
            this.zone.run(() => subscriber.error(obj));
          } else if (!isConnected) {
            this.logger.error('BLE connection error:', obj);
            this.zone.run(() => subscriber.error(new Error('Connection error')));
          } else {
            this.logger.info('BLE device disconnected:', obj);
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
      error: (err: any) => this.logger.error('BLE user error:', err),
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
      this.logger.error('BLE disconnect error:', error);
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

  private onClose(subscriber) {
    this.zone.run(() => subscriber.error('close'));
  }
}

@Injectable()
export class BLEBackend extends Backend {

  private enabled: Promise<void>;

  private peripherals = {};

  constructor(private logger: Logger, private platform: Platform, private zone: NgZone) {
    super();
    this.enabled = this.platform.ready().then(() => {
      return BLE.enable();  // only present Bluetooth dialog once
    });
  }

  protected _subscribe(subscriber) {
    // TODO: BLE.startScanWithOptions()?
    for (let id of Object.keys(this.peripherals)) {
      this.zone.run(() => subscriber.next(this.peripherals[id]));
    }
    let promise = new Promise<Subscription>((resolve, reject) => {
      // TODO: BLE.enabled(), since user may activate Bluetooth later...
      this.enabled.then(() => {
        // TODO: BLE.startScan([SERVICE_UUID]) not working?
        let subscription = BLE.startScan([]).subscribe({
          next: device => {
            if (!(device.id in this.peripherals)) {
              let peripheral = new BLEPeripheral(device, this.logger, this.zone);
              this.zone.run(() => subscriber.next(peripheral));
              this.peripherals[device.id] = peripheral;
            }
          }, 
          error: err => {
            this.zone.run(() => subscriber.error(err))
          }
        });
        this.logger.debug('Scanning for BLE devices');
        resolve(subscription);
      }).catch(error => {
        this.zone.run(() => subscriber.complete());
        reject(error);
      });
    });
    return () => {
      promise.then(subscription => {
        this.logger.debug('Stop scanning for BLE devices');
        subscription.unsubscribe();
      }).catch(error => {
        this.logger.error('Error scanning BLE devices: ', error);
      });
    };
  }
}
