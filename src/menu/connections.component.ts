import { Component, Inject } from '@angular/core';

import { BehaviorSubject, ArrayObservable, Observable } from '../rxjs';

import { Backend } from '../backend';
import { ControlUnit, Peripheral } from '../carrera';
import { CONTROL_UNIT_SUBJECT } from '../core';
import { Logger } from '../logging';

@Component({
  selector: 'app-connections',
  templateUrl: 'connections.component.html'
})
export class ConnectionsComponent {

  devices: Observable<Peripheral[]>;

  constructor(@Inject(CONTROL_UNIT_SUBJECT) public cu: BehaviorSubject<ControlUnit>,
              @Inject(Backend) backends: Backend[],
              private logger: Logger) 
  {
    this.devices = ArrayObservable.create(backends).mergeAll().scan(
      (result, value) => result.concat(value), []
    ).combineLatest(this.cu).map(([devices, cu]) => {
      return devices.filter(device => !cu || !device.equals(cu.peripheral));
    });
  }

  connect(peripheral: Peripheral) {
    if (this.cu.value) {
      this.cu.value.disconnect();
    }
    const cu = new ControlUnit(peripheral);
    cu.connect();
    this.cu.next(cu);
  }
}
