import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule } from 'ionic-angular';

import { AndroidFullScreen } from '@ionic-native/android-full-screen';
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
import { MenuModule } from '../menu';
import { RmsModule } from '../rms';
import { SettingsModule } from '../settings';
import { SharedModule } from '../shared';
import { TuningModule } from '../tuning';

import { AppComponent } from './app.component';
import { RootPage } from './root.page';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RootPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot(/* TODO: config */),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BackendModule,
    CoreModule,
    MenuModule,
    RmsModule,
    SettingsModule,
    SharedModule,
    TuningModule
  ],
  providers: [
    AndroidFullScreen,
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
