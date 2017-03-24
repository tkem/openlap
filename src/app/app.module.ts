import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { IonicApp, IonicModule } from 'ionic-angular';

import { AppVersion } from '@ionic-native/app-version';
import { BLE } from '@ionic-native/ble';
import { Device } from '@ionic-native/device';
import { Insomnia } from '@ionic-native/insomnia';
import { Serial } from '@ionic-native/serial';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Toast } from '@ionic-native/toast';

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
  providers: [
    AppVersion,
    BLE,
    Device,
    Insomnia,
    Serial,
    SocialSharing,
    SplashScreen,
    StatusBar,
    TextToSpeech,
    Toast
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    RootPage
  ],
})
export class AppModule {}
