// FIXME: also import zone-patch-rxjs?
import 'zone.js/dist/zone-patch-cordova';

import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';

import { Serial } from './backend/serial/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BackendModule } from './backend';
import { DriversModule } from './drivers';
import { MenuModule } from './menu';
import { RmsModule } from './rms';
import { SharedModule } from './shared';
import { TuningModule } from './tuning';

import { LoggingService } from './services';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

@Injectable()
export class LoggingErrorHandler implements ErrorHandler {

  constructor(private logger: LoggingService) {}

  handleError(error: any) {
    this.logger.error('Error:', error);
  }
}

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function swRegistrationOptions(platform: Platform) {
  return {
    enabled: !platform.is('cordova') && environment.production,
    registrationStrategy: 'registerImmediately'
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(/* TODO: config */),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BackendModule,
    DriversModule,
    MenuModule,
    RmsModule,
    SharedModule,
    TuningModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js')
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
    TextToSpeechAdvanced,
    Toast,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: LoggingErrorHandler },
    {
      provide: SwRegistrationOptions,
      useFactory: swRegistrationOptions,
      deps: [Platform]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
