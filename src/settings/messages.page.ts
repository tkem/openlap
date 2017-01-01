import { Component, OnDestroy } from '@angular/core';

import { Message, Settings, Speech } from '../core';

@Component({
  templateUrl: 'messages.page.html'
})
export class MessagesPage implements OnDestroy {

  items = [{
    id: 'finished',
    label: 'Race finished'
  }, {
    id: 'finallap',
    label: 'Final lap'
  }, {
    id: 'falsestart',
    label: 'False start'
  }, {
    id: 'bestlap',
    label: 'Fastest lap'
  }, {
    id: 'fuel2',
    label: 'Fuel < 20%'
  }, {
    id: 'fuel1',
    label: 'Fuel < 10%'
  }, {
    id: 'fuel0',
    label: 'No fuel'
  }, {
    id: 'pitenter',
    label: 'Car enters pit'
  }];

  messages: {[key: string]: Message} = {};

  private subscription: any;

  constructor(private settings: Settings, private speech: Speech) {}

  ngOnInit() {
    this.subscription = this.settings.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.settings.setMessages(this.messages);
    this.subscription.unsubscribe();
  }

  speak(text) {
    this.speech.speak(text);
  }
}
