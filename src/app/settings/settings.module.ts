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
    SettingsPage
  ],
  entryComponents: [
    AboutPage,
    ConnectionPage,
    LicensesPage,
    LoggingMenu,
    LoggingPage,
    NotificationsPage,
    SettingsPage
  ],
  exports: [
    AboutPage,
    ConnectionPage,
    LicensesPage,
    LoggingPage,
    NotificationsPage,
    RouterModule,
    SettingsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
  ]
})
export class SettingsModule {}
