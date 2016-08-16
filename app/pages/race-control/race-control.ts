import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { ControlUnit } from '../../carrera';

import { BehaviorSubject, Observable, Subscription } from '../../rxjs';

import { CONTROL_UNIT_PROVIDER, Logger, Settings, Speech } from '../../providers';

import { ChequeredFlag, Leaderboard, LeaderboardItem, Startlight } from '../../components';

import { TimePipe } from '../../pipes';

interface Car extends LeaderboardItem {
  id: number
}

const FIELDS = {
  'practice': (mode: number) => {
    if (mode & 0x03) {
      return ['position', 'name', 'bestlap', 'gap', 'int', 'laptime', 'laps', 'fuel', 'status'];
    } else {
      return ['position', 'name', 'bestlap', 'gap', 'int', 'laptime', 'laps', 'status'];
    }
  },
  'qualifying': (mode: number) => {
    if (mode & 0x03) {
      return ['position', 'name', 'bestlap', 'gap', 'int', 'laptime', 'laps', 'fuel', 'status'];
    } else {
      return ['position', 'name', 'bestlap', 'gap', 'int', 'laptime', 'laps', 'status'];
    }
  },
  'race': (mode: number) => {
    if (mode & 0x03) {
      return ['position', 'name', 'time', 'bestlap', 'laptime', 'laps', 'pits', 'fuel', 'status'];
    } else {
      return ['position', 'name', 'time', 'bestlap', 'laptime', 'laps', 'status'];
    }
  }
};

function createSession(cu: ControlUnit, settings: Settings, options: any) {
  let mask = (options.auto ? 0 : 1 << 6) | (options.pace ? 0 : 1 << 7);
  let offset: number;
  let endTime: number;
  
  const isFinished = (laps: number) => {
    if (options.laps && laps >= options.laps) {
      return true;
    } else if (endTime && Date.now() >= endTime) {
      return true;  // FIXME: use timer
    } else {
      return false;
    }
  }

  const finished = new BehaviorSubject(false);
  const bestlap = new BehaviorSubject<Car>(null);

  const timer = cu.getTimer().filter(([id, time]) => (mask & (1 << id)) == 0);
  const fuel = cu.getFuel();
  const pit = cu.getPit();
  const drivers = settings.get('drivers');
  const colors = settings.get('colors');
  
  const grid = timer.groupBy(([id]) => id, ([id, time]) => time).map(group => {
    const times = group.scan(([prev, lastlap, bestlap, laps, fini]: [number, number, number, number, boolean], time) => {
      if (time > prev) {
        if (!fini && isFinished(laps + 1)) {
          mask |= (1 << group.key);
          cu.setMask(mask);
          finished.next(true);
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
      if (car.bestLap && (!bestlap.value || car.bestLap < bestlap.value.bestLap)) {
        bestlap.next(car);
      }
    }
    ).share();
  }).share();

  const lap = grid.mergeAll().scan((lap, event) => {
    // TODO: get from times directly?
    if (lap < event.laps) {
      lap = event.laps;
      if (options.laps && lap >= options.laps) {
        finished.next(true);
      }
      cu.setLap(lap);
    }
    return lap;
  }, 0).startWith(0).distinctUntilChanged();

  const realTimer = Observable.interval(1000).map(() => {
    const delta = Math.max(0, endTime - Date.now());
    if (delta === 0) {
      finished.next(true);
    }
    return delta;
  }).share().startWith(parseInt(options.time) * 60 * 1000);

  return {
    grid: grid,
    finished: finished,
    lap: lap,
    bestlap: bestlap,
    timer: options.time ? realTimer : Observable.of(0),
    start: () => {
      endTime = Date.now() + parseInt(options.time) * 60 * 1000;
      cu.reset(); // FIXME: cu.reset() no effect if start light is on?
      cu.setMask(mask);  // TODO: ditto
      cu.clearPosition();  // TODO: not sure...
    }
  }
}

@Component({
  directives: [ChequeredFlag, Leaderboard, Startlight],
  pipes: [TimePipe],
  providers: [CONTROL_UNIT_PROVIDER],
  templateUrl: 'build/pages/race-control/race-control.html',
})
export class RaceControlPage implements OnDestroy, OnInit {

  options: any;

  fields: Observable<string[]>;

  start: Observable<number>;
  blink: Observable<boolean>;
  timer: Observable<number>;

  session: {
    grid: Observable<Observable<Car>>,
    finished: Observable<boolean>,
    lap: Observable<number>,
    bestlap: Observable<Car>,
    timer: Observable<number>,
    start: () => void
  };

  private ranking: Observable<Car[]>;

  private events: Observable<[string, Car]>;

  private subscription: Subscription;

  constructor(private cu: ControlUnit, private logger: Logger, private settings: Settings, private speech: Speech, params: NavParams) {
    this.logger.info('Main page', cu, params.data);
    this.options = params.data;

    let start = this.cu.getStart().distinctUntilChanged().do(value => console.log('Start: ' + value));
    let state = this.cu.getState().distinctUntilChanged();
    let mode = this.cu.getMode().distinctUntilChanged().do(value => console.log('Mode: ' + value));

    this.fields = mode.startWith(0).distinctUntilChanged().map(mode => {
      return FIELDS[this.options.mode](mode);
    });

    this.start = start.map(value => {
      return value == 1 ? 5 : value > 1 && value < 7 ? value - 1 : 0;
    });
    this.blink = state.combineLatest(start, (state, value) => {
      return state !== 'connected' || value >= 8;
    });

    this.session = createSession(cu, settings, this.options);

    this.ranking = this.session.grid.mergeAll().scan((grid, event) => {
      const newgrid = [...grid];
      newgrid[event.id] = event;
      return newgrid;
    }, []).map((cars: Array<Car>) => {
      const ranks = cars.filter(car => !!car); 
      if (this.options.mode == 'race') {
        ranks.sort((lhs, rhs) => (rhs.laps - lhs.laps) || (lhs.time - rhs.time));
      } else {
        ranks.sort((lhs, rhs) => (lhs.bestLap || Infinity) - (rhs.bestLap || Infinity))
      }
      return ranks;
    });

    this.events =  this.session.grid.map(obs => obs.pairwise()).mergeAll().map(([prev, curr]): [string, Car] => {
      if (prev.finished !== curr.finished) {
        return ['finished', curr];
      // TODO: personal best?
//      } else if (curr.lastLap === bestlap && curr.lastLap != prev.lastLap && curr.laps >= 3) {
//        return ['bestlap', curr];
      } else if (prev.fuel >= 3 && curr.fuel < 3) {
        return ['lowfuel', curr];
      } else {
        return null;
      }
    }).merge(this.session.bestlap.filter(car => car && car.laps >= 3).map((car): [string, Car] => {
      return ['bestlap', car];
    })).filter(event => !!event);

    // TODO: move to ngOnInit
    start.take(1).toPromise().then(value => {
      // FIXME: wait until startlights
      this.session.start();
      if ((this.options.mode == 'qualifying' || this.options.mode == 'race') && value === 0) {
        this.cu.toggleStart();
      }
    });
  }

  ngOnInit() {
    this.subscription = this.events.combineLatest(this.settings.get('speech')).subscribe(([[event, car], speech]) => {
      console.log('New race event: ' + event, car);
      if (speech.enabled && speech[event]) {
        this.speech.speak(speech[event], car.driver);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
