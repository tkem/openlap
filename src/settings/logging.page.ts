import { Component } from '@angular/core';

import { PopoverController, ViewController } from 'ionic-angular';

import { Options, Settings } from '../core';
import { Logger } from '../logging';

@Component({
  template: `
    <ion-list no-margin>
      <ion-item no-lines>
        <ion-label>Debug</ion-label>
        <ion-checkbox [(ngModel)]="debugEnabled"></ion-checkbox>
      </ion-item>
      <button ion-item no-lines (click)="logger.clear()">Clear</button>
    </ion-list>
  `
})
export class LoggingPopover {

  private options = new Options();

  private subscription: any;

  get debugEnabled() {
    return this.options.debug;
  }

  set debugEnabled(value) {
    this.options.debug = value;
    this.settings.setOptions(this.options);
    this.close();
  }

  constructor(public logger: Logger, private settings: Settings, private view: ViewController) {}

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe({
      next: (options) => {
        this.logger.info('Logging settings: ', options);
        this.options = options;
      },
      error: (error) => {
        this.logger.error('Logging settings: ', error);
      },
      complete: () => {
        this.logger.info('Logging settings complete');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clear() {
    this.logger.clear();
    this.close();
  }

  close() {
    this.view.dismiss();
  }
}

@Component({
  templateUrl: 'logging.page.html',
})
export class LoggingPage {

  icons = [
    {name: 'bug', style: {color: 'green'}}, 
    {name: 'information-circle', style: {color: 'blue'}},
    {name: 'warning', style: {color: 'yellow'}},
    {name: 'alert', style: {color: 'red'}}
  ];

  constructor(public logger: Logger, private popover: PopoverController) {}

  stringify(obj) {
    try {
      return JSON.stringify(obj);
    } catch(error) {
      return '' + obj;
    }
  }

  presentPopover(event) {
    let popover = this.popover.create(LoggingPopover);
    popover.present({ev: event});
  }

}
