import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RmsPage } from './rms';
import { DriversPage } from './drivers';
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
    path: 'drivers',
    component: DriversPage
  },
  {
    path: 'tuning',
    component: TuningPage
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  { 
    path: '**', 
    component: RmsPage 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
