import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Connection, Device, ConnectionProvider } from './connection';
import { Logger } from '../providers/logger';
import { Plugins } from '../providers/plugins';

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

  private logEnabled = false;
  private readBuffer = new Uint8Array(0);

  constructor(private serial: any, private logger: Logger) {
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
                  this.next(a.buffer);
              }
          },
          error => {
              this.error(error);
          }
      );
  }

  send(data: ArrayBuffer) {
      this.log('Sending serial data', data);
      // TODO: serial.write array buffer?
      this.serial.write(
          '"' + String.fromCharCode.apply(null, new Uint8Array(data)) + '$',
          undefined,
          error => this.log(error)
      );
  }

  close() {
      this.log('Closing serial connection');
      this.serial.close();
  }
  
  private log(message: string, data?: ArrayBuffer) {
    if (this.logEnabled) {
      let now = Date.now();
      if (data) {
        this.logger.debug(now.toString() + ": " + message + " " + String.fromCharCode.apply(null, new Uint8Array(data)));
      } else {
        this.logger.debug(now.toString() + ": " + message);
      }
    }
  }
}

@Injectable()
export class SerialProvider extends ConnectionProvider {
    constructor(private logger: Logger, private plugins: Plugins) {
        super();
    }   

    connect() {
        return this.plugins.get('serial').then(serial => {
            return new Promise((resolve, reject) => {
                serial.requestPermission(() => {
                    serial.open({baudRate: 19200}, () => resolve(new SerialConnection(serial, this.logger)), reject);    
                }, reject);
            });
        });
    }
}
