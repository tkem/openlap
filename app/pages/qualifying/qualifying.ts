import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/qualifying/qualifying.html'
})
export class QualifyingPage {

  options: any;

  constructor(params: NavParams, private view: ViewController) {
    this.options = params.data;
  }

  onSubmit(options) {
    this.view.dismiss(options);
  }

  onCancel() {
    this.view.dismiss();
  }
}
