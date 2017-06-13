import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Logger, Options, Settings } from '../core';

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
    this.close();
  }

  constructor(private logger: Logger, private settings: Settings, private view: ViewController,
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
    this.close();
  }

  private close() {
    return this.view.dismiss();
  }
}
