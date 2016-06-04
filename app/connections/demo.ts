import {Connection, Device, Provider} from './connection';
import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable'

import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/interval';

const DOLLAR = '$'.charCodeAt(0);

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function toString(buffer: ArrayBuffer) {
  let array = new Uint8Array(buffer)
  let string = String.fromCharCode.apply(null, array);
  return string;
}

class Car {
  id: string;

  fuel = 0xff;

  lap = new EventEmitter<Car>();

  pit = false;

  private minLapTime: number;
  private maxLapTime: number;
  private timeout: any;

  constructor(id: string) {
    this.id = id;
  }

  start(minLapTime, maxLapTime, delay=0) {
    this.minLapTime = minLapTime;
    this.maxLapTime = maxLapTime;
    this.timeout = setTimeout(() => this.onNext(), delay);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  private onRefuel() {
    this.fuel += 0x10;
    if (this.fuel >= random(0xc0, 0xf0)) {
      this.timeout = setTimeout(() => this.onNext(), this.sectionTime());
    } else {
      this.timeout = setTimeout(() => this.onRefuel(), 500);
    }
  }

  private onNext() {
    if (this.fuel >= 0x10) {
      this.lap.emit(this);
    }
    if (this.fuel < random(0x10, 0x30)) {
      this.pit = true;
      this.timeout = setTimeout(() => this.onRefuel(), 500);
    } else {
      this.timeout = setTimeout(() => this.onFuel(), this.sectionTime());
    }
  }

  private onFuel() {
    this.pit = false;
    this.fuel = Math.max(0, this.fuel - random(12, 15));
    this.timeout = setTimeout(() => this.onNext(), this.sectionTime());
  }

  private sectionTime() {
    return random(this.minLapTime, this.maxLapTime) / 2;
  }
}

export class DemoConnection implements Connection {
  private emitter = new EventEmitter<ArrayBuffer>();

  private start = Date.now();

  private startValue = 0;

  private cars = [
    new Car('1'),
    new Car('2'),
    new Car('3'),
    new Car('4'),
    new Car('5'),
    new Car('6'),
    new Car('7'),
    new Car('8')
  ];

  private laps = [];

  private config = {
    numCars: 3,
    maxStartTime: 500,
    minLapTime: 3000,
    maxLapTime: 5000
  };

  constructor(private device) {
    for (let i = 0; i != this.config.numCars; ++i) {
      this.cars[i].lap.subscribe(car => this.laps.push(this.createLap(car.id)));
    }
    this.startAll();
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any) {
    this.emitter.subscribe(generatorOrNext, error, complete);
  }

  send(data: ArrayBuffer) {
    if (toString(data) == 'T2') {
      this.onStart();
    }
    setTimeout(() => {
      let event = this.laps.length ? this.laps.shift() : this.createStatus();
      this.emitter.emit(event);
    }, 50);
  }

  close() {
  }

  private createLap(id: string) {
    let time = Date.now() - this.start;
    let view = new Uint8Array(11);
    view[0] = '?'.charCodeAt(0);
    view[1] = id.charCodeAt(0);;
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
  }

  private createStatus() {
    let view = new Uint8Array(16);
    view[0] = '?'.charCodeAt(0);
    view[1] = ':'.charCodeAt(0);
    for (let i = 0; i != 8; ++i) {
      view[i + 2] = 0x30 + ((this.cars[i].fuel) >> 4 & 0xf);
    }
    view[10] = 0x30 + this.startValue; // start
    view[11] = 0x30 + 0x02; // mode
    view[12] = 0x30 + this.getPitMask(0, 4);
    view[13] = 0x30 + this.getPitMask(4, 8);
    view[14] = 0x36;  // display
    view[15] = '1'.charCodeAt(0);
    return view.buffer;
  }

  private getPitMask(begin, end) {
    let mask = 0;
    for (let i = begin; i != end; ++i) {
      mask |= (this.cars[i].pit ? 1 : 0) << i;
    }
    return mask;
  }

  private onStart() {
    if (this.startValue == 0) {
      this.stopAll();
      this.startValue = 1;
    } else if (this.startValue == 7) {
      this.startAll();
      this.startValue = 0;
    } else {
      this.startValue++;
      setTimeout(() => this.onStart(), 1000);
    }
  }

  private startAll() {
    for (let i = 0; i != this.config.numCars; ++i) {
      this.cars[i].start(this.config.minLapTime, this.config.maxLapTime, random(0, this.config.maxStartTime));
    }
  }

  private stopAll() {
    for (let i = 0; i != this.config.numCars; ++i) {
      this.cars[i].stop();
    }
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
