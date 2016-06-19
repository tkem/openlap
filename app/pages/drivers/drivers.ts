import { Component, OnDestroy } from '@angular/core';

import { RaceControl, Storage } from '../../providers';

@Component({
  templateUrl: 'build/pages/drivers/drivers.html'
})
export class DriversPage implements OnDestroy {

  private drivers: any;

  constructor(rc: RaceControl, private storage: Storage) {
    this.drivers = rc.drivers;
  }
  
  getCode(name: string) {
    return name.split(' ').slice(-1)[0].substr(0, 3).toUpperCase();
  } 

  ngOnDestroy() {
    this.storage.set('drivers', this.drivers);
  }
}
