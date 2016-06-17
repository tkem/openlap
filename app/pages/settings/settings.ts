import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {ControlUnit} from '../../providers/cu';

@Component({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  models = [];
  type = 'speed';

  private subject = new Subject<{id: number, type: string}>();
  
  constructor(cu: ControlUnit, private params: NavParams, private view: ViewController) {
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
  
  onClose() {
    this.view.dismiss();
  }
}
