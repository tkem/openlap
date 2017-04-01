import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavParams, PopoverController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_PROVIDER, Settings, Speech } from '../core';
import { LeaderboardItem } from '../leaderboard';
import { Logger } from '../logging';

import { RaceControlMenu } from './race-control.menu';
import { RaceSession } from './race-session';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/observable/fromEvent';

const FIELDS = {
  'practice': [
    ['position', 'code', 'bestlap', 'gap', 'int', 'lastlap', 'laps', 'status'],
    ['position', 'number', 'name', 'bestlap', 'gap', 'int', 'lastlap', 'laps', 'status'],
    ['position', 'code', 'bestlap', 'gap', 'int', 'lastlap', 'laps', 'fuel', 'status'],
    ['position', 'number', 'name', 'bestlap', 'gap', 'int', 'lastlap', 'laps', 'fuel', 'status']
  ],
  'qualifying': [
    ['position', 'code', 'bestlap', 'gap', 'int', 'lastlap', 'laps', 'status'],
    ['position', 'number', 'name', 'bestlap', 'gap', 'int', 'lastlap', 'laps', 'status'],
    ['position', 'code', 'bestlap', 'gap', 'int', 'lastlap', 'laps', 'fuel', 'status'],
    ['position', 'number', 'name', 'bestlap', 'gap', 'int', 'lastlap', 'laps', 'fuel', 'status']
  ],
  'race': [
    ['position', 'code', 'time', 'bestlap', 'lastlap', 'laps', 'status'],
    ['position', 'number', 'name', 'time', 'bestlap', 'lastlap', 'laps', 'status'],
    ['position', 'code', 'time', 'bestlap', 'lastlap', 'laps', 'pits', 'fuel', 'status'],
    ['position', 'number', 'name', 'time', 'bestlap', 'lastlap', 'laps', 'pits', 'fuel', 'status']
  ]
};

@Component({
  providers: [CONTROL_UNIT_PROVIDER],
  templateUrl: 'race-control.page.html',
})
export class RaceControlPage implements OnDestroy, OnInit {

  options: any;

  fields: Observable<string[]>;
  speechEnabled: Observable<boolean>;
  sortorder: Observable<string>;
  lapcount: Observable<{count: number, current: number, total: number}>;

  start: Observable<number>;
  lights: Observable<number>;
  blink: Observable<boolean>;
  timer: Observable<number>;

  session: RaceSession;

  ranking: Observable<LeaderboardItem[]>;

  private subscription: Subscription;

  constructor(public cu: ControlUnit, private logger: Logger, private settings: Settings, private speech: Speech,
    params: NavParams, private popover: PopoverController, private translate: TranslateService)
  {
    this.options = params.data;

    const start = this.cu.getStart();  // TODO: distinctUntilChanged
    const state = this.cu.getState();  // TODO: distinctUntilChanged
    const mode = this.cu.getMode().distinctUntilChanged();

    // use "resize" event for easier testing on browsers
    const orientation = Observable.fromEvent(window, 'resize').startWith(undefined).map(() => {
      return window.innerWidth < window.innerHeight ? 'portrait' : 'landscape';
    }).distinctUntilChanged();

    this.fields = mode.startWith(0).combineLatest(orientation).map(([mode, orientation]) => {
      const index = (orientation === 'portrait' ? 0 : 1) + (mode & 0x03 ? 2 : 0);
      return FIELDS[this.options.mode][index];
    });

    this.speechEnabled = settings.getOptions().map(options => options.speech);
    this.sortorder = settings.getOptions().map(options => options.fixedorder ? 'number' : 'position');

    this.start = start;
    this.lights = start.map(value => {
      return value == 1 ? 5 : value > 1 && value < 7 ? value - 1 : 0;
    });
    this.blink = state.combineLatest(start, (state, value) => {
      return state !== 'connected' || value >= 8;
    });
  }

