import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TargetDirective } from '../../directives';

import { Logger, Plugins, Storage } from '../../providers';

import { LicensesPage } from '../licenses/licenses';
import { LoggingPage } from '../logging/logging';

@Component({
  directives: [TargetDirective],
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  licensesPage = LicensesPage;
  loggingPage = LoggingPage;
    
  version: Promise<string>;

  logging = {};

  constructor(private logger: Logger, plugins: Plugins, private storage: Storage, private nav: NavController) {
    this.version = plugins.get('AppVersion').then(obj => {
      return obj.version;
    }).catch(error => {
      return 'develop';
    });
    storage.get('logging', {level: 'info'}).then(logging => {
      this.logging = logging;
    });
  }

  ngOnDestroy() {
    this.storage.set('logging', this.logging);
  }
}
