import { Injectable, NgZone } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Device } from '@ionic-native/device';
import { Serial } from '@ionic-native/serial';

import { Observable, Subject } from 'rxjs';
import { NextObserver } from 'rxjs/Observer';

import { Backend } from './backend';
import { Peripheral } from '../carrera';
import { Logger } from '../core';

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

  constructor(private serial: Serial, private logger: Logger, private zone: NgZone) {}

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
              this.zone.run(() => subscriber.next(array.buffer));
            }
          },
          error: err=> {
            this.logger.error('Error reading from serial port', err);
            this.zone.run(() => subscriber.error(err));
          }
        });
        if (connected) {
          this.zone.run(() => connected.next(undefined));
        }
      }).catch(error => {
        this.logger.error('Error connecting to serial port', error);
        this.zone.run(() => subscriber.error(error));
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
          this.zone.run(() => disconnected.next(undefined));
        }
      });
      this.connected = false;
    }
  }
}

@Injectable()
export class SerialBackend extends Backend {

  private scanner: Observable<any>;

  constructor(private device: Device, private serial: Serial,
    private logger: Logger, private platform: Platform, private zone: NgZone)
  {
    super();

    this.scanner = Observable.from(platform.ready()).switchMap(readySource => {
      if (readySource == 'cordova' && platform.is('android') && !this.device.isVirtual) {
        return Observable.from(this.serial.requestPermission().then(() => true, () => false));
      } else {
        return Observable.of(false);
      }
    }).do(enabled => {
      this.logger.debug('Serial device ' + (enabled ? '' : 'not') + ' enabled');
    }).share();
  }

  scan(): Observable<Peripheral> {
    return this.scanner.switchMap(enabled => {
      if (enabled) {
        return Observable.of(new SerialPeripheral(this.serial, this.logger, this.zone));
      } else {
        return Observable.empty<SerialPeripheral>();
      }
    })
  }
};
