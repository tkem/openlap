import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { I18nAlertController, Settings } from '../core';
import { Logger } from '../logging';

@Component({
  templateUrl: 'settings.menu.html'
})
export class SettingsMenu {

  constructor(private logger: Logger,
    private settings: Settings,
    private alert: I18nAlertController,
    private view: ViewController,
    private translate: TranslateService)
  {}

  reset() {
    this.close().then(() => {
      const alert = this.alert.create({
        title: 'Reset settings',
        message: 'Reset all user settings to default values?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'OK',
          handler: () => this.settings.clear()
        }]
      })
      alert.present();
    });
  }

  close() {
    return this.view.dismiss();
  }
}
