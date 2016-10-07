import { NativeStorage as NativeStoragePlugin } from 'ionic-native';

export class NativeStorage {
  getItem(key: string) {
    return NativeStoragePlugin.getItem(key).catch(error => {
      if (error.code === 2) {
        return null;
      } else {
        throw error;
      }
    });
  }

  setItem(key: string, value: any) {
    return NativeStoragePlugin.setItem(key, value);
  }

  removeItem(key: string) {
    return NativeStoragePlugin.remove(key);
  }

  clear() {
    return NativeStoragePlugin.clear();
  }
}
