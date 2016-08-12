import { Injectable } from '@angular/core';

import { Storage } from './storage';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Settings {

  private subjects = {};

  constructor(private storage: Storage) {}

  get(key: string, fallback?: any): Observable<any> {
    if (key in this.subjects) {
      return this.subjects[key].map((value) => value === undefined ? fallback : value);
    } else {
      const subject = this.subjects[key] = new BehaviorSubject<any>(undefined);
      this.storage.get(key).then((value) => {
        console.log(key, value, fallback);
        subject.next(value);
      }).catch((error) => {
        subject.error(error);
      });
      return subject.map((value) => value === undefined ? fallback : value);
    }
  }

  set(key: string, value: any): Promise<void> {
    console.log('Update settings: ', key, value);
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
