import { Injectable } from '@angular/core';

import { Serial } from '@ionic-native/serial/ngx';

import { NextObserver, Observable, Subject, empty, from, of } from 'rxjs';
import { share, switchMap, tap } from 'rxjs/operators';

import { Backend } from './backend';
import { Peripheral } from '../carrera';
import { AppService, LoggingService } from '../services';

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

class SerialPeripheral implements Peripheral {

  type = 'serial';

  name = 'Serial USB OTG';

  private connected = false;

  private lastReceived: string;
  private lastWritten: string;

  constructor(private serial: Serial, private logger: LoggingService) {}

  connect(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    const observable = this.createObservable(connected, disconnected);
    const observer = this.createObserver(disconnected);
    return Subject.create(observer, observable);
  }

  equals(other: Peripheral) {
    return other && other.type === this.type;
  }

  private createObservable(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    return new Observable<ArrayBuffer>(subscriber => {
      this.logger.info('Connecting to serial port');
      this.open({ baudRate: BAUD_RATE, sleepOnPause: false }).then(() => {
        this.connected = true;
        this.logger.info('Connected to serial port');
        let buffer = new Uint8Array(0);
        this.serial.registerReadCallback().subscribe({
          next: data => {
            buffer = concat(buffer, new Uint8Array(data));
            let index = -1;
            while ((index = buffer.indexOf(DOLLAR)) != -1) {
              let array = new Uint8Array(buffer.subarray(0, index));
              buffer = buffer.subarray(index + 1);
              if (this.logger.isDebugEnabled()) {
                const str = String.fromCharCode.apply(null, array);
                if (str !== this.lastReceived) {
                  this.logger.debug('Serial received ' + str);
                  this.lastReceived = str;
                }
              }
              subscriber.next(array.buffer);
            }
          },
          error: err=> {
            this.logger.error('Error reading from serial port', err);
            subscriber.error(err);
          }
        });
        if (connected) {
          connected.next(undefined);
        }
      }).catch(error => {
        this.logger.error('Error connecting to serial port', error);
        subscriber.error(error);
      });
      return () => {
        this.close(disconnected);
      };
    });
  }

  private createObserver(disconnected?: NextObserver<void>) {
    return {
      next: (value: ArrayBuffer) => this.write(value),
      error: (err: any) => this.logger.error('Serial user error', err),
      complete: () => this.close(disconnected)
    };
  }

  private open(options: any) {
    return this.serial.open(options);
  }

  private write(value: ArrayBuffer) {
    const str = String.fromCharCode.apply(null, new Uint8Array(value));
    if (this.logger.isDebugEnabled()) {
      if (str !== this.lastWritten) {
        this.logger.debug('Serial write ' + str);
        this.lastWritten = str;
      }
    }
    this.serial.write('"' + str + '$').catch(error => {
      this.logger.error('Serial write error', error);
    });
  }

  private close(disconnected?: NextObserver<void>) {
    if (this.connected) {
      this.logger.info('Closing serial port');
      this.serial.close().then(() => {
        this.logger.info('Serial port closed');
      }).catch(error => {
        this.logger.error('Error closing serial port', error);
      }).then(() => {
        if (disconnected) {
          disconnected.next(undefined);
        }
      });
      this.connected = false;
    }
  }
}

@Injectable()
export class SerialBackend extends Backend {

  private scanner: Observable<any>;

  constructor(private app: AppService, private serial: Serial, private logger: LoggingService)
  {
    super();

    this.scanner = from(app.getDeviceInfo()).pipe(
      switchMap(device => {
        if (device.platform == "Android" && !device.isVirtual) {
          return from(this.serial.requestPermission().then(() => true, () => false));
        } else {
          return of(false);
        }
      }),
      tap(enabled => this.logger.info('Serial device ' + (enabled ? '' : 'not') + ' enabled')),
      share()
    );
  }

  scan(): Observable<Peripheral> {
    return this.scanner.pipe(
      switchMap(enabled => {
        if (enabled) {
          return of(new SerialPeripheral(this.serial, this.logger));
        } else {
          return empty();
        }
      })
    );
  }
};
