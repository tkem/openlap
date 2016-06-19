import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { RaceControl, Storage } from '../../providers';

@Component({
  templateUrl: 'build/pages/qualifying/qualifying.html'
})
export class QualifyingPage {

  options = {};

  constructor(private rc: RaceControl, private storage: Storage, private view: ViewController) {
    this.storage.get('qualifying', { time: 3, auto: false }).then(options => {
      this.options = options;
    });
  }

  onSubmit(options) {
    this.rc.start('qualifying', options);
    this.storage.set('qualifying', options);
    this.view.dismiss();
  }

  onClose() {
    this.view.dismiss();
  }
}
