import { Component, ExceptionHandler, Inject, OnInit, ViewChild } from '@angular/core';

import { ModalController, Nav, NavController, Platform, ToastController } from 'ionic-angular';

import { Insomnia, Splashscreen } from 'ionic-native';

import { ControlUnit } from './carrera';

import { BehaviorSubject, Observable, Subject } from './rxjs';

import { TargetDirective } from './directives';
import { CONTROL_UNIT_SUBJECT, Logger, Speech, Settings } from './providers';
import * as pages from './pages';

@Component({
  directives: [TargetDirective],
  providers: [{ provide: CONTROL_UNIT_SUBJECT, useValue: new BehaviorSubject<ControlUnit>(null)}, Speech],
  templateUrl: 'build/app.html'
})
export class OpenLapApp implements OnInit {
  colorsPage = pages.ColorsPage;
  driversPage = pages.DriversPage;
  carSetupPage = pages.CarSetupPage;
  connectionPage = pages.ConnectionPage;
  settingsPage = pages.SettingsPage;

  @ViewChild(Nav) nav: Nav;

  constructor(@Inject(CONTROL_UNIT_SUBJECT) private cus: Subject<ControlUnit>,
              private logger: Logger, private settings: Settings,
              private modal: ModalController, private platform: Platform, private toast: ToastController)
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
    this.cus.filter((cu) => !!cu).subscribe((cu) => {
      cu.getState().debounceTime(100).distinctUntilChanged().subscribe(state => {
        switch (state) {
        case 'connected':
          this.presentToast('Connected to ' + cu.peripheral.name, 1000);
          break;
        case 'connecting':
          this.presentToast('Connecting to ' + cu.peripheral.name, 1000);
          break;
        case 'disconnected':
          this.presentToast('CU disconnected', 1000);
          break;
        }
      });
      this.startPractice();
    });
  }

  ngOnDestroy() {
    this.logger.info('Destroying application');
  }

  presentToast(message: string, duration: number) {
    this.toast.create({
      message: message, duration: duration, showCloseButton: true
    }).present();
  }

  startPractice() {
    this.nav.setRoot(pages.RaceControlPage, { mode: 'practice', auto: true, pace: true });
  }

  startQualifying() {
    this.settings.get('qualifying').take(1).subscribe((options) => {
      let modal = this.modal.create(pages.QualifyingSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.set('qualifying', options).then(() => {
            options.mode = 'qualifying';  // FIXME
            this.nav.setRoot(pages.RaceControlPage, options);
          });
        }
      });
      modal.present();
    });
  }

  startRace() {
    this.settings.get('race').take(1).subscribe((options) => {
      let modal = this.modal.create(pages.RaceSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.set('race', options).then(() => {
            options.mode = 'race';  // FIXME
            this.nav.setRoot(pages.RaceControlPage, options);
          });
        }
      });
      modal.present();
    });
  }

  exitApp() {
    //this.cu.disconnect();
    this.logger.info('Exiting application');
    this.platform.exitApp();
    this.logger.info('Exited application');
  }
}

import './main.ts';
