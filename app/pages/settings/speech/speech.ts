import { Component, OnDestroy } from '@angular/core';

import { Settings, Speech } from '../../../providers';

@Component({
  templateUrl: 'build/pages/settings/speech/speech.html'
})
export class SpeechPage implements OnDestroy {

  items = [];

  constructor(private settings: Settings, private speech: Speech) {}

  ngOnInit() {
    this.settings.get('speech').subscribe((value) => {
      this.items = [{
        label: 'Fastest lap',
        default: '{name}: Fastest lap!',
        text: value.bestlap
      }, {
        label: 'Race finished',
        default: '{name}: Good!',
        text: value.finished
      }, {
        label: 'Low fuel',
        default: '{name}: Box!',
        text: value.lowfuel
      }];
    });
  }

  ngOnDestroy() {
    this.settings.set('speech', {
      'bestlap': this.items[0].text || this.items[0].default,
      'finished': this.items[1].text || this.items[1].default,
      'lowfuel': this.items[2].text || this.items[2].default
    });
  }

  speak(text) {
    this.speech.speak(text, {name: 'Driver name'});
  }
}
