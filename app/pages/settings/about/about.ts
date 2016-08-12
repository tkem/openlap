import { Component } from '@angular/core';

import { AppVersion } from 'ionic-native';

import { Logger } from '../../../providers';

@Component({
  templateUrl: 'build/pages/settings/about/about.html',
})
export class AboutPage {

  version: Promise<string>;

  constructor(private logger: Logger) {}

  ngOnInit() {
    this.version = AppVersion.getVersionNumber().catch(error => {
      this.logger.error('Error retrieving application version', error);
      return 'develop';
    });
  }
}
