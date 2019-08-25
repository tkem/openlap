import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private subjects = new Map<string, ReplaySubject<any>>();

  constructor(private storage: Storage) {}

  async clear(): Promise<void> {
    await this.storage.ready();
    await this.storage.clear();
    this.subjects.forEach(subject => subject.next(undefined));
  }

  async get(key: string): Promise<any> {
    await this.storage.ready();
    const value = await this.storage.get(key);
    return value;
  }

  observe(key: string): Observable<any> {
    let subject = this.subjects.get(key);
    if (!subject) {
      subject = new ReplaySubject<any>(1);
      this.subjects.set(key, subject);
      this.storage.ready().then(() => {
        this.storage.get(key).then(value => {
          subject.next(value);
        }).catch(error => {
          subject.error(error);
        });
      });
    }
    return subject;
  }

  async remove(key: string): Promise<void> {
    await this.storage.ready();
    await this.storage.remove(key);
    const subject = this.subjects.get(key);
    if (subject) {
      subject.next(undefined);
    }
  }

  async set(key: string, value: any): Promise<void> {
    await this.storage.ready();
    await this.storage.set(key, value);
    const subject = this.subjects.get(key);
    if (subject) {
      subject.next(value);
    }
  }
}
