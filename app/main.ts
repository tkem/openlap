import { Injectable, ExceptionHandler } from '@angular/core';

import { ionicBootstrap, LocalStorage, Storage } from 'ionic-angular';

import { OpenLapApp } from './app';
import { Backend, BLEBackend, SerialBackend, DemoBackend } from './backends';
import { DEFAULT_SETTINGS, Logger, Settings } from './providers';

const APP_DEFAULT_SETTINGS = {
  colors: [
    '#ff0000',
    '#0000ff',
    '#ffff00',
    '#00ff00',
    '#808080',
    '#000000',
    '#870275',
    '#00fbff'
  ], 
  drivers: [
    { name: 'Driver #1', code: '#1' },
    { name: 'Driver #2', code: '#2' },
    { name: 'Driver #3', code: '#3' },
    { name: 'Driver #4', code: '#4' },
    { name: 'Driver #5', code: '#5' },
    { name: 'Driver #6', code: '#6' },
    { name: 'Autonomous Car', code: 'AUT' },
    { name: 'Pace Car', code: 'PAC' }
  ],
  logging: { 
    level: 'info' 
  },
  qualifying: {
  },
  race: {
  },
  speech: {
    enabled: false,
    'bestlap': '{name}: Fastest lap!',
    'finished': '{name}: Finished!',
    'lowfuel': '{name}: Low fuel!'
  }
};

@Injectable()
class LoggingExceptionHandler extends ExceptionHandler {
  constructor(private logger: Logger) {
    super(null);
  }

  call(error, stackTrace = null, reason = null) {
    this.logger.error(ExceptionHandler.exceptionToString(error, stackTrace, reason));
  }
}

ionicBootstrap(OpenLapApp, [
  Logger,
  { provide: ExceptionHandler, useClass: LoggingExceptionHandler },
  { provide: Storage, useValue: new Storage(LocalStorage) },
  { provide: DEFAULT_SETTINGS, useValue: APP_DEFAULT_SETTINGS },
  Settings,
  { provide: Backend, useClass: DemoBackend, multi: true },
  { provide: Backend, useClass: SerialBackend, multi: true },
  { provide: Backend, useClass: BLEBackend, multi: true }
], { 
  prodMode: !!window['cordova'] 
});
