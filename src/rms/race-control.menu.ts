import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { I18nAlertController, Options, Settings } from '../core';

@Component({
  templateUrl: 'race-control.menu.html',
})
export class RaceControlMenu implements OnDestroy, OnInit  {

  options = new Options();

  params: {active: boolean, restart: any, stop: any};

  private subscription: any;

  constructor(
    private alert: I18nAlertController, 
    private settings: Settings,
    private view: ViewController, 
    params: NavParams
  ) {
    this.params = params.data;
  }

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe(options => {
      this.options = options;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update() {
    this.settings.setOptions(this.options);
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
