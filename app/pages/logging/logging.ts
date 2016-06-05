import { Component } from '@angular/core';

import { Logger } from '../../providers';

@Component({
  templateUrl: 'build/pages/logging/logging.html',
})
export class LoggingPage {
  constructor(private logger: Logger) {}
}
