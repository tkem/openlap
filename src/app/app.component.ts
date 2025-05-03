import { AfterViewInit, Component, Inject, OnInit, OnDestroy, isDevMode } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';

import { TranslateService } from '@ngx-translate/core';

import { Subscription, from } from 'rxjs';
import { first, mergeMap, timeout } from 'rxjs/operators';

import { AppSettings } from './app-settings';
import { Backend } from './backend';
import { ControlUnit } from './carrera';
import { AppService, ControlUnitService, I18nAlertService, I18nToastService, LoggingService, SpeechService } from './services';

const CONNECTION_TIMEOUT = 3000;

const STATE_MESSAGES = {
  'connected': 'Connected to {{device}}',
  'connecting': 'Connecting to {{device}}',
  'disconnected': 'Disconnected from {{device}}'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  private stateSubscription = new Subscription();

  constructor(
    private app: AppService,
    public cu: ControlUnitService,
    @Inject(Backend) private backends: Backend[],
    private alert: I18nAlertService,
    private logger: LoggingService,
    private settings: AppSettings,
    private speech: SpeechService,
    private toast: I18nToastService,
    private translate: TranslateService,
    private updates: SwUpdate)
  {
    if (window.screen) {
      window.screen.orientation.addEventListener('change', () => {
        app.enableFullScreen(window.screen.orientation.type.startsWith('landscape'));
      });
      if (window.screen.orientation && window.screen.orientation.type) {
        app.enableFullScreen(window.screen.orientation.type.startsWith('landscape'));
      }
    }
    app.keepAwake(true);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.app.getVersion().then(version => {
      this.app.getVersionCode().then(versionCode => {
        if (versionCode) {
          version += " (" + versionCode + ")";
        }
        this.logger.info("Open Lap", version, isDevMode() ? "[dev]" : "[prod]", "on", window?.navigator?.userAgent);
        isDevMode
      });
    });
    this.settings.getOptions().subscribe(options => {
      this.logger.setDebugEnabled(options.debug);
      this.setLanguage(options.language);
      this.speech.setVoice(options.voice);
      this.speech.setRate(options.rate / 1000.0);
      this.speech.setPitch(options.pitch / 1000.0);
    });
  }

  ngOnDestroy() {
    this.cu.next(null);
  }

  ngAfterViewInit() {
    if (this.updates.isEnabled) {
      this.logger.info("Service worker enabled");
      this.updates.versionUpdates.subscribe(() => {
        this.logger.info("Update available");
        this.update();
      });
    } else {
      this.logger.debug("Service worker not enabled");
    }
    // FIXME: ion-toast ignores position if called from ngOnInit, ngAfterViewInit...
    (new Promise(resolve => setTimeout(resolve, 100))).then(() => {
      this.connect();
    });
  }

  private update() {
    this.alert.show({
      message: 'A new version of Open Lap is available. Do you want to update now?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'OK',
        handler: () => document.location.reload()
      }]
    });
  }

  private setLanguage(language: string) {
    this.translate.use(language || this.translate.getBrowserLang() || 'en').toPromise().then(obj => {
      this.translate.get('notifications.locale').toPromise().then(locale => {
        this.speech.setLocale(locale);
      });
    });
  }

  private showConnectionToast(state: string, device: string) {
    const message = STATE_MESSAGES[state] || 'Connecting to {{device}}';
    this.toast.showShortCenter(message, {device: device}).catch(error => {
      this.logger.error('Error showing toast', error);
    });
  }

  private connect() {
    this.settings.getConnection().subscribe(connection => {
      this.stateSubscription.unsubscribe();
      if (connection && connection.name) {
        this.logger.info('Connecting to ' + connection.name);
        // TODO: scan only backend responsible for this connection? provide backend.get()?
        from(this.backends.map(backend => backend.scan())).pipe(
          mergeMap(device => device),
          first(device => device.equals(connection)),
          timeout(CONNECTION_TIMEOUT)
        ).toPromise().then(device => {
          const cu = new ControlUnit(device, connection);
          this.stateSubscription = cu.getState().subscribe(state => this.showConnectionToast(state, cu.peripheral.name));
          this.cu.next(cu);
          cu.connect();
        }).catch(error => {
          this.logger.error('Error connecting to ' + connection.name + ':', error);
        }).then(() => {
          this.app.hideSplashScreen();
        });
      } else {
        this.app.hideSplashScreen();
        this.cu.next(null);
      }
    });
  }
}
