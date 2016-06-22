import { Injectable, NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Connection } from '../cu';
import { Logger } from '../logger';

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

export class SerialConnection extends Subject<ArrayBuffer> implements Connection {

  private readBuffer = new Uint8Array(0);

  constructor(private serial: any, private zone: NgZone, private logger?: Logger) {
    super();
    this.log('Creating serial connection');
    this.serial.registerReadCallback(
      data => {
        this.log('Received serial data', data);
        this.readBuffer = concat(this.readBuffer, new Uint8Array(data));
        let index = -1;
        while ((index = this.readBuffer.indexOf(DOLLAR)) != -1) {
          // TODO: pass typed arrays instead of (shared) buffers?
          let a = new Uint8Array(this.readBuffer.subarray(0, index));
          this.readBuffer = this.readBuffer.subarray(index + 1);
          this.zone.run(() => this.next(a.buffer));
        }
      },
      error => {
        this.zone.run(() => this.error(error));
      }   
    );
  }

  write(data: ArrayBuffer) {
    this.log('Sending serial data', data);
    return new Promise<void>((resolve, reject) => {
      this.serial.write(
        '"' + String.fromCharCode.apply(null, new Uint8Array(data)) + '$',
        () => this.zone.run(resolve),
        error => this.zone.run(() => reject(error))
      );
    });
  }

  close() {
    this.log('Closing serial connection');
    return new Promise<void>((resolve, reject) => {
      this.serial.close(
        () => this.zone.run(() => { this.complete(); resolve() }),
        error => this.zone.run(() => reject(error))
      );
    });
  }

  private log(message: string, data?: ArrayBuffer) {
    if (this.logger) {
      let now = Date.now();
      if (data) {
        this.logger.debug(now.toString() + ": " + message + " " + String.fromCharCode.apply(null, new Uint8Array(data)));
      } else {
        this.logger.debug(now.toString() + ": " + message);
      }
    }
  }

  static connect(serial: any, zone: NgZone, logger?: Logger) {
    return new Promise<Connection>((resolve, reject) => {
      serial.requestPermission(
        () => serial.open(
          { baudRate: 19200 }, 
          () => resolve(new SerialConnection(serial, zone, logger)), 
          reject
        ),
        () => reject(new Error('Permission denied'))
      );
    });
  }
}
