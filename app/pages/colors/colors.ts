import {Component} from '@angular/core';

import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/colors/colors.html'
})
export class ColorsPage {

  private models: any;

  constructor(private view: ViewController, params: NavParams) {
    this.models = params.data.map(value => { return {color: value} });
  }

  onSubmit(models) {
    console.log('Submit colors', models);
    this.view.dismiss(models.map(model => model.color));
  }

  onClose() {
    console.log('Close colors');
    this.view.dismiss();
  }
}
