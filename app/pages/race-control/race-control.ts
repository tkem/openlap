import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { ControlUnit } from '../../carrera';

import { BehaviorSubject, Observable, Subscription } from '../../rxjs';

import { CONTROL_UNIT_PROVIDER, Logger, Settings, Speech } from '../../providers';

import { ChequeredFlag, Leaderboard, LeaderboardItem, Startlight } from '../../components';

import { TimePipe } from '../../pipes';

import { Car, RaceSession } from './race-session';

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

@Component({
  selector: 'lap',
  template: '{{value[0]}}<span *ngIf="value[1]">/{{value[1]}}</span>'
})
class Lap {
  @Input() value: [number, number];
}

@Component({
  directives: [ChequeredFlag, Lap, Leaderboard, Startlight],
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

  session: RaceSession;

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

    this.session = new RaceSession(cu, settings, this.options);

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

    this.events = Observable.merge(
      this.session.grid.map(obs => obs.pairwise()).mergeAll().filter(([prev, curr]) => {
        // TODO: driver finished, driver best lap, ...
        return prev.fuel >= 3 && curr.fuel < 3;
      }).map(([prev, curr]) => {
        return <[string, Car]>['lowfuel', curr];
      }),
      this.session.bestlap.filter(car => car && car.laps >= 3).map((car): [string, Car] => {
        return <[string, Car]>['bestlap', car];
      }),
      this.session.lap.filter(([lap, laps]) => lap === laps - 1).map(() => {
        return <[string, Car]>['finallap', null];
      }),
      this.session.finished.distinctUntilChanged().filter(finished => finished).map(() => {
        return <[string, Car]>['finished', null];
      })
    );

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
        this.speech.speak(speech[event], car ? car.driver : {});
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
