import { NgModule } from '@angular/core';

import { Storage } from '@ionic/storage';

import { BehaviorSubject } from '../rxjs';
import { ControlUnit } from '../carrera';

import { CONTROL_UNIT_SUBJECT } from './control-unit';
import { DEFAULT_SETTINGS, Settings } from './settings';
import { Speech } from './speech';

export function controlUnitSubject()  {
  return new BehaviorSubject<ControlUnit>(null);
}

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
    falsestart: 'False start!',
    finished: 'Race finished!',
    finallap: 'Final lap!',
    bestlap: '{name}: Fastest lap!',
    fuel2: '{name}: Low fuel!',
    fuel1: '{name}: Box!',
    fuel0: '{name}: Box! Box! Box!',
  }
};

@NgModule({
  providers: [
    Storage,
    { provide: DEFAULT_SETTINGS, useValue: APP_DEFAULT_SETTINGS },
    Settings,
    { provide: CONTROL_UNIT_SUBJECT, useFactory: controlUnitSubject },
    Speech
  ]
})
export class CoreModule {}
