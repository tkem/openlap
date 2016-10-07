import { Injectable, Optional } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { LocalStorage } from './local-storage';
import { NativeStorage } from './native-storage';

@Injectable()
export class StorageConfig {
  prefix = null;
}

@Injectable()
export class Storage {

  private ready: Promise<LocalStorage | NativeStorage>;

  private subjects = new Map<string, ReplaySubject<any>>();

  constructor(@Optional() config: StorageConfig, platform: Platform) {
    this.ready = platform.ready().then(readySource => {
      if (readySource == 'cordova') {
        return new NativeStorage();
      } else {
        return new LocalStorage(config ? config.prefix : '');
      }
    });
  }

  get(key: string): Observable<any> {
    let subject = this.subjects.get(key);
    if (!subject) {
      this.subjects.set(key, subject = new ReplaySubject<any>(1));
      this.getItem(key).then(value => {
        subject.next(value);
      }).catch(error => {
        subject.error(error);
      });
    }
    return subject;
  }

  set(key: string, value: any): Promise<void> {
    return this.setItem(key, value).then(() => {
      const subject = this.subjects.get(key);
      if (subject) {
        subject.next(value);
      }
    });
  }

  remove(key: string): Promise<void> {
    return this.removeItem(key).then(() => {
      const subject = this.subjects.get(key);
      if (subject) {
        subject.next(null);
      }
    });
  }

  clear(): Promise<void> {
    return this.ready.then(storage => {
      return storage.clear();
    }).then(() => {
      this.subjects.forEach(subject => subject.next(null));
    });
  }

  private getItem(key: string): Promise<any> {
    return this.ready.then(storage => {
      return storage.getItem(key);
    });
  }

  private setItem(key: string, value: any): Promise<void> {
    return this.ready.then(storage => {
      if (value !== undefined && value !== null) {
        return storage.setItem(key, value);
      } else {
        return storage.removeItem(key);
      }
    })
  }

  private removeItem(key: string): Promise<void> {
    return this.ready.then(storage => {
      return storage.removeItem(key);
    });
  }
}
