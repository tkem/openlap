import { Injectable } from '@angular/core';

import { TextToSpeech } from '@ionic-native/text-to-speech';

import { Logger } from '../logging';

@Injectable()
export class Speech {

  private promise = Promise.resolve();

  private pending = 0;

  constructor(private tts: TextToSpeech, private logger: Logger) {}

  speak(message: string) {
    // TODO: priorities?
    // TODO: returned promise vs. this.promise for chaining
    this.pending++;
    this.promise = this.promise.then(() => {
      if (--this.pending === 0) {
        this.logger.debug('Speak ', message);
        return this.tts.speak(message);
      } else {
        this.logger.debug('Speech cancelled', message);
      }
    }).catch((error) => {
      this.logger.error('Speech error', error);
    });
  }
}
