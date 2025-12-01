import { Component, OnDestroy, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { AppSettings, Options } from '../app-settings';
import { AppService, LoggingService } from '../services';

function stringify(obj) {
  try {
    return JSON.stringify(obj);
  } catch(error) {
    return '' + obj;
  }
}

@Component({
    templateUrl: 'logging.menu.html',
    standalone: false
})
export class LoggingMenu implements OnDestroy, OnInit {

  private options = new Options();

  private subscription: any;

  share: () => void = undefined;

  get debugEnabled() {
    return this.options.debug;
  }

  set debugEnabled(value) {
    this.options.debug = value;
    this.settings.setOptions(this.options);
    this.dismiss();
  }

  constructor(
    private app: AppService,
    public logger: LoggingService, 
    private settings: AppSettings, 
    private controller: PopoverController) 
  {
    if (app.share) {
      this.share = () => this.doShare();
    }
  }

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe({
      next: (options) => {
        this.options = options;
      },
      error: (error) => {
        this.logger.error('Logging settings: ', error);
      },
      complete: () => {
        this.logger.debug('Logging settings complete');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clear() {
    this.logger.clear();
    this.dismiss();
  }

  dismiss() {
    return this.controller.dismiss();
  }

  private doShare() {
    Promise.all([this.app.getName(), this.app.getVersion(), this.app.getDeviceInfo()]).then(([name, version, device]) => {
      const message = this.logger.records.map(record => {
        return [record.level, record.time, record.args.map(stringify).join(' ')].join('\t');
      }).join('\n');
      const subject = name + ' ' + version + ' (' + [device.model, device.platform, device.version].join(' ') + ')';
      return this.app.share(subject, message);
    }).catch(error => {
      this.logger.error('Error sharing log:', error);
    }).then(() => {
      this.dismiss();
    });
  }
}
