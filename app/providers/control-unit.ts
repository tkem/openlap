import { OpaqueToken } from '@angular/core';

import { BehaviorSubject } from '../rxjs';

import { ControlUnit } from '../carrera';

export const CONTROL_UNIT_SUBJECT = new OpaqueToken('ControlUnitSubject');

export const CONTROL_UNIT_PROVIDER = {
  provide: ControlUnit,
  useFactory: (subject: BehaviorSubject<ControlUnit>) => subject.value,
  deps: [CONTROL_UNIT_SUBJECT]
};
