import { Component } from '@angular/core';

import { AlertController, PopoverController, ViewController } from 'ionic-angular';

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
      <button ion-item (click)="reset()">Reset</button>
    </ion-item-group>
  `
})
export class SettingsPopover {

  constructor(private logger: Logger, private settings: Settings, private alert: AlertController, private view: ViewController) {}

  reset() {
    const alert = this.alert.create({
      title: 'Reset settings',
      message: 'Reset all user settings to default values?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'OK',
        handler: () => {
          // TODO: Only "settings" settings, i.e. no drivers, colors, etc.
          this.settings.clear();
        }
      }]
    })
    this.close().then(() => {
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
