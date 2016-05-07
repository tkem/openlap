import {EventEmitter, Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

function parseUint32(array, offset = 0) {
  var n = (array[offset + 0] & 0x0f) << 24;
  n |= (array[offset + 1] & 0x0f) << 28;
  n |= (array[offset + 2] & 0x0f) << 16;
  n |= (array[offset + 3] & 0x0f) << 20;
  n |= (array[offset + 4] & 0x0f) << 8;
  n |= (array[offset + 5] & 0x0f) << 12;
  n |= (array[offset + 6] & 0x0f) << 0;
  n |= (array[offset + 7] & 0x0f) << 4;
  return n;
}

export class Status {
  constructor(array) {
    this.fuel = array.subarray(2, 10).map(n => { return n & 0xf; });
    this.start = array[10] & 0x0f;
    this.mode = array[11] & 0x0f;
    this.pit = array[12] & 0x0f | ((array[13] & 0x0f) << 4);
    this.display = array[14] & 0x0f;
  }

  public fuel;

  public start;

  public mode;

  public pit;

  public display;
}

export class Lap {
  constructor(array) {
    this.id = array[1] - 0x30;
    this.time = parseUint32(array, 2);
    this.sector = array[10] - 0x30;
  }

  public id;

  public time: number;

  public sector;
}

/*
  Generated class for the Connection provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ControlUnit {

  private connection: any = null;

  private requests: any = [];

  private lastResult = '';

  private observer = null;

  status: EventEmitter<Status> = new EventEmitter();

  lap: EventEmitter<Lap> = new EventEmitter();

  constructor() {}

  connect(connection) {
    this.connection = connection;
    connection.subscribe(buffer => {
      let array = new Uint8Array(buffer)
      let string = String.fromCharCode.apply(null, array);
      if (string !== this.lastResult) {
        console.log('CU received', String.fromCharCode.apply(null, array));
        switch (array[0]) {
        case '?'.charCodeAt(0):
          if (array[1] == ':'.charCodeAt(0)) {
            this.status.emit(new Status(array));
          } else {
            this.lap.emit(new Lap(array));
          }
          break;
        case '0'.charCodeAt(0):
          if (this.observer) {
            this.observer.next(string.substring(1, 5));
            this.observer.complete();
            this.observer = null;
          }
          break;
        default:
          // TODO: command promises?
          break;
        }
        this.lastResult = string;
      }
      this.poll();
    });
    this.poll();
  }

  version() {
    return Observable.create(observer => {
      this.requests.push(new Uint8Array(['0'.charCodeAt(0)]).buffer);
      this.observer = observer;
    });
  }

  start() {
    this.requests.push(new Uint8Array(['T'.charCodeAt(0), '2'.charCodeAt(0)]).buffer);
  }
  
  setLap(value: number) {
    this.setWord(17, 7, value >> 4);
    this.setWord(18, 7, value & 0xf);
  }
  
  private setWord(word: number, address: number, value: number, repeat=1) {
    let cmd = new Uint8Array(['J'.charCodeAt(0), 0x30 + (word & 0x0f),0x30 + (word >> 4 | address << 1), 0x30 + value, 0x30 + repeat, 0x30]);
    for (var i = 0; i != cmd.length - 1; ++i) {
      cmd[cmd.length - 1] += (cmd[i] & 0xf);
      cmd[cmd.length - 1] &= 0x3f;
    }
    this.requests.push(cmd.buffer);
  }
  
  private poll() {
    if (this.requests.length !== 0) {
      console.log('CU sends', String.fromCharCode.apply(null, new Uint8Array(this.requests[0])));
      this.connection.send(this.requests.shift());
    } else {
      this.connection.send(new Uint8Array(['?'.charCodeAt(0)]).buffer);
    }
  }
}
