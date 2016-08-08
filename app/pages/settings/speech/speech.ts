import { Component, OnDestroy } from '@angular/core';

import { Speech, Storage } from '../../../providers';

@Component({
  templateUrl: 'build/pages/settings/speech/speech.html'
})
export class SpeechPage implements OnDestroy {

  items = [{
    label: 'Fastest lap',
    default: '{name}: Fastest lap!',
    text: ''
  }, {
    label: 'Race finished',
    default: '{name}: Good job!',
    text: ''
  }, {
    label: 'Low fuel',
    default: '{name}: Box! Box! Box!',
    text: ''
  }];

  constructor(private storage: Storage, private speech: Speech) {}

  ngOnDestroy() {
    this.storage.set('speech', {
      'bestlap': this.items[0].text || this.items[0].default,
      'finished': this.items[1].text || this.items[1].default,
      'lowfuel': this.items[2].text || this.items[2].default
    });
  }

  speak(text) {
    this.speech.speak(text, {name: 'Driver name'});
  }
}
