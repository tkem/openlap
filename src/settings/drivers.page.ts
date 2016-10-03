import { Component, OnDestroy, OnInit } from '@angular/core';

import { Settings, Speech } from '../core';
import { Logger } from '../logging';

@Component({
  templateUrl: 'drivers.page.html'
})
export class DriversPage implements OnDestroy, OnInit {

  drivers: any[];

  constructor(private logger: Logger, private settings: Settings, private speech: Speech) {}

  getCode(name: string) {
    return name.split(' ').slice(-1)[0].substr(0, 3).toUpperCase();
  }

  speak(index) {
    this.speech.speak(this.drivers[index].name);
  }

  ngOnInit() {
    this.settings.get('drivers').take(1).toPromise().then(drivers => {
      this.drivers = drivers;
    }).catch(error => {
      this.logger.error('Error getting drivers', error);
    });
  }

  ngOnDestroy() {
    this.settings.set('drivers', this.drivers).catch(error => {
      this.logger.error('Error setting drivers', error);
    });
  }

  reorderItems(indexes) {
    let element = this.drivers[indexes.from];
    this.drivers.splice(indexes.from, 1);
    this.drivers.splice(indexes.to, 0, element);
  }
}
