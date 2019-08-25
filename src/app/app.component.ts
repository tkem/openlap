import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { from } from 'rxjs';
import { first, mergeMap, timeout } from 'rxjs/operators';

import { AppSettings } from './app-settings';
import { Backend } from './backend';
import { ControlUnit } from './carrera';
import { AppService, ControlUnitService, LoggingService, SpeechService } from './services';

const CONNECTION_TIMEOUT = 3000;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private app: AppService,
    public cu: ControlUnitService,
    @Inject(Backend) private backends: Backend[],
    private logger: LoggingService,
    private settings: AppSettings,
    private speech: SpeechService,
    private translate: TranslateService)
  {
    app.orientation.subscribe(orientation => {
      app.enableFullScreen(orientation == AppService.LANDSCAPE);
    });
    app.keepAwake(true);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.settings.getOptions().subscribe(options => {
      this.logger.setDebugEnabled(options.debug);
      this.setLanguage(options.language);
    });
    this.settings.getConnection().subscribe(connection => {
      if (connection) {
        this.logger.info('Connecting to ' + connection.name);
        // TODO: scan only backend responsible for this connection? provide backend.get()?
        from(this.backends.map(backend => backend.scan())).pipe(
          mergeMap(device => device),
          first(device => device.equals(connection)),
          timeout(CONNECTION_TIMEOUT)
        ).toPromise().then(device => {
          const cu = new ControlUnit(device, connection);
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

  ngOnDestroy() {
    this.cu.next(null);
  }

  private setLanguage(language: string) {
    this.translate.use(language || this.translate.getBrowserLang() || 'en').toPromise().then(obj => {
      this.translate.get('notifications.locale').toPromise().then(locale => {
        this.speech.setLocale(locale);
      });
    });
  }
}
