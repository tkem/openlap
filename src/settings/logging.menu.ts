import { Component, OnDestroy, OnInit } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Options, Settings } from '../core';
import { Logger } from '../logging';

function stringify(obj) {
  try {
    return JSON.stringify(obj);
  } catch(error) {
    return '' + obj;
  }
}

@Component({
  templateUrl: 'logging.page.html',
})
export class LoggingMenu implements OnDestroy, OnInit {

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

  constructor(private appVersion: AppVersion, private sharing: SocialSharing, private device: Device,
    public logger: Logger, private settings: Settings, private view: ViewController) {}

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
    return this.view.dismiss();
  }

  share() {
    Promise.all([this.appVersion.getAppName(), this.appVersion.getVersionNumber()]).then(([name, version]) => {
      const message = this.logger.records.map(record => {
        return [record.level, record.time, record.args.map(stringify).join(' ')].join('\t');
      }).join('\n');
      const subject = name + ' ' + version + ' (' + [this.device.model, this.device.platform, this.device.version].join(' ') + ')';
      return this.sharing.shareWithOptions({ message: message, subject: subject });
    }).catch(error => {
      this.logger.error('Error sharing log:', error);
    }).then(() => {
      this.close();
    });
  }
}
