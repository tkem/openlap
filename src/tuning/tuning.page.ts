
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { PopoverController } from 'ionic-angular';

import { Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_PROVIDER, Driver, Options, Settings } from '../core';

import { TuningMenu } from './tuning.menu';

// TODO: store with CU or settings?
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
export class TuningPage implements OnDestroy, OnInit {

  drivers: Observable<Driver[]>;

  options: Observable<Options>;

  models = MODELS;

  locked = false;

  type = 'speed';

  readonly placeholder = 'Driver {{number}}';

  readonly fromCU = {
    'speed': [1, 2, 3, 5, 6, 7, 9, 11, 13, 15],
    'brake': [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    'fuel':  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  };

  readonly toCU = {
    'speed': [0, 0, 1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9],
    'brake': [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    'fuel':  [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9]
  }

  connected: Observable<boolean> = this.cu.getState().pipe(map((state) => state == 'connected'));

  private subject = new Subject<{type: string, id: number}>();

  constructor(
    private cu: ControlUnit,
    private popover: PopoverController,
    private ref: ChangeDetectorRef,
    settings: Settings
  ) {
    this.drivers = settings.getDrivers();
    this.options = settings.getOptions();
  }

  ngOnInit() {
    this.subject.pipe(debounceTime(400)).subscribe((event) => {
      for (let model of (event.id !== undefined ? [this.models[event.id]] : this.models)) {
        switch (event.type) {
        case 'speed':
          this.cu.setSpeed(model.id, model.speed);
          break;
        case 'brake':
          this.cu.setBrake(model.id, model.brake);
          break;
        case 'fuel':
          this.cu.setFuel(model.id, model.fuel);
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subject.complete();
  }

  applyAll() {
    for (let model of this.models) {
      if (model.speed !== null) {
        this.cu.setSpeed(model.id, model.speed);
      }
      if (model.brake !== null) {
        this.cu.setBrake(model.id, model.brake);
      }
      if (model.fuel !== null) {
        this.cu.setFuel(model.id, model.fuel);
      }
    }
  }

  showMenu(event) {
    let menu = this.popover.create(TuningMenu, {
      apply: () => { this.applyAll(); }
    });
    menu.present({ev: event});
  }

  update(type: string, value: number, id?: number) {
    for (let model of (id !== undefined ? [this.models[id]] : this.models)) {
      model[type] = value;
    }
    this.subject.next({id: id, type: type});
    this.ref.detectChanges();
  }
}
