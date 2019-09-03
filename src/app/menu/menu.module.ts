import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ConnectionsComponent } from './connections.component';
import { CuVersionPipe } from './cu-version.pipe';
import { MenuComponent } from './menu.component';

import { SharedModule } from '../shared';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ConnectionsComponent,
    CuVersionPipe,
    MenuComponent
  ],
  exports: [
    MenuComponent
  ], 
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    AppRoutingModule
  ]
})
export class MenuModule {}
