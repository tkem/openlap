import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer, NextObserver } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { Backend } from './backend';
import { Logger, Plugins } from '../providers';

const BAUD_RATE = 19200;

const DOLLAR = '$'.charCodeAt(0);

function concat(lhs: Uint8Array, rhs: Uint8Array) {
  if (lhs.length == 0) {
    return rhs;
  } else if (rhs.length == 0) {
    return lhs;
  } else {
    let res = new Uint8Array(lhs.length + rhs.length);
    res.set(lhs, 0);
    res.set(rhs, lhs.byteLength);
    return res;
  }
}

@Injectable()
export class SerialBackend implements Backend {

  private serial: Promise<any>;

  constructor(private logger: Logger, private zone: NgZone, plugins: Plugins) {
    this.serial = plugins.get('serial');
  }

  connect(id?: string, connected?: NextObserver<void>) {
    return new Subject<ArrayBuffer>(this.createObserver(), this.createObservable(connected));
  }

  private createObservable(connected?: NextObserver<void>) {
    return new Observable(subscriber => {
      this.logger.debug('Connecting to serial port');
      this.open({ baudRate: BAUD_RATE }).then(serial => {
        this.logger.info('Connected to serial port');
        let buffer = new Uint8Array(0);
        serial.registerReadCallback(
          data => {
            buffer = concat(buffer, new Uint8Array(data));
            let index = -1;
            while ((index = buffer.indexOf(DOLLAR)) != -1) {
              let array = new Uint8Array(buffer.subarray(0, index));
              buffer = buffer.subarray(index + 1);
              this.zone.run(() => subscriber.next(array.buffer));
            }
          },
          error => {
            this.logger.error('Error reading from serial port:', error);
            this.zone.run(() => subscriber.error(error));
          }
        );
        if (connected) {
          connected.next(undefined);
        }
      }).catch(error => {
        this.logger.error('Error connecting to serial port:', error);
        this.zone.run(() => subscriber.error(error));
      });
      return () => {
        this.close();
      };
    });
  }

  private createObserver() {
    return {
      next: (value: ArrayBuffer) => {
        this.serial.then(serial => {
          serial.write('"' + String.fromCharCode.apply(null, new Uint8Array(value)) + '$');
        });
      },
      error: (err: any) => {
        this.logger.error('Serial connection error:', err);
      },
      complete: () => {
        // TODO: handle via close/tearDown?
        this.logger.debug('Serial connection complete');
        this.close();
      }
    };
  }

  private open(options: any) {
    return this.serial.then(serial => {
      return new Promise<any>((resolve, reject) => {
        serial.requestPermission(
          () => serial.open(options, () => resolve(serial), reject),
          () => reject(new Error('Permission denied'))
        );
      });
    });
  }

  private close() {
    this.logger.debug('Closing serial port');
    return this.serial.then(serial => {
      serial.close();
      this.logger.debug('Closed serial port');
    });
  }
}
