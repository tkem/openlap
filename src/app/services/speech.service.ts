import { Injectable } from '@angular/core';

import { TextToSpeechAdvanced, TTSOptions, TTSVoice } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';

import { Platform } from '@ionic/angular';

import { LoggingService } from './logging.service';

class WebSpeech {
  constructor(private speech: SpeechSynthesis, logger: LoggingService) {
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

  getVoices(): Promise<TTSVoice[]> {
    return Promise.resolve([]);
  }
}

class DummySpeech {
  constructor(logger: LoggingService) {
    logger.info('Speech not supported on this platform');
  }

  speak(textOrOptions: string | TTSOptions): Promise<void> {
    return Promise.resolve();
  }

  stop(): Promise<void> {
    return Promise.resolve();
  }

  getVoices(): Promise<TTSVoice[]> {
    return Promise.resolve([]);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private locale = 'en-US';

  private promise = Promise.resolve();

  private pending = 0;

  private rate = 1.0;

  private lastMessage: string;

  constructor(private tts: TextToSpeechAdvanced, private logger: LoggingService, platform: Platform) {
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
          // FIXME: identifier?
          return this.tts.speak({text: message, locale: this.locale || 'en-us', rate: this.rate, identifier: ""}).then(() => {
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
