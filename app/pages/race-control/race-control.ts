import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { ControlUnit } from '../../carrera';

import { BehaviorSubject, Observable, Subscription } from '../../rxjs';

import { CONTROL_UNIT_PROVIDER, Logger, Settings, Speech } from '../../providers';

import { ChequeredFlag, Leaderboard, LeaderboardItem, Startlight } from '../../components';

import { TimePipe } from '../../pipes';

import { RaceSession } from './race-session';

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

  private ranking: Observable<LeaderboardItem[]>;

  private events: Observable<[string, any]>;

  private subscription: Subscription;

  constructor(private cu: ControlUnit, private logger: Logger, private settings: Settings, private speech: Speech, params: NavParams) {
    this.logger.info('Main page', cu, params.data);
    this.options = params.data;

    let start = this.cu.getStart().distinctUntilChanged();
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

    this.session = new RaceSession(cu, this.options);

    this.ranking = this.session.ranking.combineLatest(
      settings.get('drivers'),
      settings.get('colors')
    ).map(([ranks, drivers, colors]) => {
      return ranks.map(item => {
        return Object.assign({}, item, { driver: drivers[item.id], color: colors[item.id] });
      });
    });

    this.events = Observable.merge(
      this.session.grid.map(obs => obs.pairwise()).mergeAll().filter(([prev, curr]) => {
        // TODO: driver finished, driver best lap, ...
        return prev.fuel > curr.fuel && curr.fuel < 3;
      }).map(([prev, curr]) => {
        return ['fuel' + curr.fuel, curr.id];
      }),
      this.session.bestlap.filter(car => car && car.laps >= 3).map(car => {
        return ['bestlap', car.id];
      }),
      this.session.lap.filter(([lap, laps]) => lap === laps - 1).map(() => {
        return ['finallap', null];
      }),
      this.session.finished.distinctUntilChanged().filter(finished => finished).map(() => {
        return ['finished', null];
      })
    ).withLatestFrom(settings.get('drivers')).map(([[event, id], drivers]) => {
      return <[string, any]>[event, id !== null ? drivers[id] : null];
    });
  }

  ngOnInit() {
    this.subscription = this.events.combineLatest(this.settings.get('speech')).subscribe(([[event, driver], speech]) => {
      console.log('New race event: ' + event, driver);
      if (speech.enabled && speech[event]) {
        this.speech.speak(speech[event], driver || {});
      }
    });

    if (this.options.mode != 'practice') {
      const session = this.session;
      const start = this.cu.getStart();
      start.take(1).toPromise().then(value => {
        if (value === 0) {
          this.cu.toggleStart();
        }
        // wait until startlight goes off; TODO: subscribe/unsibscribe?
        this.cu.getStart().pairwise().filter(([prev, curr]) => {
          return prev != 0 && curr == 0;
        }).take(1).toPromise().then(() => {
          this.logger.info('Start ' + this.options.mode + ' mode');
          session.start();
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
