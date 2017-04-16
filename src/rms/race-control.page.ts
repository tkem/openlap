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

const ORIENTATION = {
  portrait: 'position code',
  landscape: 'position number name'
};

const FIELDS = [{
  // no fuel/pit lane
  practice: [
    'bestlap gap int lastlap laps status',
    'bestlap sector1 sector2 sector3 lastlap status'
  ],
  qualifying: [
    'bestlap gap int lastlap laps status',
    'bestlap sector1 sector2 sector3 lastlap status'
  ],
  race: [
    'time bestlap lastlap laps status',
    'time sector1 sector2 sector3 laps status',
  ]
}, {
  // with fuel/pit lane
  practice: [
    'bestlap gap int lastlap laps fuel status',
    'bestlap sector1 sector2 sector3 lastlap fuel status'
  ],
  qualifying: [
    'bestlap gap int lastlap laps fuel status',
    'bestlap sector1 sector2 sector3 lastlap fuel status'
  ],
  race: [
    'time bestlap lastlap laps pits fuel status',
    'time sector1 sector2 sector3 laps fuel status'
  ]
}];

@Component({
  providers: [CONTROL_UNIT_PROVIDER],
  templateUrl: 'race-control.page.html',
})
export class RaceControlPage implements OnDestroy, OnInit {

  options: any;

  slides: Observable<string[][]>;
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

    this.slides = mode.startWith(0).combineLatest(orientation).map(([mode, orientation]) => {
      return FIELDS[mode & 0x03 ? 1 : 0][this.options.mode].map(s => {
        return (ORIENTATION[orientation] + ' ' + s).split(/\s+/)
      });
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

    let bestLap = Infinity;
    const events = Observable.merge(
      session.grid.map(obs => obs.pairwise()).mergeAll().mergeMap(([prev, curr]) => {
        // TODO: driver finished, driver best lap, ...
        const events = [];
        if (curr.bestLap < bestLap) {
          bestLap = curr.bestLap;
          // TODO: use lap count?
          if (curr.laps >= 3) {
            events.push(['bestlap', curr.id]);
          }
        }
        if (!curr.finished && curr.time) {
          if (curr.fuel < prev.fuel) {
            events.push(['fuel' + curr.fuel, curr.id]);
          }
          if (curr.pit && !prev.pit) {
            events.push(['pitenter', curr.id]);
          }
          if (!curr.pit && prev.pit) {
            events.push(['pitexit', curr.id]);
          }
        }
        return Observable.from(events);
      }),
      this.start.distinctUntilChanged().filter(value => value === 9).map(() => {
        return ['falsestart', null];
      }),
      this.lapcount.distinctUntilChanged((x, y) => x.current === y.current).filter(laps => {
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
    }).share();

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
