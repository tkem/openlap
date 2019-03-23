import { Injectable } from '@angular/core';

import { TextToSpeech } from '@ionic-native/text-to-speech';

import { Platform } from 'ionic-angular';

import { Logger } from './logger';

@Injectable()
export class Speech {

  private locale = 'en-us';

  private promise = Promise.resolve();

  private pending = 0;

  private rate: number;

  private lastMessage: string;

  constructor(private tts: TextToSpeech, private logger: Logger, platform: Platform) {
    // See https://github.com/vilic/cordova-plugin-tts/issues/40
    this.rate = platform.is('ios') ? 1.5 : 1.0;
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

  setRate(rate: number) {
    this.rate = rate;
  }

  speak(message: string) {
    // TODO: message priorities?
    if (message != this.lastMessage) {
      this.lastMessage = message;
      this.pending++;
      this.promise = this.promise.then(() => {
        if (--this.pending === 0) {
          return this.tts.speak({text: message, locale: this.locale || 'en-us', rate: this.rate}).then(() => {
            if (this.pending === 0) {
              this.lastMessage = null;
            }
          });
        } else {
          this.logger.warn('Speech cancelled: ' + message);
        }
      }).catch((error) => {
        this.logger.error('Speech error', error);
      });
    } else {
      this.logger.info('Speech duplicate dismissed: ' + message);
    }
  }
}
