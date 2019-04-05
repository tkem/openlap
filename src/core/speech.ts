import { Injectable } from '@angular/core';

import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech';

import { Platform } from 'ionic-angular';

import { Logger } from './logger';

class WebSpeech {
  constructor(private speech: SpeechSynthesis, logger: Logger) {
    logger.debug('Using Web Speech API');
  }

  speak(textOrOptions: string | TTSOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const utterance = this['__utterance__'] = new SpeechSynthesisUtterance();
      if (typeof textOrOptions === 'string') {
        utterance.text = textOrOptions;
      } else {
        utterance.text = textOrOptions.text;
        utterance.lang = textOrOptions.locale;
        utterance.rate = textOrOptions.rate;
      }
      utterance.onend = () => {
        resolve();
      };
      utterance.onerror = e => {
        reject(e);
      }
      try {
        this.speech.speak(utterance);
      } catch (e) {
        reject(e);
      }
    });
  }

  stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.speech.cancel();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}

class DummySpeech {
  constructor(logger: Logger) {
    logger.info('Speech not supported on this platform');
  }

  speak(textOrOptions: string | TTSOptions): Promise<void> {
    return Promise.resolve();
  }

  stop(): Promise<void> {
    return Promise.resolve();
  }
}

@Injectable()
export class Speech {

  private locale = 'en-US';

  private promise = Promise.resolve();

  private pending = 0;

  private rate = 1.0;

  private lastMessage: string;

  constructor(private tts: TextToSpeech, private logger: Logger, platform: Platform) {
    if (platform.is('cordova')) {
      // See https://github.com/vilic/cordova-plugin-tts/issues/40
      this.rate = platform.is('ios') ? 1.5 : 1.0;
    } else if (window.speechSynthesis) {
      this.tts = new WebSpeech(window.speechSynthesis, logger);
    } else {
      this.tts = new DummySpeech(logger);
    }
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
