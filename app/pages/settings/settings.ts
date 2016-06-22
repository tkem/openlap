import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TargetDirective } from '../../directives';

import { Plugins } from '../../providers';

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

  constructor(plugins: Plugins, private nav: NavController) {
    this.version = plugins.get('AppVersion').then(obj => {
      return obj.version;
    }).catch(error => {
      return 'develop';
    });
  }
}
