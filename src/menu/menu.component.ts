import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ModalController, Nav, Platform } from 'ionic-angular';

import { Observable } from 'rxjs';

import { ControlUnit } from '../carrera';
import { I18nAlertController, Logger, Settings } from '../core';
import { RaceSettingsPage, RmsPage } from '../rms';
import { ColorsPage, DriversPage, SettingsPage } from '../settings';
import { TuningPage } from '../tuning';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnChanges {

  @Input() cu: ControlUnit;

  @Input() nav: Nav;

  mode: boolean;

  version: Observable<string>;

  colorsPage = ColorsPage;
  driversPage = DriversPage;
  settingsPage = SettingsPage;
  tuningPage = TuningPage;

  constructor(private alert: I18nAlertController,
    private logger: Logger,
    private settings: Settings,
    private modal: ModalController,
    private platform: Platform)
  {}

  ngOnChanges(changes: SimpleChanges) {
    if ('cu' in changes) {
      this.mode = !!this.cu;
      this.version = this.cu ? this.cu.getVersion() : Observable.of(undefined);
    }
  }

  onMenuClose() {
    this.mode = !!this.cu;
  }

  onMenuToggle() {
    this.mode = !this.mode;
  }

  reconnect() {
    if (this.cu) {
      this.logger.info('Reconnecting to', this.cu.peripheral);
      this.cu.reconnect().then(() => {
        this.version = this.cu.getVersion();
      });
    }
  }

  startPractice() {
    this.nav.setRoot(RmsPage, { mode: 'practice', auto: true, pace: true });
  }

  startQualifying() {
    this.settings.getQualifyingSettings().take(1).subscribe((options) => {
      let modal = this.modal.create(RaceSettingsPage, options);
      modal.onDidDismiss((options) => {
        if (options) {
          this.settings.setQualifyingSettings(options).then(() => {
            this.nav.setRoot(RmsPage, options);
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
            this.nav.setRoot(RmsPage, options);
          });
        }
      });
      modal.present();
    });
  }

  exitApp() {
    const alert = this.alert.create({
        message: 'Exit Open Lap?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'OK',
          handler: () => this.exit()
        }]
      })
      alert.present();
  }

  private exit() {
    this.logger.info('Exiting application');
    if (this.cu) {
      this.cu.disconnect();
    }
    this.platform.exitApp();
    this.logger.info('Exited application');
  }
}
