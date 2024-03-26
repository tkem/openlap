import { Injectable } from '@angular/core';

import { TextToSpeechAdvanced, TTSOptions, TTSVoice } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';

import { Platform } from '@ionic/angular';

import { LoggingService } from './logging.service';

class WebSpeech {

  private voices = new Map<string, SpeechSynthesisVoice>();

  constructor(private speech: SpeechSynthesis, logger: LoggingService) {
    logger.info('Using Web Speech API');
  }

  private getVoiceMap() {
    // TODO: speech.getVoices() may not be available at initialization?
    if (!this.voices.size) {
      this.speech.getVoices().forEach(voice => {
        this.voices.set(voice.voiceURI, voice);
      });
    }
    return this.voices;
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
        utterance.pitch = textOrOptions.pitch;
        utterance.voice = this.getVoiceMap().get(textOrOptions.identifier);
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
    return Promise.resolve(Array.from(this.getVoiceMap(), ([_, value]) => value).map(v => <TTSVoice>{
      name: v.name,
      language: v.lang,
      identifier: v.voiceURI
    }));
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

  private pitch = 1.0;

  private voice: string;

  private lastMessage: string;

  constructor(private logger: LoggingService, private tts: TextToSpeechAdvanced, platform: Platform) {
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

  setPitch(pitch: number) {
    this.pitch = pitch;
  }
  
  setVoice(voice: string) {
    this.voice = voice;
  }

  speak(message: string) {
    // TODO: message priorities?
    if (message != this.lastMessage) {
      this.lastMessage = message;
      this.pending++;
      this.promise = this.promise.then(() => {
        if (--this.pending === 0) {
          return this.tts.speak({
            text: message,
            locale: this.locale || 'en-us',
            rate: this.rate,
            pitch: this.pitch,
            identifier: this.voice || null
          }).then(() => {
            if (this.pending === 0) {
              this.lastMessage = null;
            }
          }).catch((error) => {
            this.logger.error('Speech error:', error);
            if (this.pending === 0) {
              this.lastMessage = null;
            }
          });
        } else {
          this.logger.warn('Speech cancelled: ' + message);
          return Promise.resolve();
        }
      }).catch((error) => {
        this.logger.error('Speech error:', error);
      });
    } else {
      this.logger.info('Speech duplicate dismissed: ' + message);
    }
  }

  getVoices(language: string) {
    return this.tts.getVoices().then(voices => {
      voices = voices.filter(v => v.language.startsWith(language));
      // Android does not provide user-friendly names for voices, see
      // https://github.com/spasma/cordova-plugin-tts-advanced/issues/7
      // we also filter the "*-network" voices on Android, since they 
      // seem to be mostly duplicates, anyway
      voices = voices.filter(v => !v.name.endsWith("-network"));
      return voices.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));
    });
  }
}
