import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavParams, PopoverController } from '@ionic/angular';

import { AppSettings, Options } from '../app-settings';
import { LoggingService } from '../services';

@Component({
  templateUrl: 'tuning.menu.html',
})
export class TuningMenu implements OnDestroy, OnInit {

  private options = new Options();

  private params: any;

  private subscription: any;

  get mode() {
    return this.options.cumode;
  }

  set mode(value) {
    this.options.cumode = value;
    this.settings.setOptions(this.options);
    this.dismiss();
  }

  constructor(private logger: LoggingService, private settings: AppSettings, private popover: PopoverController,
              params: NavParams) 
  {
    this.params = params.data;
  }

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe({
      next: (options) => {
        this.options = options;
      },
      error: (error) => {
        this.logger.error('Tuning settings: ', error);
      },
      complete: () => {
        this.logger.debug('Tuning settings complete');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  apply() {
    this.params.apply();
    this.dismiss();
  }

  private dismiss() {
    return this.popover.dismiss();
  }
}
