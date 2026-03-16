import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { AppSettings, Options } from '../app-settings';
import { LoggingService } from '../services';

@Component({
    templateUrl: 'tuning.menu.html',
    standalone: false
})
export class TuningMenu implements OnDestroy, OnInit {

  @Input() apply: () => void;

  private options = new Options();

  private subscription: Subscription;

  get mode() {
    return this.options.cumode;
  }

  set mode(value) {
    this.options.cumode = value;
    this.settings.setOptions(this.options);
    this.dismiss();
  }

  constructor(
    private logger: LoggingService,
    private settings: AppSettings,
    private controller: PopoverController) {}

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

  applyAll() {
    this.apply();
    this.dismiss();
  }

  private dismiss() {
    return this.controller.dismiss();
  }
}
