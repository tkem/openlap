import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared';

import { AboutPage } from './about.page';
import { ConnectionPage } from './connection.page';
import { LicensesPage } from './licenses.page';
import { LoggingMenu } from './logging.menu';
import { LoggingPage } from './logging.page';
import { NotificationsPage } from './notifications.page';
import { SettingsPage } from './settings.page';
import { VoicePage } from './voice.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'logging',
    component: LoggingPage
  },
  {
    path: 'licenses',
    component: LicensesPage
  },
  {
    path: 'connection',
    component: ConnectionPage
  },
  {
    path: 'notifications',
    component: NotificationsPage
  },
  {
    path: 'voice',
    component: VoicePage
  }
];

@NgModule({
  declarations: [
    AboutPage,
    ConnectionPage,
    LicensesPage,
    LoggingMenu,
    LoggingPage,
    NotificationsPage,
    VoicePage,
    SettingsPage
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SettingsModule {}
