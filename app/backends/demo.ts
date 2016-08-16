import { EventEmitter, Injectable } from '@angular/core';

import { Peripheral } from '../carrera';

import { Observable, Observer, NextObserver, Subject } from '../rxjs';

import { Logger } from '../providers';

import { Backend } from './backend';

const VERSION = '0815';

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
    this.fuel = this.id == '7' || this .id == '8' ? 0 : 0xff;
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
    this.fuel = Math.max(0, this.fuel - random(0x08, 0x20));
    this.timeout = setTimeout(() => this.onNext(), this.sectionTime());
  }

  private sectionTime() {
    return random(this.minLapTime, this.maxLapTime) / 2;
  }
}

class DemoPeripheral implements Peripheral {

  private start = Date.now();

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
    maxStartTime: 5000,
    minLapTime: 10000,
    maxLapTime: 12000
  };

  private version: Uint8Array;

  private subscriber: any;

  type = 'demo';

  constructor(public name: string, private mode: number, private logger: Logger) {
    this.version = new Uint8Array(('0' + VERSION).split('').map(c => c.charCodeAt(0)));
    for (let i = 0; i != this.config.numCars; ++i) {
      this.cars[i].lap.subscribe(car => this.laps.push(this.createLap(car.id)));
    }
    this.startAll();
  }

  connect(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    return new Subject<ArrayBuffer>(this.createObserver(), this.createObservable(connected, disconnected));
  }

  equals(other: Peripheral) {
    return other && other.type === this.type && other.name == this.name;
  }

  private createObservable(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    return new Observable<ArrayBuffer>(subscriber => {
      this.logger.info('Creating Demo observable with mode=' + this.mode);
      this.subscriber = subscriber;
      setTimeout(() => {
        if (connected) {
          connected.next(undefined);
        }
      }, 100);
      return () => {
        this.logger.info('Destroying Demo observable');
        if (disconnected) {
          disconnected.next(undefined);
        }
        delete this.subscriber;
      }
    });
  }

  private createObserver() {
    return {
      next: (value: ArrayBuffer) => {
        //console.log('Demo connection next:', toString(value));
        if (toString(value) != '?') {
          console.log('Demo CU received ' + toString(value));
        }
        if (toString(value) == 'T2') {
          this.onStart();
        }
        if (Math.round(random(0, 1000)) === 42) {
          console.log('Random Demo timeout');
          return;
        }
        setTimeout(() => {
          if (this.subscriber) {
            //console.log('Demo connection response');
            if (toString(value) == '0') {
              this.subscriber.next(this.version.buffer);
            } else {
              this.subscriber.next(this.laps.length ? this.laps.shift() : this.createStatus());
            }
          }
        }, 100);
      },
      error: (err: any) => {
        console.log('Demo connection error:', err);
      },
      complete: () => {
        console.log('Demo connection complete');
        this.subscriber.complete();
      }
    };
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
    view[10] = 0x30 + this.startSequence; // start
    view[11] = 0x30 + this.mode;
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

@Injectable()
export class DemoBackend extends Backend {

  constructor(private logger: Logger) {
    super();
  }

  protected _subscribe(subscriber) {
    subscriber.next(new DemoPeripheral('Demo', 0x2, this.logger));
    subscriber.next(new DemoPeripheral('Demo (no pit lane)', 0x0, this.logger));
    subscriber.complete();
  }
};
