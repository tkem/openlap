import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { I18nAlertController, Options, Settings } from '../core';

@Component({
  templateUrl: 'rms.menu.html',
})
export class RmsMenu implements OnDestroy, OnInit  {

  options = new Options();

  params: {mode: string, active: boolean, restart: any, cancel: any};

  private subscription: any;

  constructor(
    private alert: I18nAlertController,
    private settings: Settings,
    private view: ViewController,
    params: NavParams
  ) {
    this.params = params.data;
  }

  get fixedOrder() {
    return this.options.fixedorder;
  }

  set fixedOrder(value) {
    this.options.fixedorder = value;
    this.settings.setOptions(this.options);
    this.close();
  }

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe(options => {
      this.options = options;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  restart() {
    this.close().then(() => {
      if (this.params.active) {
        const alert = this.alert.create({
          message: 'Restart ' + this.params.mode + '?',
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'OK',
            handler: () => this.params.restart()
          }]
        })
        alert.present();
      } else {
        this.params.restart();
      }
    });
  }

  cancel() {
    this.close().then(() => {
      if (this.params.active) {
        const alert = this.alert.create({
          message: 'Cancel ' + this.params.mode + '?',
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'OK',
            handler: () => this.params.cancel()
          }]
        })
        alert.present();
      } else {
        this.params.cancel();
      }
    });
  }

  private close() {
    return this.view.dismiss();
  }
}
