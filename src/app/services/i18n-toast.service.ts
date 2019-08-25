import { Injectable } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';

import { Toast as NativeToast } from '@ionic-native/toast';

import { TranslateService } from '@ngx-translate/core';

interface ToastProvider {
  show(message: string, duration: number, position: 'top' | 'bottom' | 'center'): Promise<void>;
}

class NativeToastProvider implements ToastProvider {
  constructor(private platform: Platform) {}

  async show(message: string, duration: number, position: 'top' | 'bottom' | 'center') {
    await this.platform.ready();
    await NativeToast.hide();
    return NativeToast.show(message, duration.toString(), position).toPromise();
  }
}

class IonicToastProvider implements ToastProvider {

  constructor(private controller: ToastController) {}

  async show(message: string, duration: number, position: 'top' | 'bottom' | 'center') {
    const toast = await this.controller.create({
      message: message,
      duration: duration,
      position: position === 'center' ? 'middle' : position
    });
    return toast.present();
  }
}

const SHORT_DURATION = 2000;
const LONG_DURATION = 4000;

@Injectable({
  providedIn: 'root'
})
export class I18nToastService {

  private toast: ToastProvider;

  constructor(platform: Platform, controller: ToastController, private translate: TranslateService) { 
    this.toast = platform.is('cordova') ? new NativeToastProvider(platform) : new IonicToastProvider(controller);
  }

  showShortTop(key: string, params?: Object) {
    return this.show('top', SHORT_DURATION, key, params);
  }

  showShortCenter(key: string, params?: Object) {
    return this.show('center', SHORT_DURATION, key, params);
  }

  showShortBottom(key: string, params?: Object) {
    return this.show('bottom', SHORT_DURATION, key, params);
  }
  
  showLongTop(key: string, params?: Object) {
    return this.show('top', LONG_DURATION, key, params);
  }

  showLongCenter(key: string, params?: Object) {
    return this.show('center', LONG_DURATION, key, params);
  }

  showLongBottom(key: string, params?: Object) {
    return this.show('bottom', LONG_DURATION, key, params);
  }

  private async show(position: 'top' | 'bottom' | 'center', duration: number, key: string, params?: Object) {
    const message = await this.translate.get(key, params).toPromise();
    return this.toast.show(message, duration, position);
  }
}
