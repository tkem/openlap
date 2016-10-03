import { ControlUnit } from '../carrera';
import { BehaviorSubject, Observable } from '../rxjs';

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

export interface RaceOptions {
  mode?: string;
  laps?: number;
  time?: number;
  auto?: boolean;
  pace?: boolean;
  slotmode?: boolean;
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
  lap: Observable<[number, number]>;         // TODO: event?
  
  finished = new BehaviorSubject(false);     // TODO: event?
  bestlap = new BehaviorSubject<RaceItem>(null);  // TODO: event?
  timer = Observable.of(0);                  // TODO: event?

  private endTime: number;

  // TODO: move settings handling/combine to race-control!
  constructor(private cu: ControlUnit, private options: RaceOptions) {
    let mask = (options.auto ? 0 : 1 << 6) | (options.pace ? 0 : 1 << 7);
    let offset: number;

    const timer = cu.getTimer().filter(([id]) => (mask & (1 << id)) == 0);
    const fuel = cu.getFuel();
    const pit = cu.getPit();
  
    this.grid = timer.groupBy(([id]) => id, ([_id, time]) => time).map(group => {
      const times = group.scan(([prev, _lastlap, bestlap, laps, fini]: [number, number, number, number, boolean], time) => {
        if (time > prev) {
          ++laps;
          if (!fini && this.isFinished(laps)) {
            mask |= (1 << group.key);
            cu.setMask(mask);
            this.finished.next(true);
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
      ).map(([[time, lastlap, bestlap, laps, fini], [pits, pit], fuel]) => ({
        id: group.key,
        time: time - (offset || (offset = time)),  // TODO: reconnect, CU timer reset...
        lastLap: lastlap,
        bestLap: bestlap,
        laps: laps,
        fuel: fuel,
        pits: <number>pits,
        pit: <boolean>pit,
        finished: fini
      })).do(car => {
        if (car.bestLap && (!this.bestlap.value || car.bestLap < this.bestlap.value.bestLap)) {
          this.bestlap.next(car);
        }
      }
      ).share();
    }).share();


    const compare = COMPARE[options.mode];
    this.ranking = this.grid.mergeAll().scan((grid, event) => {
      const newgrid = [...grid];
      newgrid[event.id] = event;
      return newgrid;
    }, []).map((cars: Array<RaceItem>) => {
      const ranks = cars.filter(car => !!car); 
      ranks.sort(compare);
      return ranks;
    });

    const laps = options.laps ? options.laps : null;
    this.lap = this.grid.mergeAll().scan((lap, event) => {
      // TODO: get from times directly?
      if (lap < event.laps) {
        lap = event.laps;
        if (laps && lap >= laps) {
          this.finished.next(true);
        }
        cu.setLap(lap);
      }
      return lap;
    }, 0).share().startWith(0).distinctUntilChanged().map(lap => {
      return <[number, number]>[lap, laps];
    });

    if (options.time) {
      const time = options.time;
      this.timer = Observable.interval(1000).map(() => {
        if (this.endTime) {
          const delta = Math.max(0, this.endTime - Date.now());
          if (delta === 0) {
            this.finished.next(true);
          }
          return delta;
        } else {
          return time;
        }
      }).share().startWith(time);
    }

    this.cu.clearPosition();  // TODO: not sure...
    this.cu.setMask(mask);    // startlight?
    this.cu.reset();          // FIXME: cu.reset() no effect if start light is on?
  }

  start() {
    if (this.options.time) {
      this.endTime = Date.now() + this.options.time;
    }
  }

  private isFinished(laps: number) {
    if (this.options.laps && laps >= this.options.laps) {
      return true;
    } else if (this.options.time && Date.now() >= this.endTime) {
      return true;  // FIXME: use timer
    } else if (!this.options.slotmode && this.finished.value) {
      return true;
    } else {
      return false;
    }
  }
}
