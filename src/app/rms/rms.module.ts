import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared';

import { LeaderboardModule } from './leaderboard';
import { RaceControlModule } from './race-control';
import { RmsMenu } from './rms.menu';
import { RmsPage } from './rms.page';
import { RaceSettingsComponent } from './race-settings.component';
import { RaceTitleComponent } from './race-title.component';

@NgModule({
  declarations: [
    RmsMenu,
    RmsPage,
    RaceSettingsComponent,
    RaceTitleComponent,
  ],
  exports: [
    RmsPage,
    RaceSettingsComponent,
    RaceTitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LeaderboardModule,
    RaceControlModule,
    SharedModule
  ]
})
export class RmsModule {}
