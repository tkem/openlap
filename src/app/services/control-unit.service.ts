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

  next(value: ControlUnit) {
    if (this.value) {
      this.value.disconnect().catch(error => {
        this.logger.error('Error disconnecting from', this.value, error);
      }).then(() => {
        super.next(value);
      })
    } else {
      super.next(value);
    }
  }
}
