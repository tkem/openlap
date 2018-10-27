import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';

import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Insomnia } from '@ionic-native/insomnia';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { RootPage } from './root.page';

import { Backend } from '../backend';
import { ControlUnit } from '../carrera';
import { CONTROL_UNIT_SUBJECT, Logger, Settings, Speech, Toast } from '../core';
import { RmsPage } from '../rms';

const CONNECTION_TIMEOUT = 3000;

@Component({
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit {

  @ViewChild(Nav) nav: Nav;

  rootPage = RootPage;  // FIXME: get rid of this!

  private subscription: Subscription;

  constructor(@Inject(CONTROL_UNIT_SUBJECT) public cu: BehaviorSubject<ControlUnit>,
    @Inject(Backend) private backends: Backend[],
    private logger: Logger,
    private settings: Settings,
    private speech: Speech,
    private platform: Platform,
    private androidFullScreen: AndroidFullScreen,
    private insomnia: Insomnia,
    private splashScreen: SplashScreen,
    private toast: Toast,
    private translate: TranslateService)
  {
    this.platform.ready().then(readySource => {
      this.logger.info('Initializing ' + readySource + ' application');
      if (readySource === 'cordova') {
        this.platform.resize.subscribe(() => {
          this.enableFullScreen(this.platform.isLandscape());
        });
        this.enableFullScreen(this.platform.isLandscape());
        this.insomnia.keepAwake();
      }
    });
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.settings.getOptions().subscribe(options => {
      this.logger.setDebugEnabled(options.debug);
      this.setLanguage(options.language);
    });
    this.settings.getConnection().subscribe(connection => {
      this.logger.info('New connection', connection);
      if (this.cu.value) {
        this.cu.value.disconnect();
      }
      if (connection) {
        this.logger.info('Connecting to ' + connection.name);
        Observable.from(this.backends.map(backend => backend.scan())).mergeAll().filter(device => {
          return device.equals(connection);
        }).timeout(CONNECTION_TIMEOUT).first().toPromise().then(device => {
          const cu = new ControlUnit(device, connection, this.logger);
          this.cu.next(cu);
          cu.connect();
        }).then(() => {
          this.setRoot(RmsPage, { mode: 'practice', auto: true, pace: true });
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

  private enableFullScreen(value: boolean) {
    this.androidFullScreen.isImmersiveModeSupported().then(() => {
      if (value) {
        return this.androidFullScreen.immersiveMode();
      } else {
        return this.androidFullScreen.showSystemUI();
      }
    }).catch(error => {
      this.logger.error('Fullscreen error:', error);
    });
  }

  private setLanguage(language: string) {
    this.translate.use(language || this.translate.getBrowserLang() || 'en').toPromise().then(obj => {
      this.translate.get('notifications.locale').toPromise().then(locale => {
        this.speech.setLocale(locale);
      });
    });
  }

  private setRoot(page: any, params?: any) {
    this.nav.setRoot(page, params).catch(error => {
      this.logger.error('Error setting root page', error);
    }).then(() => {
      this.logger.info('Hiding splash screen');
      this.splashScreen.hide();
    });
  }

  private showConnectionToast(message: string, device: string) {
    this.translate.get(message, { device: device }).toPromise().then(message => {
      return this.toast.showCenter(message, 3000);
    }).catch(error => {
      this.logger.error('Error showing toast', error);
    });
  }
}
