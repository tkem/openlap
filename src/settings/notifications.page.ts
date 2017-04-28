import { Component, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

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
    id: 'yellowflag',
    label: 'Yellow flag'
  }, {
    id: 'greenflag',
    label: 'Track clear'
  }, {
    id: 'falsestart',
    label: 'False start'
  }, {
    id: 'bestlap',
    label: 'Fastest lap',
  }, {
    id: 'bests1',
    label: 'Fastest sector 1',
  }, {
    id: 'bests2',
    label: 'Fastest sector 2',
  }, {
    id: 'bests3',
    label: 'Fastest sector 3',
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
  }, {
    id: 'pitexit',
    label: 'Car leaves pit'
  }];

  notifications: {[key: string]: Notification} = {};

  private subscription: any;

  constructor(private settings: Settings, private speech: Speech, private translate: TranslateService) {}

  ngOnInit() {
    this.subscription = this.settings.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  ngOnDestroy() {
    this.settings.setNotifications(this.notifications);
    this.subscription.unsubscribe();
  }

  speak(id: string) {
    this.getMessage(id).then(message => {
      this.speech.speak(message);
    })
  }

  private getMessage(id) {
    if (this.notifications[id] && this.notifications[id].message) {
      return Promise.resolve(this.notifications[id].message);
    } else {
      return this.translate.get('notifications.' + id).toPromise();
    }
  }
}
