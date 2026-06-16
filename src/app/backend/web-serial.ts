import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { EMPTY, NextObserver, Observable, Subscriber, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Backend } from './backend';
import { Peripheral } from '../carrera';
import { createSubject } from '../carrera/peripheral';
import { LoggingService } from '../services';

const BACKEND_TYPE = 'web-serial';

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

class WebSerialPeripheral implements Peripheral {

  type = BACKEND_TYPE;

  name: string;

  address: string;

  private connected = false;
  private writer: WritableStreamDefaultWriter;
  private reader: ReadableStreamDefaultReader;

  private decoder = new TextDecoder();
  private encoder = new TextEncoder();
  
  private lastRead: string;
  private lastWritten: string;

  constructor(private port: any, private logger: LoggingService) {
    this.name = 'USB Control Unit';
    const info = port.getInfo();
    if (info.usbVendorId && info.usbProductId) {
      const toUsbId = (value: Number) => value.toString(16).padStart(4, "0");
      this.address = toUsbId(info.usbVendorId) + ':' + toUsbId(info.usbProductId);
    }
  }

  connect(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    const observable = this.createObservable(connected, disconnected)
    const observer = this.createObserver(disconnected);
    return createSubject(observer, observable);
  }

  equals(other: Peripheral) {
    return other && other.type === this.type;
  }

  private createObservable(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    return new Observable<ArrayBuffer>(subscriber => {
      this.logger.info('Connecting to Web Serial port');
      this.port.open({ baudRate: BAUD_RATE }).then(() => {
        this.logger.info('Connected to Web Serial port');
        this.reader = this.port.readable.getReader();
        this.writer = this.port.writable.getWriter();
        this.connected = true;
        if (connected) {
          connected.next(undefined);
        }
        return this.poll(subscriber);
      }).catch(error => {
        this.onError(error, subscriber);
      });
      return () => {
        this.close(disconnected);
      };
    });
  }

  private createObserver(disconnected?: NextObserver<void>) {
    return {
      next: (value: ArrayBuffer) => this.write(value),
      error: (err: any) => this.logger.error('Web Serial user error', err),
      complete: () => this.close(disconnected)
    };
  }

  private poll(subscriber: Subscriber<ArrayBuffer>) {
    let buffer: Uint8Array<ArrayBufferLike> = new Uint8Array(0);
    const loop = () => {
      return this.reader.read().then(({ value, done }) => {
        if (done) {
          return;
        }
        const data = value.buffer;
        buffer = concat(buffer, new Uint8Array(data));
        let index = -1;
        while ((index = buffer.indexOf(DOLLAR)) != -1) {
          let array = new Uint8Array(buffer.subarray(0, index));
          buffer = buffer.subarray(index + 1);
          if (this.logger.isDebugEnabled()) {
            const str = this.decoder.decode(array);
            if (str.startsWith('#') || str.startsWith('J') || str !== this.lastRead) {
              this.logger.debug('Web Serial received ' + str);
              this.lastRead = str;
            }
          }
          subscriber.next(array.buffer);
        }
        return loop();
      });
    }
    return loop();
  };

  private write(value: ArrayBuffer) {
    const str = '"' + this.decoder.decode(value) + '$';
    if (this.logger.isDebugEnabled()) {
      if (str.startsWith('J') || str !== this.lastWritten) {
        this.logger.debug('Web Serial write ' + str);
        this.lastWritten = str;
      }
    }
    try {
      this.writer.write(this.encoder.encode(str)).catch(error => {
        this.logger.error('Web Serial write error', error);
      });
    } catch (error) {
      this.logger.error('Web Serial write error', error);
    }
  }

  private close(disconnected?: NextObserver<void>) {
    if (this.connected) {
      this.logger.debug('Closing Web Serial port');
      try {
        this.writer.releaseLock();
      } catch (error) {
        this.logger.debug('Error releasing Web Serial writer', error);
      }
      this.reader.cancel().catch(error => {
        this.logger.error('Error canceling Web Serial reader', error);
      }).then(() =>  {
        return this.port.close();
      }).then(() => {
        this.logger.info('Web Serial port closed');
      }).catch(error => {
        this.logger.debug('Error closing Web Serial connection', error);
      }).then(() => {
        if (disconnected) {
          disconnected.next(undefined);
        }
      });
      this.connected = false;
    }
  }

  private onError(error, subscriber) {
    subscriber.error(error);
  }
}

@Injectable()
export class WebSerialBackend extends Backend {

  type = BACKEND_TYPE;

  private navigator: any = window.navigator;

  private device: Promise<any>;

  constructor(private logger: LoggingService, private platform: Platform) {
    super();
  }

  scan(): Observable<Peripheral> {
    return from(this.platform.ready()).pipe(
      switchMap(readySource => {
        if (readySource != 'cordova' && this.navigator.serial) {
          return from(this.requestDevice()).pipe(
            catchError(err => {
              this.logger.error('Error requesting Web Serial device:', err);
              return EMPTY;
            })
          );
        } else {
          return EMPTY;
        }
      })
    );
  }

  private requestDevice(): Promise<any> {
    if (this.device) {
      return this.device;  // avoid multiple pop-up dialogs
    } else {
      return this.navigator.serial.requestPort({
        filters: [
          { usbVendorId: 0x0403 },  // FTDI: FT232R, FT231X, FT232H
          { usbVendorId: 0x10C4 },  // Silicon Labs: CP2102, CP2104, CP2109
          { usbVendorId: 0x067B },  // Prolific: PL2303, PL2303RA
          { usbVendorId: 0x1A86 },  // WCH (QinHeng): CH340, CH340G, CH341
          { usbVendorId: 0x0471 },  // Philips / NXP: PCA953x family
          { usbVendorId: 0x0483 },  // STMicroelectronics: STM32 Virtual COM
          { usbVendorId: 0x0451 },   // Texas Instruments: TUSB3410
        ]
      }).then(port => {
        const p = new WebSerialPeripheral(port, this.logger);
        this.device = Promise.resolve(p);
        return p;
      });
    }
  }
}
