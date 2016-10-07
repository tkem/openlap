import { Component, OnDestroy } from '@angular/core';

import { Options, Settings, Speech } from '../core';

@Component({
  templateUrl: 'speech.page.html'
})
export class SpeechPage implements OnDestroy {

  options = new Options();

  messages: any = {};

  private subscription1: any;

  private subscription2: any;

  constructor(private settings: Settings, private speech: Speech) {}

  ngOnInit() {
    this.subscription1 = this.settings.getOptions().subscribe((options) => {
      this.options = options;
    });
    this.subscription2 = this.settings.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.settings.setOptions(this.options);
    this.settings.setMessages(this.messages);
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  speak(text) {
    this.speech.speak(text, {name: 'Driver'});
  }
}
