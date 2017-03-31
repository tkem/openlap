import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';

import { LeaderboardModule } from '../leaderboard';
import { SharedModule } from '../shared';

import { TuningPage } from './tuning.page';
import { RaceControlMenu } from './race-control.menu';
import { RaceControlPage } from './race-control.page';
import { RaceSettingsPage } from './race-settings.page';

@NgModule({
  declarations: [
    TuningPage,
    RaceControlPage,
    RaceControlMenu,
    RaceSettingsPage
  ],
  entryComponents: [
    TuningPage,
    RaceControlPage,
    RaceControlMenu,
    RaceSettingsPage
  ],
  exports: [
    TuningPage,
    RaceControlPage,
    RaceSettingsPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LeaderboardModule,
    SharedModule
  ],
  providers: [
  ]
})
export class RMSModule {}
