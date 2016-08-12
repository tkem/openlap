import { Injectable } from '@angular/core';

import { Cordova, Plugin } from 'ionic-native';

import { Logger } from './logger';

@Plugin({
  plugin: 'cordova-plugin-tts',
  pluginRef: 'TTS',
  repo: 'https://github.com/vilic/cordova-plugin-tts',
  platforms: ['Android']
})
class TTS {
  @Cordova()
  static speak(args: string | any): Promise<any> { return; }
}

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
        return TTS.speak(str);
      } else {
        this.logger.warn('Speech cancelled', str);
      }
    }).catch((error) => {
      this.logger.error('Speech error', error);
    });
  }
}
