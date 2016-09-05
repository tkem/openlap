import { ControlUnit } from '../../carrera';

import { Settings } from '../../providers';

import { LeaderboardItem } from '../../components';

import { BehaviorSubject, Observable, Subscription } from '../../rxjs';

export interface Car extends LeaderboardItem{
  id: number
}

export class RaceSession {
  grid: Observable<Observable<Car>>;
  lap: Observable<[number, number]>;
  
  finished = new BehaviorSubject(false);
  bestlap = new BehaviorSubject<Car>(null);
  timer = Observable.of(0);

  private endTime: number;

  constructor(private cu: ControlUnit, private settings: Settings, private options: any) {
    let mask = (options.auto ? 0 : 1 << 6) | (options.pace ? 0 : 1 << 7);
    let offset: number;

    const timer = cu.getTimer().filter(([id, time]) => (mask & (1 << id)) == 0);
    const fuel = cu.getFuel();
    const pit = cu.getPit();
    const drivers = settings.get('drivers');
    const colors = settings.get('colors');

  
    this.grid = timer.groupBy(([id]) => id, ([id, time]) => time).map(group => {
      const times = group.scan(([prev, lastlap, bestlap, laps, fini]: [number, number, number, number, boolean], time) => {
        if (time > prev) {
          if (!fini && this.isFinished(laps + 1)) {
            mask |= (1 << group.key);
            cu.setMask(mask);
            this.finished.next(true);
            return [time, time - prev, Math.min(time - prev, bestlap || Infinity), laps + 1, true];
          } else {
            return [time, time - prev, Math.min(time - prev, bestlap || Infinity), laps + 1, fini];
          }
        } else {
          return [time, NaN, bestlap, laps, fini];
        }
      }, [NaN, NaN, NaN, 0, false]);
      // TODO: count when starting from pitlane, memoize lap for stats?
      const pits = pit.map(mask => (mask & (1 << group.key)) != 0).distinctUntilChanged().scan(
        ([count, flag]: [number, boolean], pit: boolean) => {
          return [pit ? count + 1 : count, pit]
        }, [0, false]);
      return times.combineLatest(
        pits,
        fuel.map(fuel => fuel[group.key]).distinctUntilChanged(),
        drivers.map(drivers => drivers[group.key]),
        colors.map(colors => colors[group.key])
      ).map(([[time, lastlap, bestlap, laps, fini], [pits, pit], fuel, driver, color]) => ({
        id: group.key,
        driver: driver,
        color: color,
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

    const laps = options.laps ? parseInt(options.laps) : null;
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
      this.timer = Observable.interval(1000).map(() => {
        const delta = Math.max(0, this.endTime - Date.now());
        if (delta === 0) {
          this.finished.next(true);
        }
        return delta;
      }).share().startWith(parseInt(options.time) * 60 * 1000);
    }

    this.cu.setMask(mask);  // startlight?
  }

  start() {
    this.endTime = Date.now() + parseInt(this.options.time) * 60 * 1000;
    this.cu.reset(); // FIXME: cu.reset() no effect if start light is on?
    this.cu.clearPosition();  // TODO: not sure...
  }

  private isFinished = (laps: number) => {
    if (this.options.laps && laps >= parseInt(this.options.laps)) {
      return true;
    } else if (this.endTime && Date.now() >= this.endTime) {
      return true;  // FIXME: use timer
    } else {
      return false;
    }
  }
}
