import { Component, OnDestroy } from '@angular/core';

import { Settings, Connection } from '../core';

@Component({
  templateUrl: 'connection.page.html'
})
export class ConnectionPage implements OnDestroy {

  connection = new Connection();

  reconnectDelay = {
    lower: 1000,
    upper: 10000
  };

  private subscription: any;

  constructor(private settings: Settings) {}

  ngOnInit() {
    this.subscription = this.settings.getConnection().subscribe(connection => {
      this.connection = connection;
      this.reconnectDelay = {
        lower: connection.minReconnectDelay,
        upper: connection.maxReconnectDelay
      };
    });
  }

  ngOnDestroy() {
    this.connection.minReconnectDelay = this.reconnectDelay.lower;
    this.connection.maxReconnectDelay = this.reconnectDelay.upper;
    this.settings.setConnection(this.connection);
    this.subscription.unsubscribe();
  }
}
