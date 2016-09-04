import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';

import { DataView } from './data-view';
import { Peripheral } from './peripheral';

const CONNECTION_TIMEOUT = 5000;
const RECONNECT_DELAY = 2000;

const POLL_COMMAND = DataView.fromString('?');

export class ControlUnit {

  private connection: Subject<ArrayBuffer>;

  private subscription: Subscription;
  
  private requests = Array<DataView>();
  
  private data: ConnectableObservable<DataView>;

  private status: Observable<DataView>;

  private state = new BehaviorSubject<'disconnected' | 'connecting' | 'connected'>('disconnected');

  constructor(public peripheral: Peripheral) {
    this.connection = this.peripheral.connect({
      next: () => {
        this.connection.next(POLL_COMMAND.buffer);
      }
    }, {
      next: () => {
        this.state.next('disconnected');
      }
    });
    this.data = this.connection.timeout(CONNECTION_TIMEOUT).retryWhen(errors => {
      return errors.delay(RECONNECT_DELAY).do(() => {
        this.state.next('connecting');
      });
    }).do(() => {
      if (this.state.value !== 'connected') {
        this.state.next('connected');
      }
      this.poll();
    }).map((data) => {
      return new DataView(data);
    }).publish();
    // like publishBehavior() with no initial value
    this.status = this.data.filter((data) => {
      return data.toString(0, 2) === '?:';
    }).publishReplay(1).refCount();
  }

  connect() {
    this.state.next('connecting');
    this.subscription = this.data.connect();
  }

  disconnect() {
    if (this.subscription) {
      this.data.subscribe(
        () => console.log('Got value'),
        () => console.log('Got error'),
        () => console.log('Got complete')
      );
      this.subscription.unsubscribe();
    }
  }

  getState() {
    return this.state.asObservable();
  }

  getFuel() {
    return this.status.map((data: DataView) => data.getUint8Array(2, 8));
  }

  getStart() {
    return this.status.map((data: DataView) => data.getUint4(10));
  }

  getMode() {
    return this.status.map((data: DataView) => data.getUint4(11));
  }

  getPit() {
    return this.status.map((data: DataView) => data.getUint8(12));
  }

  getTimer() {
    return this.data.filter((view) => {
      return view.toString(0, 1) === '?' && view.toString(1, 1) !== ':';
    }).map((view) => {
      // TODO: check with new checklane
      return [view.getUint4(1) - 1, view.getUint32(2), view.getUint4(10) ];
    }).distinctUntilChanged(
      // guard against repeated timings
      (a, b) => a[0] === b[0] && a[1] === b[1]
    );
  }

  getVersion() {
    return Observable.create((subscriber) => {
      // TODO: timeout?
      this.data.filter((view) => {
        return view.toString(0, 1) == '0';
      }).map((view) => {
        return view.toString(1, 4);
      });
      this.requests.push(DataView.fromString('0'));
    });
  }

  reset() {
    this.requests.push(DataView.fromString('=10'));
  }

  toggleStart() {
    this.requests.push(DataView.fromString('T2'));
  }

  setLap(value: number) {
    this.setLapHi(value >> 4);
    this.setLapLo(value & 0xf);
  }

  setLapHi(value: number) {
    this.set(17, 7, value);
  }

  setLapLo(value: number) {
    this.set(18, 7, value);
  }

  setPosition(id: number, pos: number) {
    this.set(6, id, pos);
  }

  clearPosition() {
    this.set(6, 0, 9);
  }

  setMask(value: number) {
    this.requests.push(DataView.from(':', value & 0xf, value >> 4));
  }

  setSpeed(id: number, value: number) {
    this.set(0, id, value, 2);
  }

  setBrake(id: number, value: number) {
    this.set(1, id, value, 2);
  }

  setFuel(id: number, value: number) {
    this.set(2, id, value, 2);
  }

  private set(address: number, id: number, value: number, repeat = 1) {
    const args = [address & 0x0f, (address >> 4) | (id << 1), value, repeat];
    this.requests.push(DataView.from('J', ...args));
  }

  private poll() {
    const request = this.requests.shift() || POLL_COMMAND;
    this.connection.next(request.buffer);
  }
}
