import { Component, OnDestroy, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { AboutPage } from './about.page';
import { ConnectionPage } from './connection.page';
import { LicensesPage } from './licenses.page';
import { LoggingPage } from './logging.page';
import { NotificationsPage } from './notifications.page';

import { AppSettings, Options } from '../app-settings';
import { I18nAlertService, SpeechService } from '../services';

@Component({
  templateUrl: 'settings.page.html'
})
export class SettingsPage implements OnDestroy, OnInit {
  aboutPage = AboutPage;
  connectionPage = ConnectionPage;
  licensesPage = LicensesPage;
  loggingPage = LoggingPage;
  notificationsPage = NotificationsPage;

  options = new Options();

  voices = [];

  private subscription: any;

  constructor(private alert: I18nAlertService, private settings: AppSettings, private speech: SpeechService, private translate: TranslateService) {}

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe(options => {
      this.options = options;
      this.updateVoices();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reset() {
    this.alert.show({
      message: 'Reset all user settings to default values?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'OK',
        handler: () => { this.settings.clear(); }
      }]
    });
  }

  async update() {
    await this.updateVoices();
    return this.settings.setOptions(this.options);
  }

  async updateVoices() {
    if (this.options.language) {
      this.voices = await this.speech.getVoices(this.options.language);
      if (!this.voices.find(v => v.identifier == this.options.voice)) {
        this.options.voice = "";
      }
    } else {
      this.voices = [];
      this.options.voice = "";
    }
  }

  async updateAndGreet() {
    await this.update();
    // TODO: trigger when voice is selected
    const greeting = this.translate.instant("notifications.greeting");
    this.speech.speak(greeting);
  }
}
