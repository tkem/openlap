import { Component, Inject, Input } from '@angular/core';

import { ModalController, Nav, Platform } from 'ionic-angular';

import { BehaviorSubject, Observable } from '../rxjs';

import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_SUBJECT, Settings } from '../core';
import { Logger } from '../logging';
import { CarSetupPage, RaceSettingsPage, RaceControlPage } from '../rms';
import { ColorsPage, DriversPage, SettingsPage } from '../settings';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html'
})
export class MenuComponent {

  @Input() nav: Nav;

  colorsPage = ColorsPage;
  driversPage = DriversPage;
  setupPage = CarSetupPage;
  settingsPage = SettingsPage;

  mode = true;

  version: Observable<string>;

  constructor(@Inject(CONTROL_UNIT_SUBJECT) public cu: BehaviorSubject<ControlUnit>,
              private logger: Logger, 
              private settings: Settings,
              private modal: ModalController,
              private platform: Platform)
  {
    this.version = cu.switchMap(cu => cu.getVersion().startWith(null));
  }

  onMenuClose() {
    this.mode = true;
  }

  reconnect() {
    this.cu.value.disconnect();
    setTimeout(() => this.cu.value.connect(), 1000);
  }

  startPractice() {
    this.nav.setRoot(RaceControlPage, { mode: 'practice', auto: true, pace: true });
  }

  startQualifying() {
    this.settings.getQualifyingSettings().take(1).subscribe((options) => {
      let modal = this.modal.create(RaceSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.setQualifyingSettings(options).then(() => {
            this.nav.setRoot(RaceControlPage, options);
          });
        }
      });
      modal.present();
    });
  }

  startRace() {
    this.settings.getRaceSettings().take(1).subscribe((options) => {
      let modal = this.modal.create(RaceSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.setRaceSettings(options).then(() => {
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
