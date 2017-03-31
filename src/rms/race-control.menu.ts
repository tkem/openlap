import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'race-control.menu.html',
})
export class RaceControlMenu {

  params: {cancel: any, restart: any};

  constructor(private view: ViewController, params: NavParams) {
    this.params = params.data;
  }

  cancel() {
    this.params.cancel();
    this.close();
  }

  restart() {
    this.params.restart();
    this.close();
  }

  private close() {
    this.view.dismiss();
  }
}
