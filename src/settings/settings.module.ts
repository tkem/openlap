import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared';

import { AboutPage } from './about.page';
import { ColorsPage } from './colors.page';
import { DriversPage } from './drivers.page';
import { LicensesPage } from './licenses.page';
import { LoggingMenu } from './logging.menu';
import { LoggingPage } from './logging.page';
import { NotificationsPage } from './notifications.page';
import { OptionsPage } from './options.page';
import { SettingsMenu } from './settings.menu';
import { SettingsPage } from './settings.page';

@NgModule({
  declarations: [
    SettingsMenu,
    SettingsPage,
    AboutPage,
    ColorsPage,
    DriversPage,
    LicensesPage,
    LoggingMenu,
    LoggingPage,
    NotificationsPage,
    OptionsPage
  ],
  entryComponents: [
    SettingsMenu,
    SettingsPage,
    AboutPage,
    ColorsPage,
    DriversPage,
    LicensesPage,
    LoggingMenu,
    LoggingPage,
    NotificationsPage,
    OptionsPage,
  ],
  exports: [
    DriversPage,
    SettingsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule
  ],
  providers: [
  ]
})
export class SettingsModule {}
