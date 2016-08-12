import { Component, OnDestroy } from '@angular/core';

import { Settings, Speech } from '../../../providers';

const DEFAULT_SPEECH = {
  enabled: false,
  'bestlap': '{name}: Fastest lap!',
  'finished': '{name}: Good job!',
  'lowfuel': '{name}: Box! Box! Box!'
};

@Component({
  templateUrl: 'build/pages/settings/speech/speech.html'
})
export class SpeechPage implements OnDestroy {

  options = {};

  private subscription: any;

  constructor(private settings: Settings, private speech: Speech) {}

  ngOnInit() {
    this.subscription = this.settings.get('speech', DEFAULT_SPEECH).subscribe((options) => {
      this.options = options;
    });
  }

  ngOnDestroy() {
    this.settings.set('speech', this.options);
    this.subscription.unsubscribe();
  }

  speak(text) {
    this.speech.speak(text, {name: 'Driver name'});
  }
}
