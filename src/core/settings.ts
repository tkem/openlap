import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable, ReplaySubject } from 'rxjs';

import { Peripheral } from '../carrera';

const DRIVERS = [
  { name: 'Driver #1', code: '#1', color: '#ff0000' },
  { name: 'Driver #2', code: '#2', color: '#0000ff' },
  { name: 'Driver #3', code: '#3', color: '#ffff00' },
  { name: 'Driver #4', code: '#4', color: '#00ff00' },
  { name: 'Driver #5', code: '#5', color: '#808080' },
  { name: 'Driver #6', code: '#6', color: '#202020' },
  { name: 'Autonomous Car', code: 'AUT', color: '#870275' },
  { name: 'Pace Car', code: 'PAC', color: '#00fbff' }
];

const NOTIFICATIONS = {
  falsestart: {
    enabled: true,
    text: 'False start!'
  },
  finished: {
    enabled: true,
    text: 'Race finished!'
  },
  finallap: {
    enabled: true,
    text: 'Final lap!'
  },
  bestlap: {
    enabled: true,
    text: 'Fastest lap!'
  },
  fuel2: {
    enabled: true,
    text: 'Prepare to box!'
  },
  fuel1: {
    enabled: true,
    text: 'Box, please box!'
  },
  fuel0: {
    enabled: true,
    text: 'Box this lap!'
  },
  pitenter: {
    enabled: false,
    text: 'In pit!'
  }
};

export class Options {
  debug = false;
  finishedlaps = true;
  fixedorder = false;
  fullscreen = false;
  language = '';
  speech = true;
}

export class Notification {
  constructor(id: string) {
    Object.assign(this, NOTIFICATIONS[id]);
  }
  enabled: boolean;
  text: string;
}

export class Driver {
  constructor(id: number) {
    Object.assign(this, DRIVERS[id]);
  }
  name: string;
  code: string;
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
    return this.storage.clear().then(() => {
      this.subjects.forEach(subject => subject.next(null));
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
        result[i] = Object.assign(new Driver(i), value ? value[i] : null);
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
        result[key] = Object.assign(new Notification(key), value ? value[key] : null);
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
      this.storage.get(key).then(value => {
        subject.next(value);
      }).catch(error => {
        subject.error(error);
      });
    }
    return subject;
  }

  private set(key: string, value: any): Promise<void> {
    return this.storage.set(key, value).then(() => {
      const subject = this.subjects.get(key);
      if (subject) {
        subject.next(value);
      }
    });
  }
}
