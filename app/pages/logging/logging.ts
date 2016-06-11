import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Logger } from '../../providers';

@Component({
  templateUrl: 'build/pages/logging/logging.html',
})
export class LoggingPage {
  constructor(public logger: Logger, private view: ViewController) {}
    
  close() {
    this.view.dismiss();
  }
}
