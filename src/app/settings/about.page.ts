import { Component } from '@angular/core';

import { AppService } from '../services/app.service';

@Component({
    templateUrl: 'about.page.html',
    standalone: false
})
export class AboutPage {

  version: Promise<string>;

  constructor(private app: AppService) {
    this.version = app.getVersion();
  }
}
