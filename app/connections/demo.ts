import {Connection, Device, Provider} from './connection';
import {EventEmitter, Injectable} from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable'

import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/interval';

const DOLLAR = '$'.charCodeAt(0);

export class DemoConnection implements Connection {
  private emitter: any;

  private start = Date.now();
  
  constructor(private device) {
    console.log('Create Demo connection', device);
    this.emitter = IntervalObservable.create(5000).map(() => {
      let view = new Uint8Array(11);
      view[0] = '?'.charCodeAt(0);
      view[1] = '1'.charCodeAt(0);
      let time = Date.now() - this.start - Math.random() * 1000;
      view[2] = ((time >> 24) & 0x0f) + 0x30;
      view[3] = ((time >> 28) & 0x0f) + 0x30;
      view[4] = ((time >> 16) & 0x0f) + 0x30;
      view[5] = ((time >> 20) & 0x0f) + 0x30;
      view[6] = ((time >> 8) & 0x0f) + 0x30;
      view[7] = ((time >> 12) & 0x0f) + 0x30;
      view[8] = ((time >> 0) & 0x0f) + 0x30;
      view[9] = ((time >> 4) & 0x0f) + 0x30;
      view[10] = '1'.charCodeAt(0);
      return view.buffer;
    });
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any) {
    this.emitter.subscribe(generatorOrNext, error, complete);
  }

  send(data: ArrayBuffer) {
  }

  close() {
  }
}

@Injectable()
export class DemoProvider extends Provider {
  constructor() {
    super();
  }

  connect(device: Device) {
    return new Observable<Connection>(observer => {
      observer.next(new DemoConnection(device));
    });
  }

  scan() {
    return new Observable<Device>(observer => {
      observer.next({name: 'Demo', id: 'demo'});
    });
  }
}
