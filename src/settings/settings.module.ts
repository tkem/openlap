import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared';

import { AboutPage } from './about.page';
import { ColorsPage } from './colors.page';
import { DriversPage } from './drivers.page';
import { LicensesPage } from './licenses.page';
import { LoggingPage, LoggingPopover } from './logging.page';
import { SettingsPage, SettingsPopover } from './settings.page';
import { SpeechPage } from './speech.page';

@NgModule({
  declarations: [
    SettingsPage,
    SettingsPopover,
    AboutPage,
    ColorsPage,
    DriversPage,
    LicensesPage,
    LoggingPage,
    LoggingPopover,
    SpeechPage
  ],
  entryComponents: [
    SettingsPage,
    SettingsPopover,
    AboutPage,
    ColorsPage,
    DriversPage,
    LicensesPage,
    LoggingPage,
    LoggingPopover,
    SpeechPage
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
