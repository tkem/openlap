import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RaceControlComponent } from './race-control.component';
import { StartlightComponent } from './startlight.component';
import { YellowFlagComponent } from './yellow-flag.component';

@NgModule({
  declarations: [
    RaceControlComponent,
    StartlightComponent,
    YellowFlagComponent
  ],
  exports: [
    RaceControlComponent
  ], 
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class RaceControlModule {}
