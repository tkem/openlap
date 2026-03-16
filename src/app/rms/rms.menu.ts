import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { AppSettings, Options } from '../app-settings';

import { I18nAlertService } from '../services';

@Component({
    templateUrl: 'rms.menu.html',
    standalone: false
})
export class RmsMenu implements OnDestroy, OnInit  {

  @Input() mode: string;

  @Input() active: boolean;

  @Input() restart: () => void;

  @Input() cancel: () => void;

  options = new Options();

  private subscription: Subscription;

  constructor(
    private alert: I18nAlertService,
    private settings: AppSettings,
    private controller: PopoverController) {}

  get sectors() {
    return this.options.sectors;
  }

  set sectors(value) {
    this.options.sectors = value;
    this.settings.setOptions(this.options);
    this.dismiss();
  }

  get fixedOrder() {
    return this.options.fixedorder;
  }

  set fixedOrder(value) {
    this.options.fixedorder = value;
    this.settings.setOptions(this.options);
    this.dismiss();
  }

  get speech() {
    return this.options.speech;
  }

  set speech(value) {
    this.options.speech = value;
    this.settings.setOptions(this.options);
    this.dismiss();
  }

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe(options => {
      this.options = options;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRestart() {
    this.dismiss().then(() => {
      if (this.active) {
        this.alert.show({
          message: 'Restart ' + this.mode + '?',
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'OK',
            handler: () => this.restart()
          }]
        });
      } else {
        this.restart();
      }
    });
  }

  onCancel() {
    this.dismiss().then(() => {
      if (this.active) {
        this.alert.show({
          message: 'Cancel ' + this.mode + '?',
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'OK',
            handler: () => this.cancel()
          }]
        });
      } else {
        this.cancel();
      }
    });
  }

  private dismiss() {
    return this.controller.dismiss({});
  }
}
