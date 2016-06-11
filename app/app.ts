import { provide, Component, ExceptionHandler, Injectable, ViewChild } from '@angular/core';

import { ionicBootstrap, App, Modal, Nav, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

import { RootPage, QualifyingPage, RacePage, SettingsPage, ConnectionPage, ColorsPage, DriversPage, LoggingPage } from './pages';
import { ControlUnit, Logger, RaceControl, Plugins, Storage } from './providers';

const DEFAULT_DRIVERS = [
  { name: 'Driver #1', shortName: '#1' },
  { name: 'Driver #2', shortName: '#2' },
  { name: 'Driver #3', shortName: '#3' },
  { name: 'Driver #4', shortName: '#4' },
  { name: 'Driver #5', shortName: '#5' },
  { name: 'Driver #6', shortName: '#6' },
  { name: 'Autonomous Car', shortName: 'AUT' },
  { name: 'Pace Car', shortName: 'PAC' }
];

const DEFAULT_COLORS = [
  'blue',
  'red',
  'yellow',
  'green',
  'gray',
  'black',
  'silver',
  'gold'
];

@Component({
  providers: [ControlUnit, RaceControl, Plugins],
  templateUrl: 'build/app.html'
})
class OpenLapApp {
  rootPage: any = RootPage;

  private settings = [];

  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform, private cu: ControlUnit,
    private logger: Logger, private raceControl: RaceControl, private plugins: Plugins,
    private storage: Storage) {
    storage.get('drivers', DEFAULT_DRIVERS).then(drivers => {
      raceControl.drivers = drivers;
    })
    storage.get('colors', DEFAULT_COLORS).then(colors => {
      raceControl.colors = colors;
    })

    // TODO: initial values, mark as touched
    for (let i = 0; i != 6; ++i) {
      this.settings.push({ id: i, speed: 8, brake: 8, fuel: 8 });
    }

    platform.ready().then(() => {
      // FIXME: overlay on race screen on first open/cu disconnected
      setTimeout(() => this.openConnection());
    });

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
    this.raceControl.start('practice', {auto: true, pace: true});
  }
  
  startQualifying() {
    this.storage.get('qualifying', {time: 3, auto: false}).then(settings => {
      this.logger.debug('Qualifying settings:', settings);
      let modal = Modal.create(QualifyingPage, settings);
      modal.onDismiss(newSettings => {
        if (newSettings) {
          this.raceControl.start('qualifying', newSettings);
          this.storage.set('qualifying', newSettings);
        }
      });
      this.nav.present(modal);
    });
  }

  startRace() {
    this.storage.get('race', {laps: 10, auto: true}).then(settings => {
      this.logger.debug('Race settings:', settings);
      let modal = Modal.create(RacePage, settings);
      modal.onDismiss(newSettings => {
        if (newSettings) {
          this.raceControl.start('race', newSettings);
          this.storage.set('race', newSettings);
        }
      });
      this.nav.present(modal);
    });
  }

  openConnection() {
    let modal = Modal.create(ConnectionPage);
    this.nav.present(modal);
  }

  openDrivers() {
      this.storage.get('drivers', DEFAULT_DRIVERS).then(drivers => {
          this.logger.debug('Drivers:', drivers);
          let modal = Modal.create(DriversPage, drivers);
          modal.onDismiss(newDrivers => {
              if (newDrivers) {
                  this.raceControl.drivers = newDrivers;
                  this.storage.set('drivers', newDrivers);
              }
          });
          this.nav.present(modal);
      });
  }

  openColors() {
      this.storage.get('colors', DEFAULT_COLORS).then(colors => {
          this.logger.debug('Colors:', colors);
          let modal = Modal.create(ColorsPage, colors);
          modal.onDismiss(newColors => {
              if (newColors) {
                  this.raceControl.colors = newColors;
                  this.storage.set('colors', newColors);
              }
          });
          this.nav.present(modal);
      });
  }

  openSettings() {
    let modal = Modal.create(SettingsPage, this.settings);
    this.nav.present(modal);
  }

  openLogging() {
    let modal = Modal.create(LoggingPage);
    this.nav.present(modal);
  }

  exit() {
    // TODO: close connection, *really* exit
    this.platform.exitApp();
  }

  ionViewLoaded() {
    // FIXME: overlay on race screen on first open
    //let modal = Modal.create(ConnectionPage);
    //modal.onDismiss(settings => {});
    //setTimeout(() => this.nav.present(modal));
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
  provide(Storage, { useFactory: () => new Storage('at.co.kemmer.openlap') })
]);
