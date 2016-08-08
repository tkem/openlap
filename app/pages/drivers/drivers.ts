import { Component, OnDestroy } from '@angular/core';

import { RaceControl, Speech, Storage } from '../../providers';

@Component({
  templateUrl: 'build/pages/drivers/drivers.html'
})
export class DriversPage implements OnDestroy {

  private drivers: any;

  constructor(private rc: RaceControl, private storage: Storage, private speech: Speech) {
    this.drivers = rc.drivers;
  }
  
  getCode(name: string) {
    return name.split(' ').slice(-1)[0].substr(0, 3).toUpperCase();
  } 

  ngOnDestroy() {
    this.storage.set('drivers', this.drivers);
    this.rc.drivers = this.drivers;
  }

  reorderItems(indexes) {
    let element = this.drivers[indexes.from];
    this.drivers.splice(indexes.from, 1);
    this.drivers.splice(indexes.to, 0, element);
  }

  speak(index) {
    this.speech.speak(this.drivers[index].name);
  }
}
