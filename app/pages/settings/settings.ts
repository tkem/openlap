import { Component } from '@angular/core';

import { AboutPage } from './about/about';
import { LicensesPage } from './licenses/licenses';
import { LoggingPage } from './logging/logging';
import { SpeechPage } from './speech/speech';

@Component({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  speechPage = SpeechPage;
  licensesPage = LicensesPage;
  loggingPage = LoggingPage;
  aboutPage = AboutPage;
}
