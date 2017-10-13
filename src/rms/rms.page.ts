import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavParams, PopoverController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { ControlUnit, ControlUnitButton } from '../carrera';
import { CONTROL_UNIT_PROVIDER, Logger, Settings, Speech } from '../core';

import { LeaderboardItem } from './leaderboard';
import { RmsMenu } from './rms.menu';
import { Session } from './session';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/observable/fromEvent';

const ORIENTATION = {
  portrait: 'code',
  landscape: 'number name'
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
    'time sector1 sector2 sector3 lastlap status',
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
    'time sector1 sector2 sector3 lastlap fuel status'
  ]
}];

@Component({
  providers: [CONTROL_UNIT_PROVIDER],
  templateUrl: 'rms.page.html',
})
export class RmsPage implements OnDestroy, OnInit {

  options: any;

  slides: Observable<string[][]>;
  speechEnabled: Observable<boolean>;
  sortorder: Observable<string>;
  lapcount: Observable<{count: number, total: number}>;
  pitlane: Observable<boolean>;

  start: Observable<number>;
  lights: Observable<number>;
  blink: Observable<boolean>;
  timer: Observable<number>;
  keySupported: Observable<boolean>;

  session: Session;

  ranking: Observable<LeaderboardItem[]>;

  private subscription: Subscription;

  constructor(public cu: ControlUnit, private logger: Logger, private settings: Settings, private speech: Speech,
    params: NavParams, private popover: PopoverController, private translate: TranslateService)
  {
    this.options = params.data;

    const start = this.cu.getStart().distinctUntilChanged();
    const state = this.cu.getState().distinctUntilChanged();
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
    this.pitlane = mode.map(value => (value & 0x04) != 0);

    this.keySupported = this.cu.getVersion().distinctUntilChanged().map(v => v >= '5331');
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
    const session = this.session = new Session(this.cu, this.options);

    this.lapcount = session.currentLap.map(lap => {
      return {
        count: lap,
        total: this.options.laps
      };
    });

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

    const best = [Infinity, Infinity, Infinity, Infinity];
    const events = Observable.merge(
      session.grid.map(obs => obs.pairwise()).mergeAll().mergeMap(([prev, curr]) => {
        const events = [];
        curr.best.forEach((time, index) => {
          if ((time || Infinity) < best[index]) {
            best[index] = time;
            if (curr.laps >= 3) {
              events.push([index ? 'bests' + index : 'bestlap', curr.id]);
            }
          }
        });
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
      this.lapcount.filter(laps => {
        return this.options.laps && laps.count === this.options.laps && !session.finished.value;
      }).map(() => {
        return ['finallap', null];
      }),
      session.yellowFlag.distinctUntilChanged().skipWhile(value => !value).map(value => {
        return [value ? 'yellowflag' : 'greenflag', null];
      }),
      session.finished.distinctUntilChanged().filter(finished => finished).map(() => {
        return ['finished', null];
      })
    ).withLatestFrom(drivers).map(([[event, id], drivers]) => {
      return <[string, any]>[event, id !== null ? drivers[id] : null];
    });

    // TODO: convert to Observable.scan()?
    const gridpos = [];
    const pitfuel = [];
    this.ranking = session.ranking.combineLatest(drivers).map(([ranks, drivers]) => {
      return ranks.map((item, index) => {
        if (this.options.mode == 'race' && gridpos[item.id] === undefined && item.time !== undefined) {
          gridpos[item.id] = index;
        }
        if (!item.pit || item.fuel < pitfuel[item.id]) {
          pitfuel[item.id] = item.fuel;
        }
        return Object.assign({}, item, {
          position: index,
          driver: drivers[item.id],
          gridpos: gridpos[item.id],
          refuel: item.pit && item.fuel > pitfuel[item.id]
        });
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
      this.logger.debug('Race event: ' + event, driver);
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
          this.cu.setLap(laps.count);
        },
        error => {
          this.logger.error('Lap counter error:', error);
        },
        () => {
          this.logger.info('Lap counter finished');
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

  triggerPaceCar() {
    this.cu.trigger(ControlUnitButton.PACE_CAR);
  }

  triggerStart() {
    this.cu.trigger(ControlUnitButton.START);
  }

  showMenu(event) {
    let menu = this.popover.create(RmsMenu, {
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
