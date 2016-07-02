export * from './backend';
export * from './ble';
export * from './demo';
export * from './serial';

import { BLEBackend } from './ble';
import { DemoBackend } from './demo';
import { SerialBackend } from './serial';

export const BACKENDS = [BLEBackend, DemoBackend, SerialBackend];
