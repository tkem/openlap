import { EventEmitter, Injectable } from '@angular/core';

import { ControlUnit } from './cu';
import { Logger } from './logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/observable/interval';

class Car {
    constructor(public id, public driver, public color) { }

    time: number = null;
    laps: number = 0;
    laptime: number = null;
    bestlap: number = null;
    stops: number = 0;
    finished = false;
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

    private _colors = [];

    get colors() {
        return this._colors;
    }

    set colors(colors) {
        for (let id of Object.keys(this.cars)) {
            this.cars[id].color = colors[id];
        }
        this._colors = colors;
    }

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

    private options = {};

    lap = 0;
    laps = 0;
    time = 0;
    private mask = 0;

    private startTime: number;
    private currentTime: number;
    private realStartTime: number;

    constructor(private cu: ControlUnit, private logger: Logger) {
        cu.time.subscribe(event => this.update(event.id, event.time, event.sector));
    }

    start(mode: 'practice' | 'qualifying' | 'race', options: any = {}) {
        this.logger.info('Start ' + mode, options);
        this.mode = mode;
        this.time = parseInt(options.time || 0) * 60 * 1000;
        this.laps = parseInt(options.laps || 0);

        this.mask = (options.auto ? 0 : 1 << 6) | (options.pace ? 0 : 1 << 7);
        this.options = options;
        this.startTime = this.currentTime = this.realStartTime = undefined;

        this.cu.start.take(1).toPromise().then(value => {

            this.cu.clearPosition();
            this.cu.setMask(this.mask);
            this.cu.reset();

            // FIXME: cu.reset() no effect if start light is on?
            if ((mode == 'qualifying' || mode == 'race') && value !== 1) {
                this.cu.toggleStart();
            }
            // FIXME: DRY
            this.lap = 0;
            this.cars = {};
            this.ranking.emit([]);
        });
    }

    private getCar(id: number) {
        if (!(id in this.cars)) {
            this.cars[id] = new Car(id, this.drivers[id], this.colors[id]);
        }
        return this.cars[id];
    }

    private update(id: number, time: number, sector: number) {
        this.logger.debug('Race event', id, time, sector);
        if (this.mask & (1 << id)) {
            return;
        }
        if (this.startTime === undefined) {
            this.startTime = time;
            this.realStartTime = Date.now();
            this.currentTime = time;
        }
        let car = this.getCar(id);
        if (car.time) {
            car.laptime = time - car.time;
            if (++car.laps > this.lap) {
                this.lap = car.laps;
                this.cu.setLap(this.lap);
                this.currentTime = time;
            }
            if ((this.laps && car.laps >= this.laps) ||
                (this.time && time >= this.startTime + this.time)) {
                this.logger.debug('Car #' + car.id + ' finished');
                car.finished = true;
                this.mask |= 1 << id;
                this.cu.setMask(this.mask);
            }
        }
        if (!car.bestlap || car.laptime < car.bestlap) {
            car.bestlap = car.laptime;
        }
        car.time = time;
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
}
