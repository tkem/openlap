import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { IonicApp, IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BackendModule } from '../backend';
import { CoreModule } from '../core';
import { LoggingModule } from '../logging';
import { MenuModule } from '../menu';
import { RMSModule } from '../rms';
import { SettingsModule } from '../settings';
import { SharedModule } from '../shared';

import { AppComponent } from './app.component';
import { RootPage } from './root.page';

// AoT requires an exported function for factories
export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
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
