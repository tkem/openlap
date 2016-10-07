export class LocalStorage {

  private prefix: string;

  constructor(prefix?: string) {
    this.prefix = prefix || '';
  }

  getItem(key: string) {
    return JSON.parse(window.localStorage.getItem(this.prefix + key));
  }

  setItem(key: string, value: any) {
    window.localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  removeItem(key: string) {
    window.localStorage.removeItem(this.prefix + key);
  }

  clear() {
    for (let key of this.keys()) {
      window.localStorage.removeItem(key);
    }
  }

  private keys(): Array<string> {
    let keys = []
    for (let i = 0, n = window.localStorage.length; i != n; ++i) {
      let key = window.localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        keys.push(key);
      }      
    }
    return keys;
  }
}
