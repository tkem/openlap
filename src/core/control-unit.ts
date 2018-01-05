import { InjectionToken } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ControlUnit } from '../carrera';

export function controlUnitFactory(subject: BehaviorSubject<ControlUnit>) {
  return subject.value;
}

export const CONTROL_UNIT_SUBJECT = new InjectionToken('ControlUnitSubject');

export const CONTROL_UNIT_PROVIDER = {
  provide: ControlUnit,
  useFactory: controlUnitFactory,
  deps: [CONTROL_UNIT_SUBJECT]
};
