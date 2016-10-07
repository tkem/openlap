import { NgModule } from '@angular/core';

import { BehaviorSubject } from '../rxjs';
import { ControlUnit } from '../carrera';

import { CONTROL_UNIT_SUBJECT } from './control-unit';
import { Settings } from './settings';
import { Speech } from './speech';

export function controlUnitSubject()  {
  return new BehaviorSubject<ControlUnit>(null);
}

@NgModule({
  providers: [
    Settings,
    { provide: CONTROL_UNIT_SUBJECT, useFactory: controlUnitSubject },
    Speech
  ]
})
export class CoreModule {}
