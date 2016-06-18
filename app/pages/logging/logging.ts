import { Component } from '@angular/core';

import {DatePipe } from '@angular/common';

import { NavParams, ViewController } from 'ionic-angular';

import { Logger } from '../../providers';

@Component({
  templateUrl: 'build/pages/logging/logging.html',
})
export class LoggingPage {
  icons = [
    {name: 'bug', style: {color: 'green'}}, 
    {name: 'information-circle', style: {color: 'blue'}},
    {name: 'warning', style: {color: 'yellow'}},
    {name: 'alert', style: {color: 'red'}}
  ];

  constructor(public logger: Logger, private view: ViewController) {}
    
  close() {
    this.view.dismiss();
  }
}
