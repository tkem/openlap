import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { BLEConnection, DemoConnection, SerialConnection } from './connections';

import { Connection, Device } from './cu';
import { Logger } from './logger';
import { Plugins } from './plugins';
import { Storage } from './storage';

@Injectable()
export class Devices {

  private scanning = false;

  private subject = new ReplaySubject<Device>();

  private ble: Promise<any>;

  private logging: any = {};

  constructor(private logger: Logger, plugins: Plugins, storage: Storage, private zone: NgZone) {
    this.logger.debug('Setup devices');
    this.subject.next({ 
      id: 'demo',
      name: 'Demo CU',  
      connect: () => Promise.resolve(new DemoConnection())
    });
    plugins.get('serial').then(serial => {
      this.subject.next({ 
        id: 'serial',
        name: 'Serial USB',
        connect: () => SerialConnection.connect(serial, zone, this.logging.connection ? logger : null)
      });
    }).catch(error => {
      this.logger.info('Serial plugin not enabled');
    });
    this.ble = plugins.get('ble').then(ble => {
      return new Promise<any>((resolve, reject) => {
        ble.enable(() => resolve(ble), error => reject(ble));
      });
    });
    storage.get('logging', {}).then(logging => this.logging = logging);
  }

  scan() {
    // FIXME: scan w/timeout, stop on unsubscribe?
    if (!this.scanning) {
      this.ble.then(ble => {
        this.startScan(ble);
      }).catch(error => {
        this.logger.error('Not scanning BLE devices', error);
      });
      this.scanning = true;
    }
    return this.subject;
  }

  stop() {
    if (this.scanning) {
      this.ble.then(ble => {
        this.stopScan(ble);
      }).catch(error => {
        this.logger.error('Not scanning BLE devices', error);
      });
      this.scanning = false;
    }
  }

  private startScan(ble: any) {
    this.logger.info('Start scanning for BLE devices');
    ble.startScan(
      [],
      device => {
        let dev = {
          id: device.id,
          name: device.name,
          connect: () => BLEConnection.connect(ble, device.id, this.zone, this.logging.connection ? this.logger : null)
        };
        this.zone.run(() => this.subject.next(dev));
      },
      error => this.logger.error('Error scanning BLE devices', error)
    );
  }

  private stopScan(ble: any) {
    this.logger.info('Stop scanning for BLE devices');
    ble.stopScan(
      () => this.logger.info('Stopped scanning for BLE devices'),
      error => this.logger.error('Error stopping BLE scan', error)
    );
  }
}
