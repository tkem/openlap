import { Component, OnDestroy } from '@angular/core';

import { take } from 'rxjs/operators';

import { AppSettings, Connection } from '../app-settings';
import { LoggingService } from '../services';

function isObjectSubset(a, b) {
  for (let key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

@Component({
  templateUrl: 'connection.page.html'
})
export class ConnectionPage implements OnDestroy {

  connection = new Connection();

  ranges = {
    connection: 5000,
    request: 1000,
    reconnect: {
      lower: 2000,
      upper: 10000
    }
  };

  demo = false;
  
  constructor(private logger: LoggingService, private settings: AppSettings) {}

  ngOnInit() {
    this.settings.getConnection().pipe(take(1)).toPromise().then(connection => {
      this.connection = connection;
      this.ranges = {
        connection: connection.connectionTimeout,
        request: connection.requestTimeout,
        reconnect: {
          lower: connection.minReconnectDelay,
          upper: connection.maxReconnectDelay
        }
      };
      this.demo = connection.demoControlUnit;
    }).catch(error => {
      this.logger.error('Error getting connection parameters', error);
    });
  }

  ngOnDestroy() {
    const connection = {
      connectionTimeout: this.ranges.connection,
      requestTimeout: this.ranges.request,
      minReconnectDelay: this.ranges.reconnect.lower,
      maxReconnectDelay: this.ranges.reconnect.upper,
      demoControlUnit: this.demo
    };
    if (!isObjectSubset(connection, this.connection)) {
      this.settings.setConnection(Object.assign({}, this.connection, connection)).catch(error => {
        this.logger.error('Error setting connection parameters', error);
      });
    }
  }
}
