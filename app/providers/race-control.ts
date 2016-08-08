import { EventEmitter, Injectable } from '@angular/core';

import { ControlUnit } from './control-unit';
import { Logger } from './logger';
import { Speech } from './speech';
import { Storage } from './storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

function raceCompare(lhs, rhs) {
  return (rhs.laps - lhs.laps) || (lhs.time - rhs.time)
}

function qualifyingCompare(lhs, rhs) {
  return (lhs.bestlap || Infinity) - (rhs.bestlap || Infinity);
}

class Car {
  constructor(public id, public driver, public color, public pit) { }

  times: number[] = [];
  stops: number = 0;

  get laps() { return this.times.length ? this.times.length - 1 : 0; }

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

  update(time: number) {
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

  timer = Observable.interval(1000).map(() => {
    if (!this.time) {
      return undefined;
    } else if (this.finished) {
      return 0;
    } else if (this.realStartTime) {
      return Math.max(0, this.realStartTime + this.time - Date.now());
    } else {
      return this.time;
    }
  });

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

  finished = false;

  private _drivers = [];

  private _colors = [];

  get drivers() {
    return this._drivers;
  }

  set drivers(drivers) {
    for (let id of Object.keys(this.cars)) {
      const driver = drivers[id];
      this.cars[id].driver = {
        name: driver.name || 'Driver #' + (parseInt(id) + 1),
        code: driver.code || '#' + (parseInt(id) + 1)
      };
      console.log('set driver #' + (parseInt(id) + 1) + ' to', driver);
    }
    this._drivers = drivers;
  }

  get colors() {
    return this._colors;
  }

  set colors(colors) {
    for (let id of Object.keys(this.cars)) {
      this.cars[id].color = colors[id];
    }
    this._colors = colors;
  }

  messages = {};

  private options: any = {};

  lap = 0;
  laps = 0;
  time = 0;
  bestlap: number;
  pit: number;
  private mask = 0;
  private startTime: number;
  private currentTime: number;
  private realStartTime: number;
  private compare = qualifyingCompare;

  constructor(private cu: ControlUnit, private logger: Logger, private speech: Speech, private storage: Storage) {
    cu.getTime().subscribe(args => this.update.apply(this, args));
    cu.getPit().subscribe(value => this.onPitChange(value));
  }

  start(mode: 'practice' | 'qualifying' | 'race', options: any = {}) {
    this.logger.info('Start ' + mode, options);
    this.messages = this.storage.get('speech', {}).then(obj => {
      this.logger.debug('Messages: ', obj);
      this.messages = obj;
    });
    if (mode === 'race') {
      this.compare = raceCompare;
    } else {
      this.compare = qualifyingCompare;
    }
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
    this.finished = false;

    // FIXME: wait until startlights
    this.cu.getStart().take(1).toPromise().then(value => {
      if ((mode == 'qualifying' || mode == 'race') && value === 0) {
        this.cu.toggleStart();
      }

      this.cu.reset(); // FIXME: cu.reset() no effect if start light is on?
      this.cu.clearPosition();
      this.mask = (this.options.auto ? 0 : 1 << 6) | (this.options.pace ? 0 : 1 << 7);
      this.cu.setMask(this.mask);  // TODO: effective w/startlights?
    });
  }

  private update(id: number, time: number, sector: number) {
    this.logger.debug('Race event', id, time, sector);
    if (this.mask & (1 << id)) {
      return;
    }
    if (this.startTime === undefined) {
      if (this.time) {
        this.timer.filter(value => value === 0).take(1).subscribe({
          complete: () => {
            console.log('Timer finished');
            this.finished = true;
          }
        });
      }
      this.startTime = this.currentTime = time;
      this.realStartTime = Date.now();
    }
    let car = this.cars[id];
    if (!car) {
      const driver = {
        name: this.drivers[id].name || 'Driver #' + (id + 1),
        code: this.drivers[id].code || '#' + (id + 1)
      };
      car = this.cars[id] = new Car(id, driver, this.colors[id], (this.pit & (1 << id)) != 0);
    }
    car.update(time - this.startTime);
    if (!this.bestlap || car.laptime < this.bestlap) {
      this.bestlap = car.laptime;
      if (this.lap > 2 && this.messages['bestlap']) {
        this.speech.speak(this.messages['bestlap'], car.driver);
      }
    }
    if (car.laps > this.lap) {
      this.lap = car.laps;
      this.cu.setLap(this.lap);
      this.currentTime = time;
      if (this.laps && this.lap >= this.laps) {
      if (this.messages['finished']) {
        this.speech.speak(this.messages['finished'], car.driver);
      }
        this.finished = true;
      }
    }
    if ((this.laps && car.laps >= this.laps) || (this.time && time >= this.startTime + this.time)) {
      this.logger.debug('Car #' + car.id + ' finished');
      car.finished = true;
      this.mask |= 1 << id;
      this.cu.setMask(this.mask);
    }

    let items = Object.keys(this.cars).map(id => this.cars[id]);
    items.sort(this.compare);
    items.forEach((item, index) => {
      // TODO: more efficient update?
      // this.cu.setPosition(item.id, index + 1);
    });
    this.ranking.emit(items);
  }

  private onPitChange(value) {
    //this.logger.info('Pit mask', value);
    for (let id of Object.keys(this.cars)) {
      let car = this.cars[id];
      let pit = (value & (1 << parseInt(id))) !== 0;
      if (!(this.mask & (1 << parseInt(id))) && !car.pit && pit) {
        car.stops++;
      }
      car.pit = pit;
    }
    this.pit = value;
  }
}
