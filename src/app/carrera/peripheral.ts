import { NextObserver, Observable, Observer, Subject } from 'rxjs';

/**
 * Creates a Subject that delegates subscribe to a source Observable
 * and next/error/complete to a destination Observer.
 * Replaces the deprecated Subject.create().
 */
export function createSubject<T>(destination: Partial<Observer<T>>, source: Observable<T>): Subject<T> {
  const subject = new Subject<T>();
  subject.next = (value: T) => destination.next?.(value);
  subject.error = (err: any) => destination.error?.(err);
  subject.complete = () => destination.complete?.();
  (subject as any)._subscribe = (subscriber: any) => source.subscribe(subscriber);
  return subject;
}

export interface Peripheral {
  type: string; // 'ble' | 'serial' | 'demo';
  name: string;
  address?: any;
  connect(connected?: NextObserver<void>, disconnected?: NextObserver<void>): Subject<ArrayBuffer>;
  equals(other: any);
}
