import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer, NextObserver } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { Backend } from './backend';
import { Logger, Plugins } from '../providers';

const SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
const OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
const NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';

const DOLLAR = '$'.charCodeAt(0);

@Injectable()
export class BLEBackend implements Backend {

  private ble: Promise<any>;

  private devices = {};

  constructor(private logger: Logger, private zone: NgZone, plugins: Plugins) {
    this.ble = plugins.get('ble').then(ble => {
      return new Promise<any>((resolve, reject) => {
        ble.enable(() => resolve(ble), error => reject(error));
      });
    });
  }

  connect(id: string, connected?: NextObserver<void>) {
    return new Subject<ArrayBuffer>(this.createObserver(id), this.createObservable(id, connected));
  }

  scan() {
    return new Observable<any>(subscriber => {
      this.zone.run(() => {
        for (let id of Object.keys(this.devices)) {
          subscriber.next(this.devices[id]);
        }
      });
      this.ble.then(ble => {
        this.logger.debug('Start scanning for BLE devices');
        ble.startScan([], 
          device => {
            if (!(device.id in this.devices)) {
              this.zone.run(() => subscriber.next(device));
              this.devices[device.id] = device;
            }
          }, 
          error => this.zone.run(() => subscriber.error(error))
        );
      }).catch(error => {
        this.logger.warn('Not scanning for BLE devices:', error);
      });      
      return () => {
        this.logger.debug('Stop scanning for BLE devices');
        this.ble.then(ble => ble.stopScan()).catch();
      }
    });
  }

  private createObservable(id: string, connected?: NextObserver<void>) {
    return new Observable(subscriber => {
      this.logger.debug('Connecting to BLE device ' + id);
      this.ble.then(ble => {
        let isConnected = false;
        ble.connect(
          id, 
          peripheral => {
            this.logger.info('Connected to BLE device:', peripheral);
            isConnected = true;
            ble.startNotification(
              id, SERVICE_UUID, NOTIFY_UUID,
              data => this.onNotify(data, subscriber),
              error => this.onError(error, subscriber)
            );
            if (connected) {
              connected.next(undefined);
            }
          },
          obj => {
            if (obj instanceof Error) {
              this.logger.error('BLE connection error:', obj);
              subscriber.error(obj);
            } else if (!isConnected) {
              this.logger.error('BLE connection error:', obj);
              subscriber.error(new Error('Connection error'));
            } else {}
              this.logger.info('BLE device disconnected:', obj);
              subscriber.complete();
          }
        );
      });
      return () => {
        this.disconnect(id);
      };
    });
  }

  private createObserver(id: string) {
    return {
      next: (value: ArrayBuffer) => {
        this.ble.then(ble => {
          ble.writeWithoutResponse(
            id, SERVICE_UUID, OUTPUT_UUID, value,
            null /* () => this.logger.debug('BLE write success') */, 
            error => this.logger.error('BLE write error', error)
          );
        });
      },
      error: (err: any) => {
        this.logger.error('BLE connection error:', err);
      },
      complete: () => {
        this.logger.info('BLE connection closed');
        this.disconnect(id);
      }
    };
  }

  private onNotify(data, subscriber) {
    // strip trailing '$' and prepend missing '0'/'?' for notifications
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
    
  private disconnect(id: string) {
    this.ble.then(ble => {
      ble.disconnect(
        id,
        () => this.logger.debug('BLE disconnected from ' + id),
        error => this.logger.error('BLE disconnect error:', error)
      );
    });
  }
}
