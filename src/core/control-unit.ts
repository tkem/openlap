import { OpaqueToken } from '@angular/core';

import { ControlUnit } from '../carrera';
import { BehaviorSubject } from '../rxjs';

export function controlUnitFactory(subject: BehaviorSubject<ControlUnit>) {
  return subject.value;
}

export const CONTROL_UNIT_SUBJECT = new OpaqueToken('ControlUnitSubject');

export const CONTROL_UNIT_PROVIDER = {
  provide: ControlUnit,
  useFactory: controlUnitFactory,
  deps: [CONTROL_UNIT_SUBJECT]
};
