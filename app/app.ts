import { Component, ExceptionHandler, Inject, OnInit, ViewChild } from '@angular/core';

import { ModalController, Nav, NavController, Platform } from 'ionic-angular';

import { Insomnia, Splashscreen } from 'ionic-native';

import { ControlUnit } from './carrera';

import { BehaviorSubject, Observable, Subscription } from './rxjs';

import { TargetDirective } from './directives';
import { CONTROL_UNIT_SUBJECT, Logger, Speech, Settings, Toast } from './providers';
import * as pages from './pages';

@Component({
  directives: [TargetDirective],
  providers: [{ provide: CONTROL_UNIT_SUBJECT, useValue: new BehaviorSubject<ControlUnit>(null)}, Speech, Toast],
  templateUrl: 'build/app.html'
})
export class OpenLapApp implements OnInit {
  driversPage = pages.DriversPage;
  carSetupPage = pages.CarSetupPage;
  connectionPage = pages.ConnectionPage;
  settingsPage = pages.SettingsPage;

  @ViewChild(Nav) nav: Nav;

  private subscription: Subscription;

  constructor(@Inject(CONTROL_UNIT_SUBJECT) public cu: BehaviorSubject<ControlUnit>,
              private logger: Logger, private settings: Settings,
              private modal: ModalController, private platform: Platform, private toast: Toast)
  {
    settings.get('logging').subscribe((logging) => {
      logger.setLevel(logging.level);
    });
  }

  ngOnInit() {
    this.platform.ready().then(readySource => {
      this.logger.info('Initializing ' + readySource + ' application');
      this.nav.setRoot(pages.ConnectionPage).then(() => {
        Splashscreen.hide();
      });
      Insomnia.keepAwake();
    });

    this.subscription = this.cu.filter((cu) => !!cu).do(cu => {
      this.startPractice();
    }).switchMap(cu => {
      return cu.getState().debounceTime(200).distinctUntilChanged().map(state => [state, cu.peripheral.name]);
    }).subscribe(([state, device]) => {
      switch (state) {
      case 'connected':
        this.toast.showCenter('Connected to ' + device, 2000);
        break;
      case 'connecting':
        this.toast.showCenter('Connecting to ' + device, 2000);
        break;
      case 'disconnected':
        this.toast.showCenter('Disconnected from ' + device, 5000);
        break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startPractice() {
    this.nav.setRoot(pages.RaceControlPage, { mode: 'practice', auto: true, pace: true });
  }

  startQualifying() {
    this.settings.get('qualifying').take(1).subscribe((options) => {
      options.mode = options.mode || 'qualifying';
      let modal = this.modal.create(pages.RaceSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.set('qualifying', options).then(() => {
            this.nav.setRoot(pages.RaceControlPage, options);
          });
        }
      });
      modal.present();
    });
  }

  startRace() {
    this.settings.get('race').take(1).subscribe((options) => {
      options.mode = options.mode || 'race';
      let modal = this.modal.create(pages.RaceSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.set('race', options).then(() => {
            this.nav.setRoot(pages.RaceControlPage, options);
          });
        }
      });
      modal.present();
    });
  }

  exitApp() {
    if (this.cu.value) {
      this.cu.value.disconnect();
    }
    this.logger.info('Exiting application');
    this.platform.exitApp();
    this.logger.info('Exited application');
  }
}

import './main.ts';
