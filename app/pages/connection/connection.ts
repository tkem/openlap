import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ControlUnit, Device, Devices, Logger, Plugins } from '../../providers';

import { MainPage } from '../../pages';

@Component({
  templateUrl: 'build/pages/connection/connection.html'
})
export class ConnectionPage implements OnInit, OnDestroy {
  _items = {};
  items = [];

  status = '';

  constructor(private cu: ControlUnit, private devices: Devices, private logger: Logger,
              private plugins: Plugins, private nav: NavController) 
  {
    if (cu.device) {
      cu.getVersion().then(version => {
        this.status = 'Version ' + version;
      }).catch(error => {
        this.status = 'Error: ' + error;
        this.logger.error(error);
      });
    }
  }

  connect(device: Device) {
    this.cu.connect(device).then(() => {
      return this.cu.getVersion();
    }).then(version => {
      this.status = 'Version ' + version;
      if (!this.nav.canGoBack()) {
        return this.nav.setRoot(MainPage);
      }
    }).catch(error => {
      this.status = 'Error: ' + error;
      this.logger.error(error);
    });
  }

  ngOnInit() {
    this.plugins.get('splashscreen').then(splashscreen => {
      splashscreen.hide();
    }).catch(() => {
      this.logger.info('Splash screen not enabled');
    });
    this.devices.scan().subscribe(device => {
      this.logger.debug('Found new device', device);
      this._items[device.id] = device;
      let items: Device[] = Object.keys(this._items).map(id => this._items[id]);
      items.sort((a, b) => a.name.localeCompare(b.name));
      this.items = items;
    });
  }

  ngOnDestroy() {
    // TODO: unsubscribe?
    this.devices.stop();
  }
}
