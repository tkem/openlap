import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';

import { Logger } from './logger';

import { Peripheral } from '../backends';

const CONNECTION_TIMEOUT = 3000;
const RECONNECT_DELAY = 1000;

class DataView {
  private array: Uint8Array;

  get buffer() {
    return this.array.buffer;
  }

  get byteLength() {
    return this.array.byteLength;
  }

  get byteOffset() {
    return this.array.byteOffset;
  }

  constructor(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number) {
    if (byteLength !== undefined) {
      this.array = new Uint8Array(buffer, byteOffset, byteLength);
    } else if (byteOffset) {
      this.array = new Uint8Array(buffer, byteOffset);
    } else {
      this.array = new Uint8Array(buffer);
    }
  }

  getUint4(byteOffset: number) {
    return this.array[byteOffset] & 0xf;
  }

  getUint8(byteOffset: number) {
    return (this.array[byteOffset] & 0xf) | ((this.array[byteOffset + 1] & 0xf) << 4);
  }

  getUint32(byteOffset: number) {
    let value = 0;
    value |= (this.array[byteOffset + 0] & 0xf) << 24;
    value |= (this.array[byteOffset + 1] & 0xf) << 28;
    value |= (this.array[byteOffset + 2] & 0xf) << 16;
    value |= (this.array[byteOffset + 3] & 0xf) << 20;
    value |= (this.array[byteOffset + 4] & 0xf) << 8;
    value |= (this.array[byteOffset + 5] & 0xf) << 12;
    value |= (this.array[byteOffset + 6] & 0xf) << 0;
    value |= (this.array[byteOffset + 7] & 0xf) << 4;
    return value;
  }

  getUint8Array(byteOffset: number, byteLength: number): ArrayLike<number> {
    return this.array.subarray(byteOffset, byteOffset + byteLength).map(n => n & 0xf);
  }

  setUint4(byteOffset: number, value: number): void {
    this.array[byteOffset] = value | 0x30;
  }

  setUint8(byteOffset: number, value: number): void {
    this.array[byteOffset] = (value & 0xf) | 0x30;
    this.array[byteOffset + 1] = (value >> 4) | 0x30;
  }

  toString(byteOffset?: number, byteLength?: number) {
    return String.fromCharCode.apply(null, this.subarray(byteOffset, byteLength));
  }

  static from(cmd: string, ...values: number[]) {
    let array = new Uint8Array(values.length + 2);
    let crc = array[0] = cmd.charCodeAt(0);
    for (let i = 0; i != values.length; ++i) {
      const value = values[i];
      array[i + 1] = 0x30 | value;
      crc += value;
    }
    array[array.length - 1] = 0x30 | (crc & 0xf);
    return new DataView(array.buffer);
  }

  static fromString(s: string) {
    return new DataView(Uint8Array.from(s.split('').map(c => c.charCodeAt(0))).buffer);
  }

  private subarray(byteOffset?: number, byteLength?: number) {
    if (byteLength !== undefined) {
      return this.array.subarray(byteOffset, byteOffset + byteLength);
    } else if (byteOffset) {
      return this.array.subarray(byteOffset);
    } else {
      return this.array;
    }
  }
}

const POLL_REQUEST = DataView.fromString('?').buffer;

// TODO: remove
function getUint32(array: ArrayLike<number>, offset = 0) {
  let n = 0;
  n |= (array[offset + 0] & 0xf) << 24;
  n |= (array[offset + 1] & 0xf) << 28;
  n |= (array[offset + 2] & 0xf) << 16;
  n |= (array[offset + 3] & 0xf) << 20;
  n |= (array[offset + 4] & 0xf) << 8;
  n |= (array[offset + 5] & 0xf) << 12;
  n |= (array[offset + 6] & 0xf) << 0;
  n |= (array[offset + 7] & 0xf) << 4;
  return n;
}

@Injectable()
export class ControlUnit {

  peripheral: Peripheral;

  private connection: Subject<ArrayBuffer>;

  private subscription: any;
  
  private requests = Array<ArrayBuffer>();
  
  private stateSubject = new BehaviorSubject<'disconnected' | 'connecting' | 'connected'>('disconnected');
  private fuelSubject = new BehaviorSubject<ArrayLike<number>>([]);
  private startSubject = new BehaviorSubject<number>(0);
  private modeSubject = new BehaviorSubject<number>(undefined);
  private pitSubject = new BehaviorSubject<number>(0);
  private timeSubject = new Subject<[number, number, number]>();
  private versionSubject = new BehaviorSubject<string>(undefined);

