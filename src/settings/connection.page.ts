import { Component, OnDestroy } from '@angular/core';

import { Settings, Connection } from '../core';

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

  private subscription: any;

  constructor(private settings: Settings) {}

  ngOnInit() {
    this.subscription = this.settings.getConnection().subscribe(connection => {
      this.connection = connection;
      this.ranges = {
        connection: connection.connectionTimeout,
        request: connection.requestTimeout,
        reconnect: {
          lower: connection.minReconnectDelay,
          upper: connection.maxReconnectDelay
        }
      };
    });
  }

  ngOnDestroy() {
    const connection = {
      connectionTimeout: this.ranges.connection,
      requestTimeout: this.ranges.request,
      minReconnectDelay: this.ranges.reconnect.lower,
      maxReconnectDelay: this.ranges.reconnect.upper
    };
    if (!isObjectSubset(connection, this.connection)) {
      this.settings.setConnection(Object.assign({}, this.connection, connection));
    }
    this.subscription.unsubscribe();
  }
}
