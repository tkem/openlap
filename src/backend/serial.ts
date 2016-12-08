import { Injectable, NgZone } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Cordova, Device, Plugin } from 'ionic-native';

import { Observable, Subject } from 'rxjs';
import { NextObserver } from 'rxjs/Observer';

import { Backend } from './backend';
import { Peripheral } from '../carrera';
import { Logger } from '../logging';

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

@Plugin({
  plugin: 'cordovarduino',
  pluginName: 'serial',
  pluginRef: 'serial',
  repo: 'https://github.com/xseignard/cordovarduino',
  platforms: ['Android']
})
class Serial {
  @Cordova()
  static requestPermission(): Promise<any> { return; }

  @Cordova()
  static open(options: any): Promise<any> { return; }

  @Cordova()
  static close(): Promise<any> { return; }

  @Cordova({
    observable: true
  })
  static registerReadCallback(): Observable<ArrayBuffer> { return; }

  @Cordova()
  static write(data: string): Promise<any> { return; }

  @Cordova()
  static writeHex(data: string): Promise<any> { return; }
}

class SerialPeripheral implements Peripheral {

  type = 'serial';

  name = 'Serial USB OTG';

  constructor(private logger: Logger, private zone: NgZone) {}

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
      this.logger.debug('Connecting to serial port');
      this.open({ baudRate: BAUD_RATE, sleepOnPause: false }).then(() => {
        this.logger.info('Connected to serial port');
        let buffer = new Uint8Array(0);
        Serial.registerReadCallback().subscribe({
          next: data => {
            buffer = concat(buffer, new Uint8Array(data));
            let index = -1;
            while ((index = buffer.indexOf(DOLLAR)) != -1) {
              let array = new Uint8Array(buffer.subarray(0, index));
              buffer = buffer.subarray(index + 1);
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
    return Serial.open(options);
  }

  private write(value: ArrayBuffer) {
    let str = String.fromCharCode.apply(null, new Uint8Array(value));
    Serial.write('"' + str + '$').catch(error => {
      this.logger.error('Serial write error', error);
    });
  }

  private close(disconnected?: NextObserver<void>) {
    this.logger.debug('Closing serial port');
    Serial.close().then(() => {
      this.logger.debug('Serial port closed');
    }).catch(error => {
      this.logger.error('Error closing serial port', error);
    }).then(() => {
      if (disconnected) {
        this.zone.run(() => disconnected.next(undefined));
      }
    });
  }
}

@Injectable()
export class SerialBackend extends Backend {

  private scanner: Observable<any>;

  constructor(private logger: Logger, private platform: Platform, private zone: NgZone) {
    super();

    this.scanner = Observable.from(platform.ready()).switchMap(readySource => {
      if (readySource == 'cordova' && platform.is('android') && !Device.device.isVirtual) {
        // TODO: this should probably run in some kind of loop...
        return Observable.from(Serial.requestPermission().then(() => true, () => false));
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
        return Observable.of(new SerialPeripheral(this.logger, this.zone));
      } else {
        return Observable.empty<SerialPeripheral>();
      }
    })
  }
};
