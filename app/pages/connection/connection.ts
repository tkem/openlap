import { Component, NgZone, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ControlUnit, Logger } from '../../providers';

import { Backend, BLEBackend, DemoBackend, SerialBackend } from '../../backends';

import { MainPage } from '../../pages';

@Component({
  templateUrl: 'build/pages/connection/connection.html'
})
export class ConnectionPage implements OnInit {
  _items = {};
  items = [];

  status = '';

  constructor(private cu: ControlUnit, private logger: Logger, 
              private ble: BLEBackend, private demo: DemoBackend, private serial: SerialBackend,
              private nav: NavController)
  {
    if (cu.deviceId) {
      cu.getVersion().then(version => {
        this.logger.info('CU version ' + version);
        this.status = 'Version ' + version;
      }).catch(error => {
        this.logger.error(error);
        this.status = 'Error: ' + error;
      });
    }
  }

  connect(deviceId: string) {
    let backend: Backend;
    switch (deviceId) {
      case 'demo':
        backend = this.demo;
        break;
      case 'serial':
        backend = this.serial;
        break;
      default:
        backend = this.ble;
        break;
    }
    this.cu.connect(backend, deviceId).then(() => {
      this.logger.info('Connected to ' + deviceId);
      return this.cu.getVersion();
    }).then(version => {
      this.logger.info('CU version ' + version);
      this.status = 'Version ' + version;
      if (!this.nav.canGoBack()) {
        return this.nav.setRoot(MainPage);
      }
    }).catch(error => {
      this.logger.error(error);
      this.status = 'Error: ' + error;
    });
  }

  ngOnInit() {
    try {
      this.ble.scan().subscribe(device => {
        this.logger.debug('Found new device', device);
        this._items[device.id] = device;
        let items = Object.keys(this._items).map(id => this._items[id]);
        items.sort((a, b) => a.name.localeCompare(b.name));
        this.items = items;
      });
    } catch (e) {
      this.logger.error('Error scanning for BLE devices: ', e);
    }
  }
}
