import { Injectable } from '@angular/core';

@Injectable()
export class Storage {

  private prefix: string;

  constructor(domain?: string) {
    this.prefix = domain ? domain + '.' : '';
  }

  get(key: string, fallback?: any) {
    return new Promise<any>((resolve, reject) => {
      try {
        let value = window.localStorage.getItem(this.prefix + key);
        console.log('Got value from localStorage: ', key, value);
        resolve(value !== null ? JSON.parse(value) : fallback);
      } catch (error) {
        reject(error);
      }
    });
  }

  set(key: string, value: any) {
    return new Promise<void>((resolve, reject) => {
      try {
        if (value !== undefined) {
          window.localStorage.setItem(this.prefix + key, JSON.stringify(value));
        } else {
          window.localStorage.removeItem(this.prefix + key);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(key: string) {
    return new Promise<void>((resolve, reject) => {
      try {
        window.localStorage.removeItem(this.prefix + key);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  clear() {
    return new Promise<void>((resolve, reject) => {
      try {
        if (this.prefix) {
          for (let key of this.keys()) {
            window.localStorage.removeItem(key);
          }
        } else {
          window.localStorage.clear();
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  private keys() {
    let keys = [];
    for (let i = 0; i != window.localStorage.length; ++i) {
      let key = window.localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        keys.push(key);
      }
    }
    return keys;
  }
}
