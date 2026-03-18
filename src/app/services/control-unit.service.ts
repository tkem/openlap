import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { LoggingService } from './logging.service';

import { ControlUnit } from '../carrera';

@Injectable({
  providedIn: 'root'
})
export class ControlUnitService extends BehaviorSubject<ControlUnit> {

  constructor(private logger: LoggingService) {
    super(null);
  }

  override next(value: ControlUnit) {
    const prev = this.value;
    super.next(value);
    if (prev) {
      prev.disconnect().catch(error => {
        this.logger.error('Error disconnecting from', prev, error);
      });
    }
  }
}
