import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface Peripheral {
  type: string; // 'ble' | 'serial' | 'demo';
  name: string;
  address?: any;
  connect(): Subject<ArrayBuffer>;
  equals(other: Peripheral);
}

export class Backend extends Observable<Peripheral> {
}
