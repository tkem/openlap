import { Component, NgZone, OnInit, Inject } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ControlUnit, Logger } from '../../providers';

import { Backend, Peripheral } from '../../backends';

import { MainPage } from '../../pages';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';

import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/scan';

@Component({
  templateUrl: 'build/pages/connection/connection.html'
})
export class ConnectionPage {

  items: Observable<Peripheral[]>;

  constructor(private cu: ControlUnit, private logger: Logger, private nav: NavController,
              @Inject(Backend) backends: Backend[])
  {
    this.items = ArrayObservable.create(backends).mergeAll().scan(
      (result, value) => result.concat(value), []
    );
  }

  onClick(item: Peripheral) {
    this.cu.connect(item);
    if (!this.nav.canGoBack()) {
      // TODO: wait for cu.state == 'connected'?
      this.nav.setRoot(MainPage);
    };
  }
}
