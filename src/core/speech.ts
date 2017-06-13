import { Injectable } from '@angular/core';

import { TextToSpeech } from '@ionic-native/text-to-speech';

import { Logger } from './logger';

@Injectable()
export class Speech {

  private locale = 'en-us';

  private promise = Promise.resolve();

  private pending = 0;

  private rate = 1.0;

  constructor(private tts: TextToSpeech, private logger: Logger) {}

  setLocale(locale: string) {
    this.locale = locale;
  }

  setRate(rate: number) {
    this.rate = rate;
  }

  speak(message: string) {
    // TODO: priorities?
    // TODO: returned promise vs. this.promise for chaining
    this.pending++;
    this.promise = this.promise.then(() => {
      if (--this.pending === 0) {
        return this.tts.speak({text: message, locale: this.locale || 'en-us', rate: this.rate || 1.0});
      } else {
        this.logger.warn('Speech cancelled', message);
      }
    }).catch((error) => {
      this.logger.error('Speech error', error);
    });
  }
}
