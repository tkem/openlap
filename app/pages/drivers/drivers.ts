import {Component} from '@angular/core';

import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/drivers/drivers.html'
})
export class DriversPage {

  private models: any;

  constructor(private view: ViewController, params: NavParams) {
    this.models = params.data;
  }

  onSubmit(models) {
    this.view.dismiss(models);
  }

  onClose() {
    this.view.dismiss();
  }
}
