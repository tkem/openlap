import { Injectable } from '@angular/core';

import { Platform, ToastController } from 'ionic-angular';

import { Toast as NativeToast } from 'ionic-native';

interface ToastProvider {
  show(message: string, duration: number, position: 'top' | 'bottom' | 'center'): Promise<void>;
  hide(): Promise<void>;
}

class NativeToastProvider implements ToastProvider {
  show(message: string, duration: number, position: 'top' | 'bottom' | 'center') {
    return NativeToast.hide().then(() => {
      return new Promise<void>((resolve, reject) => {
        NativeToast.show(message, duration.toString(), position).subscribe(
          () => resolve(),
          error => reject(error)
        );
      });
    });
  }

  hide() {
    return NativeToast.hide();
  }
}

class IonicToastProvider implements ToastProvider {
  private dismissCurrentToast = () => Promise.resolve();

  constructor(private controller: ToastController) {}

  show(message: string, duration: number, position: 'top' | 'bottom' | 'center') {
    return this.dismissCurrentToast().then(() => {
      const toast = this.controller.create({
        message: message, 
        duration: duration,
        position: position === 'center' ? 'middle' : position, 
        showCloseButton: true
      });
      toast.onDidDismiss(() => {
        this.dismissCurrentToast = () => Promise.resolve();
      });
      this.dismissCurrentToast = () => toast.dismiss().then(() => { return });
      return toast.present();
    });
  }

  hide() {
    return this.dismissCurrentToast();
  }
}

@Injectable()
export class Toast {
  private toast: ToastProvider;

  constructor(platform: Platform, controller: ToastController) {
    this.toast = platform.is('cordova') ? new NativeToastProvider() : new IonicToastProvider(controller);
  }
 
  show(message: string, duration: number, position: 'top' | 'bottom' | 'center') {
    return this.toast.hide().then(() => {
      return this.toast.show(message, duration, position);
    });
  }

  showTop(message: string, duration: number) {
    return this.show(message, duration, 'top');
  }

  showBottom(message: string, duration: number) {
    return this.show(message, duration, 'bottom');
  }

  showCenter(message: string, duration: number) {
    return this.show(message, duration, 'center');
  }

  hide() {
    return this.toast.hide();
  }
}
