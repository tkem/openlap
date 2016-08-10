import { Injectable } from '@angular/core';

import { Storage } from './storage';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Settings {

  private subjects = {};

  constructor(private storage: Storage) {}

  get(key: string): Observable<any> {
    if (key in this.subjects) {
      return this.subjects[key].asObservable();
    } else {
      const subject = this.subjects[key] = new BehaviorSubject<any>(null);
      this.storage.get(key).then((value) => {
        subject.next(value);
      }).catch((error) => {
        subject.error(error);
      });
      return subject.asObservable();
    }
  }

  set(key: string, value: any): Promise<void> {
    console.log('New settings: ', key, value);
    return this.storage.set(key, value).then(() => {
      const subject = this.subjects[key];
      if (subject) {
        subject.next(value);
      }
    });
  }

  clear() {
    return this.storage.clear().then(() => {
      for (let key of Object.keys(this.subjects)) {
        this.subjects[key].next(null);
      }
    });
  }
}
