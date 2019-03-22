import { NgModule } from '@angular/core';

import { Backend } from './backend';
import { BLEBackend } from './ble';
import { DemoBackend } from './demo';
import { SerialBackend } from './serial';
import { WebBluetoothBackend } from './web-bluetooth';

@NgModule({
  providers: [
    { provide: Backend, useClass: BLEBackend, multi: true },
    { provide: Backend, useClass: DemoBackend, multi: true },
    { provide: Backend, useClass: SerialBackend, multi: true },
    { provide: Backend, useClass: WebBluetoothBackend, multi: true },
  ]
})
export class BackendModule {}
