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

const MESSAGES = {
  falsestart: 'False start!',
  finished: 'Race finished!',
  finallap: 'Final lap!',
  bestlap: 'Fastest lap!',
  fuel2: 'Low fuel!',
  fuel1: 'Box!',
  fuel0: 'Box! Box! Box!'
};

export class Options {
  debug = false;
  speech = true;
}

export class Driver {
  constructor(id: number) {
    Object.assign(this, DRIVERS[id]);
  }
  name: string;
  code: string;
  color: string;
}

export class RaceSettings {
  constructor(public mode: 'practice' | 'qualifying' | 'race') {}
  laps: number;
  time: number;
  auto = false;
  pace = false;
  slotmode = false;
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
    return this.get('drivers').map(values => {
      const drivers = new Array<Driver>(8);
      for (let i = 0; i != drivers.length; ++i) {
        drivers[i] = Object.assign(new Driver(i), values ? values[i] : null);
      }
      return drivers;
    });
  }

  setDrivers(value: Array<Driver>): Promise<void> {
    return this.set('drivers', value);
  }

  getMessages(): Observable<{[key: string]: string}> {
    return this.get('messages').map(values => {
      return Object.assign({}, MESSAGES, values);
    });
  }

  setMessages(value: {[key: string]: string}): Promise<void> {
    return this.set('messages', value);
  }

  getOptions(): Observable<Options> {
    return this.get('options').map(value => {
      return Object.assign(new Options(), value);
    });
  }

  setOptions(value: Options): Promise<void> {
    return this.set('options', value);
  }

  getQualifyingSettings(): Observable<RaceSettings> {
    return this.get('qualifying').map(value => {
      return Object.assign(new RaceSettings('qualifying'), value);
    });
  }

  setQualifyingSettings(value: any): Promise<void> {
    return this.set('qualifying', value);
  }

  getRaceSettings(): Observable<RaceSettings> {
    return this.get('race').map(value => {
      return Object.assign(new RaceSettings('race'), value);
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
