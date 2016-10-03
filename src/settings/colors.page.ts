import { Component, OnDestroy, OnInit } from '@angular/core';

import { Settings } from '../core';
import { Logger } from '../logging';

@Component({
  templateUrl: 'colors.page.html'
})
export class ColorsPage implements OnDestroy, OnInit {

  colors: any[];

  constructor(private logger: Logger, private settings: Settings) {}
  
  ngOnInit() {
    this.settings.get('colors').take(1).toPromise().then(colors => {
      this.colors = colors.map(value => ({ value: value }));
    }).catch(error => {
      this.logger.error('Error getting colors', error);
    });
  }

  ngOnDestroy() {
    this.settings.set('colors', this.colors.map(item => item.value)).catch(error => {
      this.logger.error('Error setting colors', error);
    });
  }

}
