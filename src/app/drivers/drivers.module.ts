import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared';

import { ColorComponent } from './color.component';
import { DriversPage } from './drivers.page';

@NgModule({
  declarations: [
    ColorComponent,
    DriversPage
  ],
  exports: [
    ColorComponent,
    DriversPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule
  ]
})
export class DriversModule {}
