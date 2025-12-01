import { Component, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { AppSettings, Options } from '../app-settings';
import { SpeechService } from '../services';


@Component({
    templateUrl: 'voice.page.html',
    standalone: false
})
export class VoicePage implements OnDestroy {

  options = new Options();

  voices = [];

  private subscription: any;

  constructor(private settings: AppSettings, private speech: SpeechService, private translate: TranslateService) {}

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe(options => {
      this.options = options;
      this.updateVoices();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetRate() {
    this.options.rate = 1000;
    this.update();
  }
  
  resetPitch() {
    this.options.pitch = 1000;
    this.update();
  }

  async update() {
    return this.settings.setOptions(this.options);
  }

  async test() {
    const example = this.translate.instant("notifications.example");
    this.speech.speak(example);
  }

  async updateVoices() {
    this.voices = await this.speech.getVoices(this.options.language);
  }
}
