import { provide, Component, ViewChild } from '@angular/core';

import { ionicBootstrap, App, Modal, Nav, NavController, Platform } from 'ionic-angular';

import { PracticePage, QualifyingPage, RacePage, SettingsPage, ConnectionPage, LoggingPage } from './pages';
import { ControlUnit, Drivers, DefaultDrivers, Logger, Plugins } from './providers';
// TODO: move to connections page?
import { SerialProvider } from './connections/serial';

@Component({
  providers: [
    ControlUnit, 
    provide(Drivers, {useClass: DefaultDrivers}),
    Logger,
    Plugins,
    SerialProvider
  ],
  templateUrl: 'build/app.html'
})
class OpenLapApp {
  rootPage: any = PracticePage;
  
  pages = [
    { title: 'Practice', component: PracticePage },
    { title: 'Qualifying', component: QualifyingPage },
    { title: 'Race', component: RacePage },
    { title: 'Settings', component: SettingsPage },
    //{ title: 'Connection', component: ConnectionPage },
    { title: 'Logging', component: LoggingPage },
    //{ title: 'About', component: AboutPage }
  ];

  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform, private cu: ControlUnit, private drivers: Drivers,
              private logger: Logger, private plugins: Plugins)
  {
      platform.ready().then(() => this.onReady());

      this.plugins.get('insomnia').then(insomnia => {
          return new Promise((resolve, reject) => {
              insomnia.keepAwake(resolve, reject);
          });
      }).then(() => {
          this.logger.info('Keeping app awake...');
      }).catch(error => {
          this.logger.error('Not using insomnia plugin', error);
      });
  }

  onReady() {
    // if (window['plugins'] && window['plugins'].insomnia) {
    //   window['plugins'].insomnia.keepAwake(() => {
    //     this.logger.info('Keeping app awake...');
    //   });
    // }
    
    // FIXME: overlay on race screen on first open
    let modal = Modal.create(ConnectionPage);
    //modal.onDismiss(settings => {});
    setTimeout(() => this.nav.present(modal));
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ionViewLoaded() {
    console.log('ionViewLoaded');
    // FIXME: overlay on race screen on first open
    //let modal = Modal.create(ConnectionPage);
    //modal.onDismiss(settings => {});
    //setTimeout(() => this.nav.present(modal));
  }
}
  
ionicBootstrap(OpenLapApp);
