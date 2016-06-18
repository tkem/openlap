import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';

import { ViewController } from 'ionic-angular';

import { ControlUnit, Logger, Plugins } from '../../providers';

import { ConnectionProvider, Device } from '../../connections/connection';
import { BLEProvider } from '../../connections/ble';
import { DemoProvider } from '../../connections/demo';
import { SerialProvider } from '../../connections/serial';

@Component({
  providers: [BLEProvider, DemoProvider, SerialProvider, NgClass],
  templateUrl: 'build/pages/connection/connection.html',
})
export class ConnectionPage implements OnInit, OnDestroy {
  _devices = {};
  devices: any[];

  status = '';
  
  private scanning = false;

  constructor(private cu: ControlUnit, private logger: Logger, private plugins: Plugins, private view: ViewController, private zone: NgZone,
          private ble: BLEProvider, private serial: SerialProvider, private demo: DemoProvider
  ) {
    if (cu.device) {
      cu.getVersion().then(version => {
        this.status = 'Version ' + version;
      }).catch(error => {
        this.status = 'Error: ' + error;
        this.logger.error(error);
      });
      this.add(cu.device);
    }
    this.add({name: 'Demo Connection', id: 'demo'});
    plugins.get('serial').then(() => {
      this.add({name: 'Serial USB', id: 'serial'});
    }).catch(error => {
      this.logger.info('Serial plugin not enabled');
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
    this.status = '';
    this.cu.connect(provider, device).then(() => {
      return this.cu.getVersion();
    }).then(version => {
      this.status = 'Version ' + version;
    }).catch(error => {
      this.status = 'Error: ' + error;
      this.logger.error(error);
    });    
  }

  ngOnInit() {
    this.plugins.get('ble').then(ble => {
      ble.enable(() => this.startScan(ble), error => this.logger.info('Not scanning for BLE devices', error));
    }).catch(error => {
      this.logger.info('BLE not enabled');
    });
  }

  ngOnDestroy() {
    if (this.scanning) {
      this.plugins.get('ble').then(ble => this.stopScan(ble));
    }
  }

  private add(device: Device) {
    this.logger.debug('Found new device', device);
    this._devices[device.id] = device;
    let devices: Device[] = Object.keys(this._devices).map(id => this._devices[id]);
    devices.sort((a, b) => a.name.localeCompare(b.name));
    this.devices = devices;
  }

  private startScan(ble: any) {
    this.logger.info('Start scanning for BLE devices');
    ble.startScan(
      [], 
      device => this.zone.run(() => this.add(device)),
      error => this.logger.error('Error scanning BLE devices', error)
    );
    this.scanning = true;
  }
  
  private stopScan(ble: any) {
    this.logger.info('Stop scanning for BLE devices');
    ble.stopScan(
      () => this.logger.info('Stopped scanning for BLE devices'),
      error => this.logger.error('Error stopping scanning BLE devices', error)
    );
    this.scanning = false;
  }

  onClose() {
    this.view.dismiss();
  }
}

