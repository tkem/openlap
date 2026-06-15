import { NgModule } from '@angular/core';

import { Backend } from './backend';
import { BLEBackend } from './ble';
import { DemoBackend } from './demo';
import { WebBluetoothBackend } from './web-bluetooth';
import { WebSerialBackend } from './web-serial';

@NgModule({
  providers: [
    { provide: Backend, useClass: BLEBackend, multi: true },
    { provide: Backend, useClass: DemoBackend, multi: true },
    { provide: Backend, useClass: WebBluetoothBackend, multi: true },
    { provide: Backend, useClass: WebSerialBackend, multi: true },
  ]
})
export class BackendModule {}
