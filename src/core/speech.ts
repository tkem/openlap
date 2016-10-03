import { Injectable } from '@angular/core';

import { TextToSpeech } from 'ionic-native';

import { Logger } from '../logging';

const RE = /{(name)}/g;

@Injectable()
export class Speech {

  private promise = Promise.resolve();

  private pending = 0;

  constructor(private logger: Logger) {}

  speak(message: string, args?: any) {
    // TODO: priorities?
    // TODO: remove regexp/args-handling from this!
    // TODO: returned promise vs. this.promise for chaining
    const str = message.replace(RE, (match, p) => args[p]);
    this.pending++;
    this.promise = this.promise.then(() => {
      if (--this.pending === 0) {
        this.logger.info('Speak ', str);
        return TextToSpeech.speak(str);
      } else {
        this.logger.warn('Speech cancelled', str);
      }
    }).catch((error) => {
      this.logger.error('Speech error', error);
    });
  }
}
