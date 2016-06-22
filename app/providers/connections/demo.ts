import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Connection } from '../cu';

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

  fuel: number;

  lap = new EventEmitter<Car>();

  pit = false;

  private minLapTime: number;
  private maxLapTime: number;
  private timeout: any;

  constructor(id: string) {
    this.id = id;
    this.fuel = this.id == '7' || this .id == '8' ? 0 : 0x3f;
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
    if (this.id == '7' || this .id == '8') {
      this.lap.emit(this);
      this.timeout = setTimeout(() => this.onNext(), random(this.minLapTime, this.maxLapTime));
    } else {
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

export class DemoConnection extends Subject<ArrayBuffer> implements Connection {
  private static start = Date.now();

  private startSequence = 0;

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
    numCars: 8,
    maxStartTime: 500,
    minLapTime: 3000,
    maxLapTime: 5000
  };

  private version: string;

  constructor() {
    super();
    this.version = (Math.random() * 10000).toFixed(0);
    for (let i = 0; i != this.config.numCars; ++i) {
      this.cars[i].lap.subscribe(car => this.laps.push(this.createLap(car.id)));
    }
    this.startAll();
  }

  write(data: ArrayBuffer) {
    if (toString(data) == 'T2') {
      this.onStart();
    }
    setTimeout(() => {
      if (toString(data) == '0') {
        let version = new Uint8Array(('0' + this.version).split('').map(c => c.charCodeAt(0)));
        this.next(version.buffer);
      } else {
        this.next(this.laps.length ? this.laps.shift() : this.createStatus());
      }
    }, 50);
    return Promise.resolve();
  }

  close() {
    return Promise.resolve();
  }

  private createLap(id: string) {
    let time = Date.now() - DemoConnection.start;
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
    view[10] = 0x30 + this.startSequence; // start
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
      mask >>= 1
      mask |= (this.cars[i].pit ? 8 : 0);
    }
    return mask;
  }

  private onStart() {
    if (this.startSequence == 0) {
      this.stopAll();
      this.startSequence = 1;
      //this.error('Forced error');
    } else if (this.startSequence == 7) {
      this.startAll();
      this.startSequence = 0;
    } else {
      this.startSequence++;
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
