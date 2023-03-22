import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

export enum Orientation {
  Portrait = "portrait",
  Landscape = "landscape"
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  static PORTRAIT = Orientation.Portrait;
  static LANDSCAPE = Orientation.Landscape;

  backButton: Observable<any>;

  orientation: Observable<Orientation>;

  exit: () => void = undefined;

  share: (subject: string, message: string) => Promise<void> = undefined;
  
  constructor(private platform: Platform, private app: AppVersion, private device: Device, 
    private fullscreen: AndroidFullScreen, private insomnia: Insomnia, private sharing: SocialSharing,
    private splash: SplashScreen, status: StatusBar) 
  {
    this.backButton = platform.backButton;

    // TODO: check if necessary...
    platform.ready().then(readySource => {
      if (readySource === 'cordova') {
        status.styleDefault();
      }
    });

    if (this.isCordova() && this.isAndroid()) {
      this.exit = () => this.doExit();
    }

    if (this.isCordova() && SocialSharing) {
      this.share = (subject: string, message: string) => this.doShare(subject, message);
    }

    this.orientation = platform.resize.pipe(
      startWith(undefined),
      map(() => platform.isPortrait() ? Orientation.Portrait : Orientation.Landscape),
      distinctUntilChanged()
    );
  }

  async getName() {
    if (this.isCordova() && AppVersion) {
      await this.platform.ready();
      return this.app.getAppName();
    } else {
      return "App";  // FIXME - generic?
    }
  }

  async getVersion() {
    if (this.isCordova() && AppVersion) {
      await this.platform.ready();
      return this.app.getVersionNumber();
    } else {
      return "Web";
    }
  }

  async getDeviceInfo() {
    if (this.isCordova() && Device) {
      await this.platform.ready();
      return {
        isVirtual: this.device.isVirtual,
        manufacturer: this.device.manufacturer,
        model: this.device.model,
        platform: this.device.platform,
        version: this.device.version,
      };
    } else {
      return {
        // TODO: extract info from navigator.userAgent
        isVirtual: false,
        manufacturer: '',
        model: '',
        platform: 'browser',
        version: ''
      };
    }
  }

  async enableFullScreen(value: boolean) {
    if (this.isCordova() && this.isAndroid() && AndroidFullScreen) {
      await this.platform.ready();
      if (value) {
        this.fullscreen.immersiveMode();
      } else {
        this.fullscreen.showSystemUI();
      }
    }
  }

  async hideSplashScreen() {
    if (this.isCordova() && this.splash) {
      await this.platform.ready();
      this.splash.hide();
    }
  }

  async keepAwake(value: boolean) {
    if (this.isCordova() && Insomnia) {
      await this.platform.ready();
      if (value) {
        this.insomnia.keepAwake();
      } else {
        this.insomnia.allowSleepAgain();
      }
    }
  }
  
  isAndroid() {
    return this.platform.is('android');
  }

  isCordova() {
    return this.platform.is('cordova');
  }

  private async doShare(subject: string, message: string) {
    await this.platform.ready();
    if (SocialSharing) {
      return this.sharing.shareWithOptions({
        message: message,
        subject: subject
      });
    }
  }

  private async doExit() {
    await this.platform.ready();
    if (navigator['app'] && navigator['app'].exitApp) {
      navigator['app'].exitApp();
    }
  }
}
