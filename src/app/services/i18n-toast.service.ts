import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

import { firstValueFrom } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

const SHORT_DURATION = 2000;
const LONG_DURATION = 4000;

@Injectable({
  providedIn: 'root'
})
export class I18nToastService {

  constructor(private controller: ToastController, private translate: TranslateService) {
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
    const message = await firstValueFrom(this.translate.get(key, params));
    //console.info(`Showing toast: ${message} (${position}, ${duration}ms)`);
    const toast = await this.controller.create({
      message: message,
      duration: duration,
      position: position === 'center' ? 'middle' : position
    });
    return toast.present();
  }
}
