import { Component, OnDestroy } from '@angular/core';

import { Notification, Settings, Speech } from '../core';

@Component({
  templateUrl: 'notifications.page.html'
})
export class NotificationsPage implements OnDestroy {

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

  notifications: {[key: string]: Notification} = {};

  private subscription: any;

  constructor(private settings: Settings, private speech: Speech) {}

  ngOnInit() {
    this.subscription = this.settings.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  ngOnDestroy() {
    this.settings.setNotifications(this.notifications);
    this.subscription.unsubscribe();
  }

  speak(text) {
    this.speech.speak(text);
  }
}
