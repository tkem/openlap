import { Component, NgZone } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ControlUnit, Logger, Plugins } from '../../providers';

import { ConnectionProvider, Device } from '../../connections/connection';
import { BLEProvider } from '../../connections/ble';
import { DemoProvider } from '../../connections/demo';
import { SerialProvider } from '../../connections/serial';

@Component({
  providers: [BLEProvider, DemoProvider, SerialProvider],
  templateUrl: 'build/pages/connection/connection.html',
})
export class ConnectionPage {
  devices: any[];
  error: any;
  version: Promise<string>;
  
  constructor(private cu: ControlUnit, private logger: Logger, private plugins: Plugins, private view: ViewController, private zone: NgZone,
          private ble: BLEProvider, private serial: SerialProvider, private demo: DemoProvider
  ) {
    let devices = {};
    plugins.get('ble').then(ble => {
      ble.enable(() => this.startScan(ble), error => this.logger.info('Not scanning for BLE devices', error));
    }).catch(error => {
      this.logger.info('BLE not enabled');
    });
  }

  connect(device: Device) {
    let provider: ConnectionProvider;
    switch (device.id) {
      case 'demo':
        provider = this.demo;
        break;
      case 'serial':
        provider = this.serial;
        break;
      default:
        provider = this.ble;
        break;
    }
    this.cu.connect(provider, device).then(
      () => this.version = this.cu.getVersion()
    ).catch(error => {
      this.logger.error(error);
      this.error = error;
    });    
  }

  startScan(ble: any) {
    let devices = {};
    ble.startScan([],
      device => {
        devices[device.id] = device;
        this.zone.run(() => { this.devices = Object.keys(devices).map(id => devices[id]); });
      },
      error => this.logger.error('Error scanning for BLE devices', error)
    );
  }
  
  close() {
    this.view.dismiss();
  }
}

