import { EventEmitter, Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { NextObserver } from 'rxjs/Observer';

import { Backend } from './backend';
import { DataView, Peripheral } from '../carrera';
import { Logger } from '../core';

const VERSION = '5336';

const TIMEOUT_RATE = 0.0001;
const ERROR_RATE = 0.0001;

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

  sector = 0;

  pit = false;

  events = new EventEmitter<Car>();

  private minSectorTime: number;
  private maxSectorTime: number;
  private sectors: number;
  private timeout: any;

  constructor(id: string) {
    this.id = id;
    this.fuel = this.id == '7' || this .id == '8' ? 0 : 0xff;
  }

  start(minSectorTime, maxSectorTime, sectors=1, delay=0) {
    this.minSectorTime = minSectorTime;
    this.maxSectorTime = maxSectorTime;
    this.sectors = sectors;
    this.timeout = setTimeout(() => this.onNext(), delay);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  private onRefuel() {
    this.fuel += 0x10;
    if (this.fuel >= random(0xc0, 0xf0)) {
      this.timeout = setTimeout(() => this.onNext(), this.fuelTime());
    } else {
      this.timeout = setTimeout(() => this.onRefuel(), 500);
    }
  }

  private onNext() {
    if (++this.sector > this.sectors) {
      this.sector = 1;
    }
    if (this.id == '7' || this .id == '8') {
      this.events.emit(this);
      this.timeout = setTimeout(() => this.onNext(), random(this.minSectorTime, this.maxSectorTime));
    } else {
      if (this.fuel >= 0x10 || this.sector !== 1) {
        this.events.emit(this);
      }
      if (this.fuel < random(0x10, 0x30) && this.sector === 1) {
        this.pit = true;
        this.timeout = setTimeout(() => this.onRefuel(), 1500);
      } else {
        this.timeout = setTimeout(() => this.onFuel(), this.fuelTime());
      }
    }
  }

  private onFuel() {
    this.pit = false;
    this.fuel = Math.max(0, this.fuel - random(0x04, 0x10));
    this.timeout = setTimeout(() => this.onNext(), this.fuelTime());
  }

  private fuelTime() {
    return random(this.minSectorTime, this.maxSectorTime) / 2;
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
    numSectors: 3,
    maxStartTime: 1500,
    minSectorTime: 3000,
    maxSectorTime: 4000
  };

  private version: ArrayBuffer;

  private subscriber: any;

  type = 'demo';

  constructor(public name: string, private mode: number, private logger: Logger) {
    this.version = DataView.from('0', ...VERSION.split('').map(c => c.charCodeAt(0))).buffer;
    for (let i = 0; i != this.config.numCars; ++i) {
      this.cars[i].events.subscribe(car => this.laps.push(this.createLap(car.id, car.sector)));
    }
    this.startAll();
  }

  connect(connected?: NextObserver<void>, disconnected?: NextObserver<void>) {
    return Subject.create(this.createObserver(), this.createObservable(connected, disconnected));
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
        if (Math.random() < ERROR_RATE) {
          if (this.subscriber) {
            console.log('Random Demo error');
            this.subscriber.error(new Error('Demo Error'));
          }
          return;
        }
        //console.log('Demo connection next:', toString(value));
        if (toString(value) != '?') {
          console.log('Demo CU received ' + toString(value));
        }
        if (toString(value) == 'T1') {
          this.onESC();
        }
        if (toString(value) == 'T2') {
          this.onStart();
        }
        if (Math.random() < TIMEOUT_RATE) {
          console.log('Random Demo timeout');
          return;
        }
        setTimeout(() => {
          if (this.subscriber) {
            // console.log('Demo connection response to ' + toString(value));
            if (toString(value) == '0') {
              this.subscriber.next(this.version);
            } else {
              // TODO: command response
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

  private createLap(id: string, group = 1) {
    // TODO: use DataView, add CRC
    const time = Date.now() - this.start;
    return DataView.from(
      '?',
      parseInt(id),
      (time >> 24) & 0x0f,
      (time >> 28) & 0x0f,
      (time >> 16) & 0x0f,
      (time >> 20) & 0x0f,
      (time >> 8) & 0x0f,
      (time >> 12) & 0x0f,
      (time >> 0) & 0x0f,
      (time >> 4) & 0x0f,
      group
    ).buffer;
  }

  private createStatus() {
    return DataView.from(
      '?',
      10,
      (this.cars[0].fuel) >> 4 & 0xf,
      (this.cars[1].fuel) >> 4 & 0xf,
      (this.cars[2].fuel) >> 4 & 0xf,
      (this.cars[3].fuel) >> 4 & 0xf,
      (this.cars[4].fuel) >> 4 & 0xf,
      (this.cars[5].fuel) >> 4 & 0xf,
      (this.cars[6].fuel) >> 4 & 0xf,
      (this.cars[7].fuel) >> 4 & 0xf,
      this.startSequence,
      this.mode,
      this.getPitMask(0, 4),
      this.getPitMask(4, 8),
      8  // position tower display
    ).buffer;
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

  private onESC() {
    if (this.startSequence == 1) {
      this.startAll();
      this.startSequence = 0;
    }
  }

  private startAll() {
    for (let i = 0; i != this.config.numCars; ++i) {
      this.cars[i].start(this.config.minSectorTime, this.config.maxSectorTime, this.config.numSectors, random(0, this.config.maxStartTime));
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

  scan(): Observable<Peripheral> {
    return Observable.of(new DemoPeripheral('Demo', 0x6, this.logger));
  }
};
