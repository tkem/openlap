import { Component, OnDestroy, OnInit } from '@angular/core';

import { Driver, Settings, Speech } from '../core';
import { Logger } from '../logging';

@Component({
  templateUrl: 'drivers.page.html'
})
export class DriversPage implements OnDestroy, OnInit {

  drivers: Driver[];

  constructor(private logger: Logger, private settings: Settings, private speech: Speech) {}

  getCode(name: string) {
    return name.split(' ').slice(-1)[0].substr(0, 3).toUpperCase();
  }

  speak(index) {
    this.speech.speak(this.drivers[index].name);
  }

  ngOnInit() {
    this.settings.getDrivers().take(1).toPromise().then(drivers => {
      this.drivers = drivers;
    }).catch(error => {
      this.logger.error('Error getting drivers', error);
    });
  }

  ngOnDestroy() {
    this.settings.setDrivers(this.drivers).catch(error => {
      this.logger.error('Error setting drivers', error);
    });
  }

  reorderItems(indexes) {
    let colors = this.drivers.map(driver => driver.color);
    let element = this.drivers[indexes.from];
    this.drivers.splice(indexes.from, 1);
    this.drivers.splice(indexes.to, 0, element);
    colors.forEach((color, index) => {
      this.drivers[index].color = color;
    });
  }
}
