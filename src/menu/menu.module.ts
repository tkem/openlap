import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from 'ionic-angular';

import { ConnectionsComponent } from './connections.component';
import { MenuComponent } from './menu.component';

import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    ConnectionsComponent,
    MenuComponent
  ],
  entryComponents: [
  ],
  exports: [
    MenuComponent
  ], 
  imports: [
    CommonModule,
    SharedModule,
    IonicModule
  ],
  providers: [
  ]
})
export class MenuModule {}
