import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ControlUnit } from '../../providers';

@Component({
  templateUrl: 'build/pages/car-setup/car-setup.html',
})
export class CarSetupPage {

  models = [];

  type = 'speed';

  private subject = new Subject<{id: number, type: string}>();
  
  constructor(public cu: ControlUnit, params: NavParams) {
    this.models = params.data;

    // TODO: distinctUntilChanged, etc.
    this.subject.debounceTime(400).subscribe(event => {
      switch (event.type) {
      case 'speed':
        cu.setSpeed(event.id, this.models[event.id].speed);
        break;
      case 'brake':
        cu.setBrake(event.id, this.models[event.id].brake);
        break;
      case 'fuel':
        cu.setFuel(event.id, this.models[event.id].fuel);
        break;    
      }
    });
  }
  
  update(id: number, type: string) {
    this.subject.next({id: id, type: type});  
  }
}
