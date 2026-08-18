import { Component, OnDestroy, OnInit } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { AppSettings, Connection } from '../app-settings';
import { AppService, ControlUnitService, LoggingService } from '../services';

function isObjectSubset(a, b) {
  for (let key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

@Component({
    templateUrl: 'connection.page.html',
    standalone: false
})
export class ConnectionPage implements OnDestroy, OnInit {

  private loaded = false;

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
  
  type = undefined;

  isDesktopBrowser = false;

  isFirmwareUpdateSupported: Promise<boolean>;

  constructor(
    public cu: ControlUnitService,
    private logger: LoggingService,
    private settings: AppSettings,
    private app: AppService
  ) { 
    this.isDesktopBrowser = !this.app.isCordova();
    if (cu.value) {
      this.isFirmwareUpdateSupported = cu.value.getVersion().then(v => v.startsWith("5"));
    } else {
      this.isFirmwareUpdateSupported = Promise.resolve(!!cu.value);
    }
  }

  ngOnInit() {
    firstValueFrom(this.settings.getConnection()).then(connection => {
      this.connection = connection;
      this.ranges = {
        connection: connection.connectionTimeout,
        request: connection.requestTimeout,
        reconnect: {
          lower: connection.minReconnectDelay,
          upper: connection.maxReconnectDelay
        }
      };
      this.type = connection.backendFilter;
      this.demo = connection.demoControlUnit;
      this.loaded = true;
    }).catch(error => {
      this.logger.error('Error getting connection parameters', error);
    });
  }

  ngOnDestroy() {
    if (!this.loaded || !this.connection || !this.ranges || !this.ranges.reconnect) {
      return;
    }
    const connection = {
      connectionTimeout: this.ranges.connection,
      requestTimeout: this.ranges.request,
      minReconnectDelay: this.ranges.reconnect.lower,
      maxReconnectDelay: this.ranges.reconnect.upper,
      backendFilter: this.type,
      demoControlUnit: this.demo
    };
    if (!isObjectSubset(connection, this.connection)) {
      this.settings.setConnection(Object.assign({}, this.connection, connection)).catch(error => {
        this.logger.error('Error setting connection parameters', error);
      });
    }
  }
}
