import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';

import { BackendModule } from '../backend';
import { CoreModule } from '../core';
import { LoggingModule } from '../logging';
import { RMSModule } from '../rms';
import { SettingsModule } from '../settings';
import { StorageModule } from '../storage';
import { SharedModule } from '../shared';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    StorageModule.forRoot({ prefix: 'at.co.kemmer.openlap.' }),
    BackendModule,
    CoreModule,
    LoggingModule,
    RMSModule,
    SettingsModule,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent
  ],
})
export class AppModule {}
