import { Subject } from 'rxjs/Subject';
import { NextObserver } from 'rxjs/Observer';

export interface Backend {
  connect(id?: string, connected?: NextObserver<void>): Subject<ArrayBuffer>;
}
