import { Injectable } from '@angular/core';

import { Storage } from '../storage';

import { Observable } from '../rxjs';

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
  bestlap: '{name}: Fastest lap!',
  fuel2: '{name}: Low fuel!',
  fuel1: '{name}: Box!',
  fuel0: '{name}: Box! Box! Box!'
};

export class Options {
  debug = false;
  speech = false;
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

  constructor(private storage: Storage) {
  }

  getOptions(): Observable<Options> {
    return this.storage.get('options').map(value => {
      return Object.assign(new Options(), value);
    });
  }

  setOptions(value: Options): Promise<void> {
    return this.storage.set('options', value);
  }

  getDrivers(): Observable<Array<Driver>> {
    return this.storage.get('drivers').map(values => {
      const drivers = new Array<Driver>(8);
      for (let i = 0; i != drivers.length; ++i) {
        drivers[i] = Object.assign(new Driver(i), values ? values[i] : null);
      }
      return drivers;
    });
  }

  setDrivers(value: Array<Driver>): Promise<void> {
    return this.storage.set('drivers', value);
  }

  getMessages(): Observable<{[key: string]: string}> {
    return this.storage.get('messages').map(values => {
      return Object.assign({}, MESSAGES, values);
    });
  }

  setMessages(value: {[key: string]: string}): Promise<void> {
    return this.storage.set('messages', value);
  }

  getQualifyingSettings(): Observable<RaceSettings> {
    return this.storage.get('qualifying').map(value => {
      return Object.assign(new RaceSettings('qualifying'), value);
    });
  }

  setQualifyingSettings(value: any): Promise<void> {
    return this.storage.set('qualifying', value);
  }

  getRaceSettings(): Observable<RaceSettings> {
    return this.storage.get('race').map(value => {
      return Object.assign(new RaceSettings('race'), value);
    });
  }

  setRaceSettings(value: any): Promise<void> {
    return this.storage.set('race', value);
  }

  clear(): Promise<void> {
    return this.storage.clear();
  }
}
