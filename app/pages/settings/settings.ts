import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AppVersion } from 'ionic-native';

import { TargetDirective } from '../../directives';

import { Logger, Storage } from '../../providers';

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

  constructor(private logger: Logger, private storage: Storage, private nav: NavController) {
    storage.get('logging', {level: 'info'}).then(logging => {
      this.logging = logging;
    });
  }

  ngOnInit() {
    this.version = AppVersion.getVersionNumber().catch(error => {
      return 'develop';
    });
  }

  ngOnDestroy() {
    this.storage.set('logging', this.logging);
  }
}
