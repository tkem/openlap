import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { RaceControl, Storage } from '../../providers';

@Component({
  templateUrl: 'build/pages/race/race.html'
})
export class RacePage {

  options = {};

  constructor(private rc: RaceControl, private storage: Storage, private view: ViewController) {
    this.storage.get('race', { laps: 10, auto: true }).then(options => {
      this.options = options;
    });
  }

  onSubmit(options) {
    this.rc.start('race', options);
    this.storage.set('race', options);
    this.view.dismiss(options);
  }

  onClose() {
    this.view.dismiss();
  }
}
