import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { I18nAlertController } from '../core';

@Component({
  templateUrl: 'race-control.menu.html',
})
export class RaceControlMenu {

  params: {active: boolean, restart: any, stop: any};

  constructor(private alert: I18nAlertController, private view: ViewController, params: NavParams) {
    this.params = params.data;
  }

  restart() {
    this.close().then(() => {
      const alert = this.alert.create({
        message: 'Restart race?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'OK',
          handler: () => this.params.restart()
        }]
      })
      alert.present();
    });
  }

  stop() {
    this.close().then(() => {
      const alert = this.alert.create({
        message: 'Cancel race?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'OK',
          handler: () => this.params.stop()
        }]
      })
      alert.present();
    });
  }

  private close() {
    return this.view.dismiss();
  }
}
