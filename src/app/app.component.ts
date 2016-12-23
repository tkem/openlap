import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';

import { Cordova, Insomnia, Plugin, Splashscreen } from 'ionic-native';

import { TranslateService } from 'ng2-translate';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Backend } from '../backend';
import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_SUBJECT, Settings, Toast } from '../core';
import { Logger } from '../logging';
import { RaceControlPage } from '../rms';

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
              private platform: Platform, private toast: Toast,
              private translate: TranslateService)
  {
    translate.setDefaultLang('en');
  }

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
        this.translate.use(options.language || this.translate.getBrowserLang() || 'en');
      });
      this.settings.getConnection().subscribe(connection => {
        if (this.cu.value) {
          this.cu.value.disconnect();
        }
        if (connection) {
          this.logger.info('Connecting to ' + connection.name);
          Observable.from(this.backends.map(backend => backend.scan())).mergeAll().filter(device => {
            return device.equals(connection);
          }).timeout(CONNECTION_TIMEOUT).first().toPromise().then(device => {
            const cu = new ControlUnit(device);
            this.cu.next(cu);
            cu.connect();
          }).then(() => {
            this.setRoot(RaceControlPage, { mode: 'practice', auto: true, pace: true });
          }).catch(error => {
            this.logger.warn('Error connecting to ' + connection.name + ':', error);
            this.setRoot(this.rootPage);
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
        this.showConnectionToast('Connected to {{device}}', device);
        break;
      case 'connecting':
        this.showConnectionToast('Connecting to {{device}}', device);
        break;
      case 'disconnected':
        this.showConnectionToast('Disconnected from {{device}}', device);
        break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setRoot(page: Component, params?: any) {
    console.log('Setting root page');
    this.nav.setRoot(page, params).catch(error => {
      this.logger.error('Error setting root page', error);
    }).then(() => {
      console.log('Hiding splash screen');
      Splashscreen.hide();
    });
  }

  private showConnectionToast(message: string, device: string) {
    this.translate.get(message, { device: device }).toPromise().then(message => {
      this.toast.showCenter(message, 3000);
    })
  }
}
