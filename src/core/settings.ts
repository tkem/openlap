import { Inject, Injectable, OpaqueToken, Optional } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable, ReplaySubject } from '../rxjs';

export const DEFAULT_SETTINGS = new OpaqueToken('app.default.settings');

@Injectable()
export class Settings {

  private defaults = {};

  private subjects = {};

  constructor(private storage: Storage, @Optional() @Inject(DEFAULT_SETTINGS) defaults) {
    if (defaults) {
      this.defaults = defaults;
    }
  }

  get(key: string): Observable<any> {
    let subject = this.subjects[key];
    if (!subject) {
      subject = this.subjects[key] = new ReplaySubject<any>(1);
      this.storage.get(key).then(value => {
        subject.next(value !== null ? JSON.parse(value) : this.getDefault(key));
      }).catch(error => {
        subject.error(error);
      });
    }
    return subject;
  }

  set(key: string, value: any): any {
    return this.storage.set(key, JSON.stringify(value)).then(() => {
      const subject = this.subjects[key];
      if (subject) {
        subject.next(value);
      }
    });
  }

  remove(key: string): any {
    return this.storage.remove(key).then(() => {
      const subject = this.subjects[key];
      if (subject) {
        subject.next(this.getDefault(key));
      }
    });
  }

  clear() {
    return this.storage.clear().then(() => {
      for (let key of Object.keys(this.subjects)) {
        this.subjects[key].next(this.defaults[key]);
      }
    });
  }

  private getDefault(key: string) {
    const value = this.defaults[key];
    if (value !== undefined) {
      return JSON.parse(JSON.stringify(value));
    } else  {
      return value;
    }
  }
}
