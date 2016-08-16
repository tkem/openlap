import { Component, Inject } from '@angular/core';

import { ControlUnit, Peripheral } from '../../carrera';

import { ArrayObservable, BehaviorSubject, Observable } from '../../rxjs';

import { Backend } from '../../backends';

import { CONTROL_UNIT_SUBJECT } from '../../providers';

@Component({
  templateUrl: 'build/pages/connection/connection.html'
})
export class ConnectionPage {

  items: Observable<Peripheral[]>;

  constructor(@Inject(CONTROL_UNIT_SUBJECT) private cus: BehaviorSubject<ControlUnit>,
              @Inject(Backend) backends: Backend[])
  {
    this.items = ArrayObservable.create(backends).mergeAll().scan(
      (result, value) => result.concat(value), []
    );
  }

  onClick(peripheral: Peripheral) {
    if (this.cus.value) {
      this.cus.value.disconnect();
    }
    const cu = new ControlUnit(peripheral);
    this.cus.next(cu);
    cu.connect();
  }
}
