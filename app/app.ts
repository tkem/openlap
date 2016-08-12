import { provide, Component, ExceptionHandler, Injectable, OnInit, ViewChild } from '@angular/core';

import { ionicBootstrap, ModalController, Nav, NavController, Platform } from 'ionic-angular';

import { Insomnia, Splashscreen } from 'ionic-native';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { Backend, BLEBackend, SerialBackend, DemoBackend } from './backends';
import { TargetDirective } from './directives';
import { ControlUnit, Logger, RaceControl, Speech, Settings, Storage } from './providers';
import * as pages from './pages';

@Component({
  directives: [TargetDirective],
  providers: [ControlUnit, RaceControl, Speech],
  templateUrl: 'build/app.html'
})
class OpenLapApp implements OnInit {
  colorsPage = pages.ColorsPage;
  driversPage = pages.DriversPage;
  carSetupPage = pages.CarSetupPage;
  connectionPage = pages.ConnectionPage;
  settingsPage = pages.SettingsPage;
  
  private carSettings = [];  // TODO: store with CU?

  @ViewChild(Nav) nav: Nav;

  constructor(private cu: ControlUnit, private rc: RaceControl,
              private logger: Logger, private settings: Settings,
              private modal: ModalController, private platform: Platform)
  {
    settings.get('logging', { level: 'info' }).subscribe((logging) => {
      logger.setLevel(logging.level);
    });

    // TODO: initial values, mark as touched, etc.
    for (let i = 0; i != 6; ++i) {
      this.carSettings.push({ id: i, speed: 8, brake: 8, fuel: 8 });
    }
  }

  ngOnInit() {
    this.platform.ready().then(readySource => {
      this.logger.info('Initializing ' + readySource + ' application');
      this.nav.setRoot(pages.ConnectionPage).then(() => {
        Splashscreen.hide();
      });
      Insomnia.keepAwake();
    });
  }

  ngOnDestroy() {
    this.logger.info('Destroying application');
  }

  startPractice() {
    this.rc.start('practice', { auto: true, pace: true });
  }

  startQualifying() {
    this.settings.get('qualifying').take(1).subscribe((options) => {
      let modal = this.modal.create(pages.QualifyingPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.set('qualifying', options).then(() => {
            this.rc.start('qualifying', options);
          });
        }
      });
      modal.present();
    });
  }

  startRace() {
    this.settings.get('race').take(1).subscribe((options) => {
      let modal = this.modal.create(pages.RacePage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.set('race', options).then(() => {
            this.rc.start('race', options);
          });
        }
      });
      modal.present();
    });
  }

  exitApp() {
    this.cu.disconnect();
    this.logger.info('Exiting application');
    this.platform.exitApp();
    this.logger.info('Exited application');
  }
}

@Injectable()
class LoggingExceptionHandler extends ExceptionHandler {
  constructor(private logger: Logger) {
    super(null);
  }

  call(error, stackTrace = null, reason = null) {
    this.logger.error(ExceptionHandler.exceptionToString(error, stackTrace, reason));
  }
}

ionicBootstrap(OpenLapApp, [
  Logger,
  provide(ExceptionHandler, { useClass: LoggingExceptionHandler }),
  provide(Storage, { useFactory: () => new Storage('at.co.kemmer.openlap') }),
  Settings,
  provide(Backend, { useClass: DemoBackend, multi: true }),
  provide(Backend, { useClass: SerialBackend, multi: true }),
  provide(Backend, { useClass: BLEBackend, multi: true })
], { 
  prodMode: !!window['cordova'] 
});
