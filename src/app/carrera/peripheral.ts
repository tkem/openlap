import { NextObserver, Subject } from 'rxjs';

export interface Peripheral {
  type: string; // 'ble' | 'serial' | 'demo';
  name: string;
  address?: any;
  connect(connected?: NextObserver<void>, disconnected?: NextObserver<void>): Subject<ArrayBuffer>;
  equals(other: any);
}
