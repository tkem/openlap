import { ErrorHandler, NgModule } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ControlUnit } from '../carrera';

import { I18nAlertController } from './i18n-alert.controller';
import { CONTROL_UNIT_SUBJECT } from './control-unit';
import { LoggingErrorHandler } from './error-handler';
import { Logger } from './logger';
import { Settings } from './settings';
import { Speech } from './speech';
import { Toast } from './toast';

export function controlUnitSubject()  {
  return new BehaviorSubject<ControlUnit>(null);
}

@NgModule({
  providers: [
    { provide: CONTROL_UNIT_SUBJECT, useFactory: controlUnitSubject },
    I18nAlertController,
    Logger,
    { provide: ErrorHandler, useClass: LoggingErrorHandler },
    Settings,
    Speech,
    Toast
  ]
})
export class CoreModule {}
