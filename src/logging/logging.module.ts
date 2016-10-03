import { ErrorHandler, NgModule } from '@angular/core';

import { LoggingErrorHandler } from './error-handler';
import { Logger } from './logger';

@NgModule({
  providers: [
    Logger,
    { provide: ErrorHandler, useClass: LoggingErrorHandler }
  ]
})
export class LoggingModule {}
