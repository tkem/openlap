import { EventEmitter, Injectable } from '@angular/core';

import { ControlUnit } from './cu';
import { Logger } from './logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

class Car {
  constructor(public id, public driver, public pit) { }

  times: number[] = [];
  stops: number = 0;

  get laps() { return this.times.length ? this.times.length - 1 : undefined; }

  get time() { return this.times[this.times.length - 1]; }

  get laptime() { 
    let times = this.times;
    let n = times.length;
    if (n > 1) {
      return times[n - 1] - times[n - 2];
    } else {
      return undefined;
    }
  }

  bestlap: number;
  finished = false;

  add(time: number) {
    this.times.push(time);
    let laptime = this.laptime;
    if (!this.bestlap || laptime < this.bestlap ) {
      this.bestlap = laptime;
    }
  }
}

@Injectable()
export class RaceControl {
  private cars = {};

  ranking = new EventEmitter<Car[]>();

  clock = Observable.interval(1000).map(() => {
    if (this.realStartTime) {
      let t = Date.now() - this.realStartTime;
      // TODO: limit to max. time?
      return t;
    } else {
      return 0;
    }
  });

  mode = 'practice';

  private _drivers = [];

  get drivers() {
    return this._drivers;
  }

  set drivers(drivers) {
    for (let id of Object.keys(this.cars)) {
      this.cars[id].driver = drivers[id];
    }
    this._drivers = drivers;
  }

  private options: any = {};

  lap = 0;
  laps = 0;
  time = 0;
  bestlap: number;
  private mask = 0;
  private pit: boolean[] = [];
  private startTime: number;
  private currentTime: number;
  private realStartTime: number;

  constructor(private cu: ControlUnit, private logger: Logger) {
    cu.time.subscribe(event => this.update(event.id, event.time, event.sector));
    cu.pit.subscribe(value => this.onPitChange(value));
  }

  start(mode: 'practice' | 'qualifying' | 'race', options: any = {}) {
    this.logger.info('Start ' + mode, options);
    this.mode = mode;
    this.time = parseInt(options.time || 0) * 60 * 1000;
    this.laps = parseInt(options.laps || 0);

    this.lap = 0;
    this.mask = 0;
    this.cars = {};
    this.ranking.emit([]);
    this.options = options;
    this.startTime = this.currentTime = this.realStartTime = undefined;
    this.bestlap = undefined;

    // FIXME: wait until startlights
    this.cu.start.take(1).toPromise().then(value => {
      // FIXME: cu.reset() no effect if start light is on?
      this.cu.clearPosition();
      this.cu.reset();

      if ((mode == 'qualifying' || mode == 'race') && value !== 1) {
        this.cu.toggleStart();
      }

      this.mask = (this.options.auto ? 0 : 1 << 6) | (this.options.pace ? 0 : 1 << 7);
      this.cu.setMask(this.mask);  // TODO: effective w/startlights?
    });
  }

  private getCar(id: number) {
    if (!(id in this.cars)) {
      this.cars[id] = new Car(id, this.drivers[id], this.pit[id]);
    }
    return this.cars[id];
  }

  private update(id: number, time: number, sector: number) {
    this.logger.debug('Race event', id, time, sector);
    if (this.mask & (1 << id)) {
      return;
    }
    if (this.startTime === undefined) {
      this.startTime = this.currentTime = time;
      this.realStartTime = Date.now();
    }
    let car = this.getCar(id);
    car.add(time);
    if (!this.bestlap || car.laptime < this.bestlap) {
      this.bestlap = car.laptime;
    }
    if (car.laps > this.lap) {
      this.lap = car.laps;
      this.cu.setLap(this.lap);
      this.currentTime = time;
    }
    if ((this.laps && car.laps >= this.laps) || (this.time && time >= this.startTime + this.time)) {
      this.logger.debug('Car #' + car.id + ' finished');
      car.finished = true;
      this.mask |= 1 << id;
      this.cu.setMask(this.mask);
    }
    let items = Object.keys(this.cars).map(id => this.cars[id]);
    switch (this.mode) {
      case 'practice':
        // TODO: ranking for practice mode?
        items.sort((lhs, rhs) => (rhs.laps - lhs.laps) || (lhs.time - rhs.time));
        break;
      case 'qualifying':
        items.sort((lhs, rhs) => (lhs.bestlap || Infinity) - (rhs.bestlap || Infinity));
        break;
      case 'race':
        items.sort((lhs, rhs) => (rhs.laps - lhs.laps) || (lhs.time - rhs.time));
        break;
    }
    // TODO: more efficient update?
    items.forEach((item, index) => this.cu.setPosition(item.id, index + 1));
    //this.logger.debug(items);
    this.ranking.emit(items);
  }

  private onPitChange(value) {
    //this.logger.info('Pit mask', value);
    for (let id of Object.keys(this.cars)) {
      let car = this.cars[id];
      if (!(this.mask & (1 << parseInt(id))) && !car.pit && value[id]) {
        car.stops++;
      }
      car.pit = value[id];
    }
    this.pit = value;
  }
}
