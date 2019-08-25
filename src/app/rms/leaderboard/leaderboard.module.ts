import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';

import { GaugeComponent } from './gauge.component';
import { LeaderboardComponent } from './leaderboard.component';
import { LeaderboardHeadComponent } from './leaderboard-head.component';
import { LeaderboardItemComponent } from './leaderboard-item.component';
import { StripeComponent } from './stripe.component';

@NgModule({
  declarations: [
    GaugeComponent,
    LeaderboardComponent,
    LeaderboardHeadComponent,
    LeaderboardItemComponent,
    StripeComponent
  ],
  exports: [
    LeaderboardComponent
  ], 
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LeaderboardModule {}
