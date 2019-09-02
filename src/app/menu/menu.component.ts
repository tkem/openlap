import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { ModalController, NavController } from '@ionic/angular';

import { take } from 'rxjs/operators';

import { AppSettings } from '../app-settings';
import { ControlUnit } from '../carrera';
import { RaceSettingsPage } from '../rms';
import { AppService, I18nAlertService, LoggingService } from '../services';
import { ColorsPage, DriversPage } from '../drivers';
import { SettingsPage } from '../settings';
import { TuningPage } from '../tuning';

import { ConnectionsComponent } from './connections.component';

@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnChanges {

  @Input() cu: ControlUnit;

  mode: boolean;

  version: Promise<string>;

  exitApp: () => void = null;

  colorsPage = ColorsPage;
  driversPage = DriversPage;
  settingsPage = SettingsPage;
  tuningPage = TuningPage;

  initialized = false;

  @ViewChild(ConnectionsComponent, { static: false }) connections : ConnectionsComponent;

  constructor(
    private app: AppService,
    private logger: LoggingService,
    private settings: AppSettings,
    private alert: I18nAlertService,
    private modal: ModalController,
    private nav: NavController)
  {
    if (app.exit) {
      this.exitApp = () => this.onExitApp();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('cu' in changes) {
      this.mode = !!this.cu;
      this.version = this.cu ? this.cu.getVersion() : Promise.resolve(undefined);
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
    return this.nav.navigateRoot('rms/practice');
  }

  startQualifying() {
    this.settings.getQualifyingSettings().pipe(take(1)).subscribe((options) => {
      return this.modal.create({
        component: RaceSettingsPage, 
        componentProps: options
      }).then(modal => {
        modal.onDidDismiss().then(detail => {
          if (detail.data) {
            this.settings.setQualifyingSettings(detail.data).then(() => {
              this.nav.navigateRoot('rms/qualifying');
            });
          }
        });
        modal.present();
      });
    });
  }

  startRace() {
    this.settings.getRaceSettings().pipe(take(1)).subscribe((options) => {
      return this.modal.create({
        component: RaceSettingsPage,
        componentProps: options
      }).then(modal => {
        modal.onDidDismiss().then(detail => {
          if (detail.data) {
            this.settings.setRaceSettings(detail.data).then(() => {
              this.nav.navigateRoot('rms/race');
            });
          }
        });
        modal.present();
      });
    });
  }

  onExitApp() {
    this.alert.show({
      message: 'Exit Open Lap?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'OK',
        handler: () => this.exit()
      }]
    });
  }

  private exit() {
    this.logger.info('Exiting application');
    if (this.cu) {
      this.cu.disconnect().catch(error => {
        this.logger.error('Error disconnecting from CU:', error);
      }).then(() => {
        this.app.exit();
      });
    } else {
      this.app.exit();
    }
    this.logger.info('Exited application');
  }
}