  state = this.stateSubject.distinctUntilChanged();

  // TODO: better equality check
  fuel = this.fuelSubject.distinctUntilChanged(
    null, array => array.length ? getUint32(array) : -1
    //null, array => array.reduce((prev, curr, index) =>  prev | (curr << (index * 4)))
  );

  start = this.startSubject.distinctUntilChanged();

  // TODO: initial value?
  mode = this.modeSubject.filter(value => value !== undefined).distinctUntilChanged();

  pit = this.pitSubject.distinctUntilChanged();

  // TODO: array equality?
  time = this.timeSubject.distinctUntilChanged(
    (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
  );

  version = this.versionSubject.asObservable();

  constructor(private logger: Logger) {}

  connect(peripheral: Peripheral) {
    this.disconnect();
    this.logger.info('CU: Connecting to ' + peripheral.name);
    this.peripheral = peripheral;
    this.connection = peripheral.connect();
    this.stateSubject.next('connecting');
    this.subscription = this.connection.timeout(CONNECTION_TIMEOUT).retryWhen(errors => {
      return errors.do(error => {
        this.logger.error('CU: Connection error:', error)
        this.stateSubject.next('disconnected');
      }).delay(RECONNECT_DELAY).do(() => {
        this.logger.error('CU: Reconnecting');
        this.stateSubject.next('connecting');
      });
    }).subscribe(
      data => this.onData(data),
      error => this.onError(error),
      () => this.onClose()
    );
  }

  disconnect() {
    if (this.connection) {
      this.connection.complete();
      this.subscription.unsubscribe();
      this.versionSubject.next(undefined);  // TODO: complete(), renew
      this.connection = null;
      this.peripheral = null;
    }
  }

  private onData(data: ArrayBuffer) {
    let requestsPending = this.requests.length !== 0;
    if (requestsPending) {
      this.poll();
    }
    let view = new DataView(data);
    switch (view.toString(0, 1)) {
      case '?':
        if (view.toString(1, 1) == ':') {
          this.fuelSubject.next(view.getUint8Array(2, 8));
          this.startSubject.next(view.getUint4(10));
          this.modeSubject.next(view.getUint4(11));
          this.pitSubject.next(view.getUint8(12));
        } else {
          let id = view.getUint4(1) - 1;
          let time = view.getUint32(2);
          let sector = view.getUint4(10);  // TODO: check with new checklane
          this.timeSubject.next([id, time, sector]);
        }
        break;
      case '0':
        this.versionSubject.next(view.toString(1, 4));
        break;
      case 'J':
        // this.logger.debug('CU received', view.toString());
        break;
      default:
        this.logger.debug('CU received', view.toString());
        break;
    }
    if (!requestsPending) {
      this.poll();
    }
    this.stateSubject.next('connected');
  }

  private onError(error: any) {
    this.logger.error('CU: Fatal error ', error);
    this.stateSubject.next('disconnected');
  }

  private onClose() {
    this.logger.info('CU: Connection closed');
    this.stateSubject.next('disconnected');
  }

  getVersion() {
    console.log('CU.getVersion() called');
    return this.versionSubject.asObservable();
  }

  reset() {
    this.requests.push(DataView.fromString('=10').buffer);
  }

  toggleStart() {
    this.requests.push(DataView.fromString('T2').buffer);
  }

  setLap(value: number) {
    this.setLapHi(value >> 4);
    this.setLapLo(value & 0xf);
  }

  setLapHi(value: number) {
    this.set(17, 7, value);
  }

  setLapLo(value: number) {
    this.set(18, 7, value);
  }

  setPosition(id: number, pos: number) {
    this.set(6, id, pos);
  }

  clearPosition() {
    this.set(6, 0, 9);
  }

  setMask(value: number) {
    this.requests.push(DataView.from(':', value & 0xf, value >> 4).buffer);
  }

  setSpeed(id: number, value: number) {
    this.set(0, id, value, 2);
  }

  setBrake(id: number, value: number) {
    this.set(1, id, value, 2);
  }

  setFuel(id: number, value: number) {
    this.set(2, id, value, 2);
  }

  private set(address: number, id: number, value: number, repeat = 1) {
    const args = [address & 0x0f, (address >> 4) | (id << 1), value, repeat];
    this.requests.push(DataView.from('J', ...args).buffer);
  }

  poll() {
    if (this.connection) {
      let request = this.requests.shift() || POLL_REQUEST;
      this.connection.next(request);
    }
  }
}
