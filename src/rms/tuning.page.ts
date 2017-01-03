import { ChangeDetectorRef, Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_PROVIDER, Driver, Settings } from '../core';

// TODO: store with CU or settings?
// TODO: initial values, mark as touched, etc.
const MODELS = [0, 1, 2, 3, 4, 5].map(id => ({
  id: id,
  speed: null,
  brake: null,
  fuel: null
}));

@Component({
  providers: [CONTROL_UNIT_PROVIDER],
  templateUrl: 'tuning.page.html',
})
export class TuningPage {

  drivers: Observable<Driver[]>;

  models = MODELS;

  link = false;

  type = 'speed';

  connected: Observable<boolean> = this.cu.getState().map((state) => state == 'connected');

  private subject = new Subject<{type: string, id: number}>();

  constructor(private cu: ControlUnit, private ref: ChangeDetectorRef, settings: Settings) {
    this.drivers = settings.getDrivers();

    // TODO: is this kind of single debounce correct for multiple individual ranges/types?
    // TODO: move to ngOnInit(), unsibscribe in destroy?
    this.subject.debounceTime(400).subscribe((event) => {
      for (let model of (event.id !== undefined ? [this.models[event.id]] : this.models)) {
        switch (event.type) {
        case 'speed':
          cu.setSpeed(model.id, model.speed);
          break;
        case 'brake':
          cu.setBrake(model.id, model.brake);
          break;
        case 'fuel':
          cu.setFuel(model.id, model.fuel);
          break;
        }
      }
    });
  }
  
  update(type: string, value: number, id?: number) {
    for (let model of (id !== undefined ? [this.models[id]] : this.models)) {
      model[type] = value;
    }
    this.subject.next({id: id, type: type});
    this.ref.detectChanges();
  }
}