  ngOnInit() {
    this.onStart();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onStart() {
    const session = this.session = new RaceSession(this.cu, this.options);

    this.lapcount = session.lap.combineLatest(this.settings.getOptions()).map(([[current, completed], options]) => {
      return {
        count: options.currentlap ? current : completed,
        current: current,
        total: this.options.laps
      };
    }).share().startWith({count: 0, current: 0, total: this.options.laps});

    const drivers = this.settings.getDrivers().switchMap(drivers => {
      const observables = drivers.map((obj, index) => {
        const code = obj.code || '#' + (index + 1);
        if (obj.name) {
          return Observable.of({name: obj.name, code: code, color: obj.color});
        } else {
          return this.getTranslations('Driver {{number}}', {number: index + 1}).map(name => {
            return {name: name, code: code, color: obj.color}
          });
        }
      });
      return Observable.combineLatest(...observables);
    });

    // sort in order of importance for speech
    const events = Observable.merge(
      session.grid.map(obs => obs.pairwise()).mergeAll().mergeMap(([prev, curr]) => {
        // TODO: driver finished, driver best lap, ...
        const events = [];
        if (!curr.finished) {
          if (curr.pit && !prev.pit) {
            events.push(['pitenter', curr.id]);
          }
          if (!curr.pit && prev.pit) {
            events.push(['pitexit', curr.id]);
          }
          if (curr.fuel < prev.fuel) {
            events.push(['fuel' + curr.fuel, curr.id]);
          }
        }
        return Observable.from(events);
      }),
      session.bestlap.filter(car => car && car.laps >= 3).map(car => {
        return ['bestlap', car.id];
      }),
      this.start.distinctUntilChanged().filter(value => value == 9).map(() => {
        return ['falsestart', null];
      }),
      this.lapcount.distinctUntilChanged((x, y) => x.current == y.current).filter(laps => {
        return this.options.laps && laps.current === this.options.laps && !session.finished.value;
      }).map(() => {
        return ['finallap', null];
      }),
      session.finished.distinctUntilChanged().filter(finished => finished).map(() => {
        return ['finished', null];
      })
    ).withLatestFrom(drivers).map(([[event, id], drivers]) => {
      return <[string, any]>[event, id !== null ? drivers[id] : null];
    });

    this.ranking = session.ranking.combineLatest(drivers).map(([ranks, drivers]) => {
      return ranks.map((item, index) => {
        return Object.assign({}, item, { position: index, driver: drivers[item.id] });
      });
    });

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = events.withLatestFrom(
      this.settings.getOptions(),
      this.settings.getNotifications(),
      this.getTranslations('notifications')
    ).subscribe(([[event, driver], options, notifications, translations]) => {
      this.logger.debug('New race event: ' + event, driver);
      if (options.speech && notifications[event] && notifications[event].enabled) {
        let message = notifications[event].message || translations[event];
        if (driver && driver.name) {
          this.speech.speak(driver.name + ': ' + message);
        } else {
          this.speech.speak(message);
        }
      }
    });

    this.subscription.add(
      this.lapcount.subscribe(
        laps => {
          this.logger.debug('New lap', laps);
          this.cu.setLap(laps.count);
        },
        error => {
          this.logger.error('Lap counter error:', error);
        },
        () => {
          this.logger.warn('Lap counter finished');
        }
      )
    );

    if (this.options.mode != 'practice') {
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

  toggleSpeech() {
    this.settings.getOptions().take(1).subscribe(options => {
      this.settings.setOptions(Object.assign({}, options, {speech: !options.speech}));
    });
  }

  showMenu(event) {
    let menu = this.popover.create(RaceControlMenu, {
      active: this.session && !this.session.finished.value && this.options.mode != 'practice',
      restart: () => this.onStart(),
      stop:  () => this.session.stop(),
    });
    menu.present({ev: event});
  }

  // see https://github.com/ngx-translate/core/issues/330
  private getTranslations(key: string, params?: Object) {
    return this.translate.get(key, params).concat(
      this.translate.onLangChange.asObservable().map(() => this.translate.get(key, params)).concatAll()
    );
  }
}
