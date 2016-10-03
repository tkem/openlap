import { Component, OnDestroy } from '@angular/core';

import { Settings, Speech } from '../core';

@Component({
  templateUrl: 'speech.page.html'
})
export class SpeechPage implements OnDestroy {

  options: any = {};

  private subscription: any;

  constructor(private settings: Settings, private speech: Speech) {}

  ngOnInit() {
    this.subscription = this.settings.get('speech').subscribe((options) => {
      this.options = options;
    });
  }

  ngOnDestroy() {
    this.settings.set('speech', this.options);
    this.subscription.unsubscribe();
  }

  speak(text) {
    this.speech.speak(text, {name: 'Driver'});
  }
}
