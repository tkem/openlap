import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';

import { Cordova, Insomnia, Plugin, Splashscreen } from 'ionic-native';

import { ArrayObservable, BehaviorSubject, Subscription } from '../rxjs';

import { Backend } from '../backend';
import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_SUBJECT, Settings } from '../core';
import { Logger } from '../logging';
import { RaceControlPage } from '../rms';
import { Toast } from '../shared';

const CONNECTION_TIMEOUT = 3000;

@Plugin({
  plugin: 'cordova-plugin-fullscreen',
  pluginName: 'AndroidFullScreen',
  pluginRef: 'AndroidFullScreen',
  repo: 'https://github.com/mesmotronic/cordova-plugin-fullscreen',
  platforms: ['Android']
})
class AndroidFullScreen {

  @Cordova()
  static isSupported(): Promise<void> { return; }

  @Cordova()
  static showSystemUI(): Promise<void> { return; }

  @Cordova()
  static immersiveMode(): Promise<void> { return; }
}

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
              @Inject(Backend) private backends: Backend[],
              private logger: Logger, private settings: Settings,
              private platform: Platform, private toast: Toast)
  {}

  ngOnInit() {
    this.platform.ready().then(readySource => {
      this.logger.info('Initializing ' + readySource + ' application');
      if (readySource === 'cordova') {
        Insomnia.keepAwake();
      }
      this.settings.getOptions().subscribe(options => {
        this.logger.setLevel(options.debug ? 'debug' : 'info');
        AndroidFullScreen.isSupported().then(() => {
          if (options.fullscreen) {
            return AndroidFullScreen.immersiveMode();
          } else {
            return AndroidFullScreen.showSystemUI();
          }
        }).catch(error => {
          this.logger.error('Fullscreen error: ', error);
        });
      });
      this.settings.getConnection().subscribe(connection => {
        if (this.cu.value) {
          this.cu.value.disconnect();
        }
        if (connection) {
          this.logger.info('Connecting to ' + connection.name);
          ArrayObservable.create(this.backends.map(backend => backend.scan())).mergeAll().filter(device => {
            return device.equals(connection);
          }).timeout(CONNECTION_TIMEOUT).first().toPromise().then(device => {
            const cu = new ControlUnit(device);
            this.cu.next(cu);
            cu.connect();
          }).catch(error => {
            this.logger.warn('Error connecting to ' + connection.name + ':', error);
          }).then(() => {
            this.setRoot(RaceControlPage, { mode: 'practice', auto: true, pace: true });
          });
        } else {
          this.logger.info('No connection set');
          this.cu.next(null);
          this.setRoot(this.rootPage);
        }
      });
    });

    // TODO: move this to RaceControl?
    this.subscription = this.cu.filter((cu) => !!cu).switchMap((cu: ControlUnit) => {
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

  private setRoot(page: Component, params?: any) {
    this.nav.setRoot(page, params).then(() => {
      Splashscreen.hide();
    });
  }
}
