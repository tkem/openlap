import { Injectable, NgZone } from '@angular/core';

import { Cordova, Plugin } from 'ionic-native';

import { Observable } from 'rxjs/Observable';
import { Observer, NextObserver } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { Backend } from './backend';
import { Logger } from '../providers';

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

@Injectable()
export class SerialBackend implements Backend {

  constructor(private logger: Logger, private zone: NgZone) {}

  connect(id?: string, connected?: NextObserver<void>) {
    return new Subject<ArrayBuffer>(this.createObserver(), this.createObservable(connected));
  }

  private createObservable(connected?: NextObserver<void>) {
    return new Observable<ArrayBuffer>(subscriber => {
      this.logger.debug('Connecting to serial port');
      this.open({ baudRate: BAUD_RATE }).then(() => {
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
            this.logger.error('Error reading from serial port:', err);
            this.zone.run(() => subscriber.error(err));
          }
        });
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
        Serial.write('"' + String.fromCharCode.apply(null, new Uint8Array(value)) + '$');
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
    return Serial.requestPermission().then(() => {
      return Serial.open(options);
    });
  }

  private close() {
    Serial.close().then(() => {
      this.logger.debug('Serial port closed');
    }).catch(error => {
      this.logger.error('Serial close error:', error);
    });
  }
}
