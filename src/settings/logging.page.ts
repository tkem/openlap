import { Component } from '@angular/core';

import { PopoverController, ViewController } from 'ionic-angular';

import { Settings } from '../core';
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

  private logging = { level: 'info' };

  private subscription: any;

  get debugEnabled() {
    return this.logging.level === 'debug';
  }

  set debugEnabled(value) {
    console.log('Setting debugEnabled');
    this.logging.level = value ? 'debug' : 'info';
    this.settings.set('logging', this.logging);
    this.close();
  }

  constructor(public logger: Logger, private settings: Settings, private view: ViewController) {}

  ngOnInit() {
    this.subscription = this.settings.get('logging').subscribe({
      next: (logging) => {
        this.logger.info('Logging settings: ', logging);
        this.logging = logging;
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

  presentPopover(event) {
    let popover = this.popover.create(LoggingPopover);
    popover.present({ev: event});
  }

}
