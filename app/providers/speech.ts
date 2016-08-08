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

    constructor(private logger: Logger) {}

    speak(s: string, args?: any) {
        this.promise = this.promise.then(() => {
            return TTS.speak(s.replace(RE, (match, p) => args[p]));
        }).catch((error) => {
            this.logger.error(error);
        });
    }
}
