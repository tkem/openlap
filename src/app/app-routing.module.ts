import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RmsPage } from './rms';
import { SettingsPage, ColorsPage, DriversPage, AboutPage, LoggingPage , LicensesPage, ConnectionPage, NotificationsPage } from './settings';
import { TuningPage } from './tuning';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rms/practice',
    pathMatch: 'full'
  },
  {
    path: 'rms/:mode',
    component: RmsPage
  },
  {
    path: 'settings',
    component: SettingsPage
  },
  {
    path: 'colors',
    component: ColorsPage
  },
  {
    path: 'drivers',
    component: DriversPage
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
    path: 'tuning',
    component: TuningPage
  },
  { 
    path: '**', 
    component: RmsPage 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules 
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
