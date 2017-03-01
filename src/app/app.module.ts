import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { IonicApp, IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { BackendModule } from '../backend';
import { CoreModule } from '../core';
import { LoggingModule } from '../logging';
import { MenuModule } from '../menu';
import { RMSModule } from '../rms';
import { SettingsModule } from '../settings';
import { SharedModule } from '../shared';

import { AppComponent, RootPage } from './app.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RootPage
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    BackendModule,
    CoreModule,
    LoggingModule,
    MenuModule,
    RMSModule,
    SettingsModule,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    RootPage
  ],
})
export class AppModule {}
