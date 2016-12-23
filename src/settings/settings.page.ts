import { Component } from '@angular/core';

import { AlertController, PopoverController, ViewController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';

import { Settings } from '../core';
import { Logger } from '../logging';

import { AboutPage } from './about.page';
import { ColorsPage } from './colors.page';
import { LicensesPage } from './licenses.page';
import { LoggingPage } from './logging.page';
import { MessagesPage } from './messages.page';
import { OptionsPage } from './options.page';

@Component({
  template: `
    <ion-item-group>
      <button ion-item (click)="reset()">
        <span translate>Reset</span>&hellip;
      </button>
    </ion-item-group>
  `
})
export class SettingsPopover {

  constructor(private logger: Logger, 
    private settings: Settings, 
    private alert: AlertController, 
    private view: ViewController, 
    private translate: TranslateService)
  {}

  reset() {
    this.close().then(() => {
      return Promise.all([
        this.translate.get('Reset settings').toPromise(),
        this.translate.get('Reset all user settings to default values?').toPromise(),
        this.translate.get('OK').toPromise(),
        this.translate.get('Cancel').toPromise(),
      ]);
    }).then(([title, message, okText, cancelText]) => {
      const alert = this.alert.create({
        // TODO: translate
        title: title,
        message: message,
        buttons: [{
          text: cancelText,
          role: 'cancel',
        }, {
          text: okText,
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

@Component({
  templateUrl: 'settings.page.html'
})
export class SettingsPage {
  aboutPage = AboutPage;
  colorsPage = ColorsPage;
  licensesPage = LicensesPage;
  loggingPage = LoggingPage;
  messagesPage = MessagesPage;
  optionsPage = OptionsPage;
  
  constructor(private popover: PopoverController) {}

    presentPopover(event) {
      let popover = this.popover.create(SettingsPopover);
      popover.present({ev: event});
    }
}
