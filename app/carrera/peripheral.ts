import { NextObserver } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

export interface Peripheral {
  type: string; // 'ble' | 'serial' | 'demo';
  name: string;
  address?: any;
  connect(connected?: NextObserver<void>, disconnected?: NextObserver<void>): Subject<ArrayBuffer>;
  equals(other: Peripheral);
}
