import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable, ReplaySubject } from 'rxjs';

import { Peripheral } from '../carrera';

const COLORS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ffffff',
  '#cccccc'
];

const NOTIFICATIONS = {
  falsestart: true,
  finished: true,
  finallap: true,
  bestlap: true,
  fuel2: true,
  fuel1: true,
  fuel0: true,
  pitenter: false,
  pitexit: false
};

export class Options {
  debug = false;
  fixedorder = false;
  fullscreen = false;
  language = '';
  speech = true;
}

export interface Notification {
  enabled: boolean;
  message?: string;
}

export interface Driver {
  name?: string;
  code?: string;
  color: string;
}

export class RaceOptions {
  constructor(public mode: 'practice' | 'qualifying' | 'race') {
    switch (mode) {
    case 'practice':
      this.laps = 0;
      this.time = 0;
      break;
    case 'qualifying':
      this.laps = 0;
      this.time = 3 * 60 * 1000;
      break;
    case 'race':
      this.laps = 30;
      this.time = 0;
      break;
    }
  }
  laps: number;
  time: number;
  pause: false;
  slotmode = false;
  drivers?: number;
  auto = false;
  pace = false;
}

@Injectable()
export class Settings {

  private subjects = new Map<string, ReplaySubject<any>>();

  constructor(private storage: Storage) {
    // TODO: setDriver('localStorageWrapper');
  }

  clear(): Promise<void> {
    return this.storage.ready().then(() => {
      this.storage.clear().then(() => {
        this.subjects.forEach(subject => subject.next(null));
      });
    });
  }

  getConnection(): Observable<any> {
    return this.get('connection');
  }

  setConnection(value: Peripheral) {
    return this.set('connection', {
      type: value.type,
      name: value.name,
      address: value.address
    });
  }

  getDrivers(): Observable<Array<Driver>> {
    return this.get('drivers').map(value => {
      const result = new Array<Driver>(8);
      for (let i = 0; i != result.length; ++i) {
        result[i] = Object.assign({color: COLORS[i]}, value ? value[i] : null);
      }
      return result;
    });
  }

  setDrivers(value: Array<Driver>): Promise<void> {
    return this.set('drivers', value);
  }

  getNotifications(): Observable<{[key: string]: Notification}> {
    return this.get('notifications').map(value => {
      const result = {};
      for (let key of Object.keys(NOTIFICATIONS)) {
        result[key] = Object.assign({enabled: NOTIFICATIONS[key]}, value ? value[key] : null);
      }
      return result;
    });
  }

  setNotifications(value: {[key: string]: Notification}): Promise<void> {
    return this.set('notifications', value);
  }

  getOptions(): Observable<Options> {
    return this.get('options').map(value => {
      return Object.assign(new Options(), value);
    });
  }

  setOptions(value: Options): Promise<void> {
    return this.set('options', value);
  }

  getQualifyingSettings(): Observable<RaceOptions> {
    return this.get('qualifying').map(value => {
      return Object.assign(new RaceOptions('qualifying'), value);
    });
  }

  setQualifyingSettings(value: any): Promise<void> {
    return this.set('qualifying', value);
  }

  getRaceSettings(): Observable<RaceOptions> {
    return this.get('race').map(value => {
      return Object.assign(new RaceOptions('race'), value);
    });
  }

  setRaceSettings(value: any): Promise<void> {
    return this.set('race', value);
  }

  private get(key: string): Observable<any> {
    let subject = this.subjects.get(key);
    if (!subject) {
      this.subjects.set(key, subject = new ReplaySubject<any>(1));
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

  private set(key: string, value: any): Promise<void> {
    return this.storage.ready().then(() => {
      return this.storage.set(key, value).then(() => {
        const subject = this.subjects.get(key);
        if (subject) {
          subject.next(value);
        }
      });
    }).then(() => {
      // convert to void
      return;
    });
  }
}
