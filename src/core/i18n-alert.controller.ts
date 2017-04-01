import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Alert, AlertController, AlertOptions } from 'ionic-angular';

@Injectable()
export class I18nAlertController {

  constructor(private alert: AlertController, private translate: TranslateService) {}

  create(opts?: AlertOptions): Alert {
    // create returns Alert, so use synchronous translate.instant()
    if (opts) {
      opts = Object.assign({}, opts, {
        title: opts.title ? this.translate.instant(opts.title) : opts.title,
        subTitle: opts.subTitle ? this.translate.instant(opts.subTitle) : opts.subTitle,
        message: opts.message ? this.translate.instant(opts.message) : opts.message,
        buttons: (opts.buttons || []).map(button => {
          if (typeof button === 'string') {
            return this.translate.instant(button);
          } else {
            return Object.assign({}, button, {text: this.translate.instant(button.text)});
          }
        })
      });
    }
    return this.alert.create(opts);
  }
}
