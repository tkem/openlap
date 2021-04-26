import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { Insomnia } from '@ionic-native/insomnia';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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
  
  constructor(private platform: Platform) {
    this.backButton = platform.backButton;

    // TODO: check if necessary...
    platform.ready().then(readySource => {
      if (readySource === 'cordova') {
        StatusBar.styleDefault();
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
      return AppVersion.getAppName();
    } else {
      return "App";  // FIXME - generic?
    }
  }

  async getVersion() {
    if (this.isCordova() && AppVersion) {
      await this.platform.ready();
      return AppVersion.getVersionNumber();
    } else {
      return "Web";
    }
  }

  async getDeviceInfo() {
    if (this.isCordova() && Device) {
      await this.platform.ready();
      return {
        isVirtual: Device.isVirtual,
        manufacturer: Device.manufacturer,
        model: Device.model,
        platform: Device.platform,
        version: Device.version,
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
        AndroidFullScreen.immersiveMode();
      } else {
        AndroidFullScreen.showSystemUI();
      }
    }
  }

  async hideSplashScreen() {
    if (this.isCordova() && SplashScreen) {
      await this.platform.ready();
      SplashScreen.hide();
    }
  }

  async keepAwake(value: boolean) {
    if (this.isCordova() && Insomnia) {
      await this.platform.ready();
      if (value) {
        Insomnia.keepAwake();
      } else {
        Insomnia.allowSleepAgain();
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
      return SocialSharing.shareWithOptions({
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
