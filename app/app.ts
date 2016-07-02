import { provide, Component, ExceptionHandler, Injectable, OnInit, ViewChild } from '@angular/core';

import { ionicBootstrap, Modal, Nav, Platform } from 'ionic-angular';

import { ControlUnit, Logger, RaceControl, Plugins, Storage } from './providers';

import { BACKENDS } from './backends';

import * as pages from './pages';

const DEFAULT_DRIVERS = [
  { name: 'Driver #1', code: '#1', color: '#ff0000' },
  { name: 'Driver #2', code: '#2', color: '#0000ff' },
  { name: 'Driver #3', code: '#3', color: '#ffff00' },
  { name: 'Driver #4', code: '#4', color: '#00ff00' },
  { name: 'Driver #5', code: '#5', color: '#808080' },
  { name: 'Driver #6', code: '#6', color: '#000000' },
  { name: 'Autonomous Car', code: 'AUT', color: '#870275' },
  { name: 'Pace Car', code: 'PAC', color: '#00fbff' }
];

@Component({
  providers: [ControlUnit, Plugins, RaceControl, BACKENDS],
  templateUrl: 'build/app.html'
})
class OpenLapApp implements OnInit {
  driversPage = pages.DriversPage;
  carSetupPage = pages.CarSetupPage;
  connectionPage = pages.ConnectionPage;
  settingsPage = pages.SettingsPage;
  
  private settings = [];  // TODO: store with CU?

  @ViewChild(Nav) nav: Nav;

  constructor(private cu: ControlUnit, private rc: RaceControl,
    private logger: Logger, private plugins: Plugins, private storage: Storage,
    private platform: Platform)
  {
    storage.get('logging', {level: 'info'}).then(logging => {
      logger.setLevel(logging.level || 'info');
    });
    storage.get('drivers', DEFAULT_DRIVERS).then(drivers => {
      rc.drivers = drivers;
    })

    // TODO: initial values, mark as touched, etc.
    for (let i = 0; i != 6; ++i) {
      this.settings.push({ id: i, speed: 8, brake: 8, fuel: 8 });
    }

    this.plugins.get('insomnia').then(insomnia => {
      return new Promise((resolve, reject) => {
        insomnia.keepAwake(resolve, reject);
      });
    }).then(() => {
      this.logger.info('Keeping app awake...');
    }).catch(error => {
      this.logger.error('Not using insomnia plugin', error);
    });
  }

  startPractice() {
    this.rc.start('practice', { auto: true, pace: true });
  }

  startQualifying() {
    let modal = Modal.create(pages.QualifyingPage);
    this.nav.present(modal);
  }

  startRace() {
    let modal = Modal.create(pages.RacePage);
    this.nav.present(modal);
  }

  exitApp() {
    this.cu.disconnect();
    this.logger.info('Exiting application');
    this.platform.exitApp();
    this.logger.info('Exited application');
  }

  ngOnInit() {
    this.logger.info('Initializing application');
  }

  ngOnDestroy() {
    this.logger.info('Destroying application');
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
], { 
  prodMode: !!window['cordova'] 
});
