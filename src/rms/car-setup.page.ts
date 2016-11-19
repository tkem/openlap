import { ChangeDetectorRef, Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_PROVIDER } from '../core';

// TODO: store with CU or settings?
// TODO: initial values, mark as touched, etc.
const settings = [0, 1, 2, 3, 4, 5].map(id => ({
  id: id,
  speed: 8,
  brake: 8,
  fuel: 8
}));

@Component({
  providers: [CONTROL_UNIT_PROVIDER],
  templateUrl: 'car-setup.page.html',
})
export class CarSetupPage {

  models = settings;

  all = {
    speed: 8,
    brake: 8,
    fuel: 8
  };

  type = 'speed';

  connected: Observable<boolean> = this.cu.getState().map((state) => state == 'connected');

  private subject = new Subject<{type: string, id: number}>();

  constructor(private cu: ControlUnit, private ref: ChangeDetectorRef) {
    // TODO: is this kind of single debounce correct for multiple individual ranges/types?
    // TODO: move to ngOnInit(), unsibscribe in destroy?
    this.subject.debounceTime(400).subscribe((event) => {
      for (let model of (event.id !== null ? [this.models[event.id]] : this.models)) {
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

  update(type: string, value: number, id = null) {
    if (id === null) {
      this.models.forEach(model => {
        model[type] = value;
      });
    }
    this.ref.detectChanges();
    this.subject.next({id: id, type: type});
  }
}
