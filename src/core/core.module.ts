import { NgModule } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Platform } from 'ionic-angular';

import { BehaviorSubject } from 'rxjs';

import { ControlUnit } from '../carrera';

import { CONTROL_UNIT_SUBJECT } from './control-unit';
import { Settings } from './settings';
import { Speech } from './speech';
import { Toast } from './toast';

export function provideStorage(platform: Platform) {
  if (platform.is('cordova')) {
    return new Storage();  // default options for backward compatibility
  } else {
    return new Storage(['localstorage'], { name: 'at.co.kemmer.openlap', storeName: 'settings' });
  }
}

export function controlUnitSubject()  {
  return new BehaviorSubject<ControlUnit>(null);
}

@NgModule({
  providers: [
    { provide: Storage, useFactory: provideStorage, deps: [Platform] },
    Settings,
    { provide: CONTROL_UNIT_SUBJECT, useFactory: controlUnitSubject },
    Speech,
    Toast
  ]
})
export class CoreModule {}
