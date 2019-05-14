import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { ModalController, Nav, Platform } from 'ionic-angular';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ControlUnit } from '../carrera';
import { I18nAlertController, Logger, RaceOptions, Settings } from '../core';
import { RaceSettingsPage, RmsPage } from '../rms';
import { ColorsPage, DriversPage, SettingsPage } from '../settings';
import { TuningPage } from '../tuning';

import { ConnectionsComponent } from './connections.component';

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

  initialized = false;

  @ViewChild(ConnectionsComponent) connections : ConnectionsComponent;

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

  onMenuOpen() {
    // Web Bluetooth workaround - needs user gesture for scanning
    if (!this.initialized && this.connections) {
      if ((<any>navigator).bluetooth) {
        this.connections.ngOnInit();
      }
      this.initialized = true;
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
    this.nav.setRoot(RmsPage, new RaceOptions('practice'));
  }

  startQualifying() {
    this.settings.getQualifyingSettings().pipe(take(1)).subscribe((options) => {
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
    this.settings.getRaceSettings().pipe(take(1)).subscribe((options) => {
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
