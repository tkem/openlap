import { Component } from '@angular/core';

import { PopoverController } from 'ionic-angular';

import { AboutPage } from './about.page';
import { ColorsPage } from './colors.page';
import { LicensesPage } from './licenses.page';
import { LoggingPage } from './logging.page';
import { NotificationsPage } from './notifications.page';
import { OptionsPage } from './options.page';

import { SettingsMenu } from './settings.menu';

@Component({
  templateUrl: 'settings.page.html'
})
export class SettingsPage {
  aboutPage = AboutPage;
  colorsPage = ColorsPage;
  licensesPage = LicensesPage;
  loggingPage = LoggingPage;
  notificationsPage = NotificationsPage;
  optionsPage = OptionsPage;

  constructor(private popover: PopoverController) {}

  showMenu(event) {
    let popover = this.popover.create(SettingsMenu);
    popover.present({ev: event});
  }
}
