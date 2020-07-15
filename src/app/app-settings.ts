import { Injectable } from '@angular/core';

import { SettingsService } from './services/settings.service';

import { map } from 'rxjs/operators';

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
  bests1: false,
  bests2: false,
  bests3: false,
  fuel2: true,
  fuel1: true,
  fuel0: true,
  pitenter: false,
  pitexit: false,
  yellowflag: true,
  greenflag: true
};

export class Connection {
  type: string;
  name: string;
  address?: string;
  connectionTimeout = 3000;
  requestTimeout = 2000;
  minReconnectDelay = 3000;
  maxReconnectDelay = 8000;
}

export class Options {
  cumode = true;
  debug = false;
  fixedorder = false;
  language = '';
  speech = true;
  sectors = false;
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
      this.auto = true;
      this.pace = true;
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
  minLapTime = 500;  // FIXME: Configurable?
}

@Injectable({
  providedIn: 'root'
})
export class AppSettings {

  constructor(private settings: SettingsService) {}

  clear() {
    return this.settings.clear();
  }

  getConnection() {
    return this.settings.observe('connection').pipe(
      map(value => Object.assign(new Connection(), value))
    );
  }

  setConnection(value: Connection) {
    return this.settings.set('connection', value);
  }

  getDrivers() {
    return this.settings.observe('drivers').pipe(
      map(value => {
        const result = new Array<Driver>(8);
        for (let i = 0; i != result.length; ++i) {
          result[i] = Object.assign({color: COLORS[i]}, value ? value[i] : null);
        }
        return result;
      })
    );
  }

  setDrivers(value: Array<Driver>) {
    return this.settings.set('drivers', value);
  }

  getNotifications() {
    return this.settings.observe('notifications').pipe(
      map(value => {
        const result = {};
        for (let key of Object.keys(NOTIFICATIONS)) {
          result[key] = Object.assign({enabled: NOTIFICATIONS[key]}, value ? value[key] : null);
        }
        return result;
      })
    );
  }

  setNotifications(value: {[key: string]: Notification}) {
    return this.settings.set('notifications', value);
  }

  getOptions() {
    return this.settings.observe('options').pipe(
      map(value => Object.assign(new Options(), value))
    );
  }

  setOptions(value: Options) {
    return this.settings.set('options', value);
  }

  getQualifyingSettings() {
    return this.settings.observe('qualifying').pipe(
      map(value => Object.assign(new RaceOptions('qualifying'), value))
    );
  }

  setQualifyingSettings(value: any) {
    return this.settings.set('qualifying', value);
  }

  getRaceSettings() {
    return this.settings.observe('race').pipe(
      map(value => Object.assign(new RaceOptions('race'), value))
    );
  }

  setRaceSettings(value: any) {
    return this.settings.set('race', value);
  }
}
