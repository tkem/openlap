import { Component, OnDestroy, OnInit } from '@angular/core';

import { AboutPage } from './about.page';
import { ColorsPage } from './colors.page';
import { LicensesPage } from './licenses.page';
import { LoggingPage } from './logging.page';
import { NotificationsPage } from './notifications.page';

import { I18nAlertController, Options, Settings } from '../core';

@Component({
  templateUrl: 'settings.page.html'
})
export class SettingsPage implements OnDestroy, OnInit {
  aboutPage = AboutPage;
  colorsPage = ColorsPage;
  licensesPage = LicensesPage;
  loggingPage = LoggingPage;
  notificationsPage = NotificationsPage;

  options = new Options();

  private subscription: any;

  constructor(private alert: I18nAlertController, private settings: Settings) {}

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe(options => {
      this.options = options;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reset() {
    const alert = this.alert.create({
      message: 'Reset all user settings to default values?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'OK',
        handler: () => this.settings.clear()
      }]
    })
    alert.present();
  }

  update() {
    this.settings.setOptions(this.options);
  }
}
