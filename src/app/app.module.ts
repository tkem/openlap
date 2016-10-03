import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';

import { BackendModule } from '../backend';
import { CoreModule } from '../core';
import { LoggingModule } from '../logging';
import { RMSModule } from '../rms';
import { SettingsModule } from '../settings';
import { SharedModule } from '../shared';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
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
