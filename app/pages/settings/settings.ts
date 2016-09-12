import { Component } from '@angular/core';

import { AlertController, PopoverController, ViewController } from 'ionic-angular';

import { Logger, Settings } from '../../providers';

import { AboutPage } from './about/about';
import { ColorsPage } from './colors/colors';
import { LicensesPage } from './licenses/licenses';
import { LoggingPage } from './logging/logging';
import { SpeechPage } from './speech/speech';

@Component({
  template: `
    <ion-list class="menu">
      <button ion-item no-lines (click)="reset()">Reset</button>
    </ion-list>
  `
})
class SettingsPopover {

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
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  colorsPage = ColorsPage;
  speechPage = SpeechPage;
  licensesPage = LicensesPage;
  loggingPage = LoggingPage;
  aboutPage = AboutPage;

  constructor(private popover: PopoverController) {}

    presentPopover(event) {
      let popover = this.popover.create(SettingsPopover);
      popover.present({ev: event});
    }
}
