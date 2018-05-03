import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared';

import { AboutPage } from './about.page';
import { ColorsPage } from './colors.page';
import { ConnectionPage } from './connection.page';
import { DriversPage } from './drivers.page';
import { LicensesPage } from './licenses.page';
import { LoggingMenu } from './logging.menu';
import { LoggingPage } from './logging.page';
import { NotificationsPage } from './notifications.page';
import { SettingsPage } from './settings.page';

@NgModule({
  declarations: [
    AboutPage,
    ColorsPage,
    ConnectionPage,
    DriversPage,
    LicensesPage,
    LoggingMenu,
    LoggingPage,
    NotificationsPage,
    SettingsPage
  ],
  entryComponents: [
    AboutPage,
    ColorsPage,
    ConnectionPage,
    DriversPage,
    LicensesPage,
    LoggingMenu,
    LoggingPage,
    NotificationsPage,
    SettingsPage
  ],
  exports: [
    ColorsPage,
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
