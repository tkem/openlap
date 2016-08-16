import { Component, OnDestroy, OnInit } from '@angular/core';

import { Logger, Settings } from '../../providers';

@Component({
  templateUrl: 'build/pages/colors/colors.html'
})
export class ColorsPage implements OnDestroy {

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

  reorderItems(indexes) {
    let element = this.colors[indexes.from];
    this.colors.splice(indexes.from, 1);
    this.colors.splice(indexes.to, 0, element);
  }
}
