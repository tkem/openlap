import { BehaviorSubject, Observable } from 'rxjs';

import { ControlUnit } from '../carrera';
import { RaceOptions } from '../core';

const TIMER_INTERVAL = 500;

export interface RaceItem {
  id: number
  time: number;
  laps: number;
  lastLap: number;
  bestLap: number;
  fuel?: number;
  pits?: number;
  pit?: boolean;
  finished?: boolean
}

function timeCompare(lhs: RaceItem, rhs: RaceItem) {
  return (lhs.bestLap || Infinity) - (rhs.bestLap || Infinity);
}

function raceCompare(lhs: RaceItem, rhs: RaceItem) {
  return (rhs.laps - lhs.laps) || (lhs.time - rhs.time);
}

const COMPARE = {
  'practice': timeCompare,
  'qualifying': timeCompare,
  'race': raceCompare
}

export class RaceSession {
  grid: Observable<Observable<RaceItem>>;
  ranking: Observable<RaceItem[]>;
  lap: Observable<number[]>;                      // current/finished
  finished = new BehaviorSubject(false);          // TODO: event?
  bestlap = new BehaviorSubject<RaceItem>(null);  // TODO: event?
  timer = Observable.of(0);                       // TODO: event?
  started = false;
  stopped = false;

  private mask: number;
  private active = 0;

  // TODO: move settings handling/combine to race-control!
  constructor(private cu: ControlUnit, private options: RaceOptions) {
    let offset: number;

    const timer = cu.getTimer().filter(([id]) => (this.mask & (1 << id)) == 0);
    const fuel = cu.getFuel();
    const pit = cu.getPit();

    const reset = Observable.merge(
      cu.getStart().distinctUntilChanged().filter(start => start != 0),
      cu.getState().distinctUntilChanged().filter(state => state == 'connected')
    ).map(value => {
      cu.setMask(this.mask);
    });

    this.mask = (options.auto ? 0 : 1 << 6) | (options.pace ? 0 : 1 << 7);

    this.grid = timer.groupBy(([id]) => id, ([_id, time]) => time).map(group => {
      type TimeInfo = [number, number, number, number, boolean];
      this.active |= (1 << group.key);
      const times = group.scan(([prev, _lastlap, bestlap, laps, fini]: TimeInfo, time): TimeInfo => {
        if (time > prev) {
          ++laps;
          if (!fini && this.isFinished(laps)) {
            this.finish(group.key);
            return [time, time - prev, Math.min(time - prev, bestlap || Infinity), laps, true];
          } else {
            return [time, time - prev, Math.min(time - prev, bestlap || Infinity), laps, fini];
          }
        } else {
          return [time, NaN, bestlap, laps, fini];
        }
      }, [NaN, NaN, NaN, 0, false]);
      // TODO: count when starting from pitlane, memoize lap for stats?
      const pits = pit.map(mask => (mask & (1 << group.key)) != 0).distinctUntilChanged().scan(
        ([count]: [number, boolean], pit: boolean) => {
          return [pit ? count + 1 : count, pit]
        }, [0, false]);
      return times.combineLatest(
        pits,
        fuel.map(fuel => fuel[group.key]).distinctUntilChanged()
      ).map(([[time, lastlap, bestlap, laps, fini], [pits, pit], fuel]: [TimeInfo, [number, boolean], number]) => ({
        id: group.key,
        time: time - (offset || (offset = time)),  // TODO: reconnect, CU timer reset...
        lastLap: lastlap,
        bestLap: bestlap,
        laps: laps,
        fuel: fuel,
        pits: <number>pits,
        pit: <boolean>pit,
        finished: fini
      })).do((car: RaceItem) => {
        if (car.bestLap && (!this.bestlap.value || car.bestLap < this.bestlap.value.bestLap)) {
          this.bestlap.next(car);
        }
      }).share();
    }).share();

    const compare = COMPARE[options.mode];

    this.ranking = reset.startWith(null).combineLatest(this.grid).map(([_reset, grid]) => {
      return grid;  // for reset side effects only...
    }).mergeAll().scan((grid, event) => {
      const newgrid = [...grid];
      newgrid[event.id] = event;
      return newgrid;
    }, []).map((cars: Array<RaceItem>) => {
      const ranks = cars.filter(car => !!car); 
      ranks.sort(compare);
      return ranks;
    });

    this.lap = this.grid.mergeAll().scan(([current, completed], event) => {
      if (completed <= event.laps) {
        completed = event.laps;
        if (options.laps && completed >= options.laps) {
          this.finish();
        }
        if (!this.finished.value && event.laps >= current) {
          current = event.laps + 1;
        }
      }
      return [current, completed];
    }, [0, 0]).share().startWith([0, 0]).distinctUntilChanged(([x1, x2], [y1, y2]) => {
      return x1 == y1 && x2 == y2;
    });

    if (options.time) {
      this.timer = Observable.interval(TIMER_INTERVAL).withLatestFrom(
        cu.getStart()
      ).filter(([_, start]) => {
        return this.started && (!this.options.pause || start == 0);
      }).scan((time) => {
        return Math.max(0, time - TIMER_INTERVAL);
      }, options.time).do(time => {
        if (time == 0) {
          this.stopped = true;
          this.finish();
        }
      }).share().startWith(options.time);
    }

    this.cu.clearPosition();
    this.cu.reset();
  }

  start() {
    this.started = true;
  }

  stop() {
    this.stopped = true;
    this.finish();
  }

  private finish(id?: number) {
    const mask = this.mask;
    this.mask |= (~this.active & 0xff);
    if (id !== undefined) {
      this.mask |= (1 << id);
    }
    if (mask != this.mask) {
      this.cu.setMask(this.mask);
    }
    this.finished.next(true);
  }

  private isFinished(laps: number) {
    if (this.stopped) {
      return true;
    } else if (this.options.laps && laps >= this.options.laps) {
      return true;
    } else if (!this.options.slotmode && this.finished.value) {
      return true;
    } else {
      return false;
    }
  }
}
