import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';

import { Insomnia, Splashscreen } from 'ionic-native';

import { BehaviorSubject, Subscription } from '../rxjs';

import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_SUBJECT, Settings } from '../core';
import { Logger } from '../logging';
import { RaceControlPage } from '../rms';
import { Toast } from '../shared';

@Component({
  templateUrl: 'root.html'
})
export class RootPage {}

@Component({
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit {
  
  @ViewChild(Nav) nav: Nav;

  rootPage = RootPage;  // FIXME: get rid of this!

  private subscription: Subscription;

  constructor(@Inject(CONTROL_UNIT_SUBJECT) public cu: BehaviorSubject<ControlUnit>,
              private logger: Logger, private settings: Settings,
              private platform: Platform, private toast: Toast)
  {
    settings.getOptions().subscribe((options) => {
      logger.setLevel(options.debug ? 'debug' : 'info');
    });
  }

  ngOnInit() {
    this.platform.ready().then(readySource => {
      this.logger.info('Initializing ' + readySource + ' application');
      Insomnia.keepAwake();
      Splashscreen.hide();
    });

    // TODO: move this to RaceControl?
    this.subscription = this.cu.filter((cu) => !!cu).do(cu => {
      this.nav.setRoot(RaceControlPage, { mode: 'practice', auto: true, pace: true });
    }).switchMap((cu: ControlUnit) => {
      return cu.getState().debounceTime(200).distinctUntilChanged().map(state => [state, cu.peripheral.name]);
    }).subscribe(([state, device]) => {
      switch (state) {
      case 'connected':
        this.toast.showCenter('Connected to ' + device, 2000);
        break;
      case 'connecting':
        this.toast.showCenter('Connecting to ' + device, 2000);
        break;
      case 'disconnected':
        this.toast.showCenter('Disconnected from ' + device, 5000);
        break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
