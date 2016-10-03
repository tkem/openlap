import { NgModule } from '@angular/core';

import { Backend } from './backend';
import { BLEBackend } from './ble';
import { DemoBackend } from './demo';
import { SerialBackend } from './serial';

@NgModule({
  providers: [
    { provide: Backend, useClass: BLEBackend, multi: true },
    { provide: Backend, useClass: DemoBackend, multi: true },
    { provide: Backend, useClass: SerialBackend, multi: true }
  ]
})
export class BackendModule {}
