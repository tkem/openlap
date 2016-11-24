import { NgModule } from '@angular/core';

import { Storage } from '@ionic/storage';

import { BehaviorSubject } from 'rxjs';

import { ControlUnit } from '../carrera';

import { CONTROL_UNIT_SUBJECT } from './control-unit';
import { Settings } from './settings';
import { Speech } from './speech';
import { Toast } from './toast';

export function controlUnitSubject()  {
  return new BehaviorSubject<ControlUnit>(null);
}

@NgModule({
  providers: [
    Storage,
    Settings,
    { provide: CONTROL_UNIT_SUBJECT, useFactory: controlUnitSubject },
    Speech,
    Toast
  ]
})
export class CoreModule {}
