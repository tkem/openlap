import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nAlertService {

  constructor(private alert: AlertController, private translate: TranslateService) {}
  
  async show(opts?: AlertOptions) {
    if (opts) {
      opts = await this.translateAlertOptions(opts);
    }
    const alert = await this.alert.create(opts);
    return await alert.present();
  }

  private async translateAlertOptions(opts: AlertOptions) {
    // TODO: opts.inputs
    const [header, subHeader, message, buttons] = await Promise.all([
      this.translateString(opts.header),
      this.translateString(opts.subHeader),
      this.translateString(opts.message as string),
      Promise.all((opts.buttons || []).map(button => {
        if (typeof button === 'string') {
          return this.translateString(button);
        } else {
          return this.translateString(button.text).then(text => {
            return Object.assign({}, button, {text: text});  
          });
        }
      }))
    ]);
    return Object.assign({}, opts, {
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons
    });
  }

  private translateString(key: string) {
    if (key) {
      return this.translate.get(key).toPromise();
    } else {
      return Promise.resolve(key);
    }
  }
}
