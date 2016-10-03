import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { ModalController, Nav, Platform } from 'ionic-angular';

import { Insomnia, Splashscreen } from 'ionic-native';

import { BehaviorSubject, Subscription } from '../rxjs';

import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_SUBJECT, Settings } from '../core';
import { Logger } from '../logging';
import { CarSetupPage, ConnectionPage, RaceSettingsPage, RaceControlPage } from '../rms';
import { DriversPage, SettingsPage } from '../settings';
import { Toast } from '../shared';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit {
  @ViewChild(Nav) nav: Nav;

  driversPage = DriversPage;
  carSetupPage = CarSetupPage;
  connectionPage = ConnectionPage;
  settingsPage = SettingsPage;


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
      this.nav.setRoot(ConnectionPage).then(() => {
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
    this.nav.setRoot(RaceControlPage, { mode: 'practice', auto: true, pace: true });
  }

  startQualifying() {
    this.settings.get('qualifying').take(1).subscribe((options) => {
      options.mode = options.mode || 'qualifying';
      let modal = this.modal.create(RaceSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.set('qualifying', options).then(() => {
            this.nav.setRoot(RaceControlPage, options);
          });
        }
      });
      modal.present();
    });
  }

  startRace() {
    this.settings.get('race').take(1).subscribe((options) => {
      options.mode = options.mode || 'race';
      let modal = this.modal.create(RaceSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.set('race', options).then(() => {
            this.nav.setRoot(RaceControlPage, options);
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
