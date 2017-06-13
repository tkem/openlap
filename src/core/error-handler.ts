import { ErrorHandler, Injectable } from '@angular/core';

import { IonicErrorHandler } from 'ionic-angular';

import { Logger } from './logger';

@Injectable()
export class LoggingErrorHandler implements ErrorHandler {
  private defaultHandler = new IonicErrorHandler();

  constructor(private logger: Logger) {}

  handleError(error: any) {
    // FIXME: this will write to console twice
    this.defaultHandler.handleError(error);
    this.logger.error('Error:', error);
  }
}
