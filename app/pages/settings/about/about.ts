import { Component } from '@angular/core';

import { AppVersion } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/settings/about/about.html',
})
export class AboutPage {

  version: Promise<string>;

  ngOnInit() {
    this.version = AppVersion.getVersionNumber().catch(error => {
      return 'develop';
    });
  }
}
