
import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Driver, Logger, Settings } from '../core';

@Component({
  templateUrl: 'colors.page.html'
})
export class ColorsPage implements OnDestroy, OnInit {

  drivers: Driver[];

  readonly placeholder = 'Driver {{number}}';

  constructor(private logger: Logger, private settings: Settings) {}

  ngOnInit() {
    this.settings.getDrivers().pipe(take(1)).toPromise().then(drivers => {
      this.drivers = drivers;
    }).catch(error => {
      this.logger.error('Error getting colors', error);
    });
  }

  ngOnDestroy() {
    this.settings.setDrivers(this.drivers).catch(error => {
      this.logger.error('Error setting colors', error);
    });
  }

}
