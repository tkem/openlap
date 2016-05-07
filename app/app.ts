import {App, IonicApp, Nav, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import { provide } from '@angular/core';

import {PracticePage} from './pages/practice/practice';
import {QualifyingPage} from './pages/qualifying/qualifying';
import {RacePage} from './pages/race/race';
import {ConnectionPage} from './pages/connection/connection';
import {SettingsPage} from './pages/settings/settings';
import {AboutPage} from './pages/about/about';

import {BLEProvider} from './connections/ble';
import {DemoProvider} from './connections/demo';
import {Provider} from './connections/connection';
import {ControlUnit} from './providers/cu';
import { Drivers, DefaultDrivers } from './providers/drivers';
import {Inject, ViewChild} from '@angular/core';

@App({
  templateUrl: 'build/app.html',
  providers: [ControlUnit, provide(Drivers, {useClass: DefaultDrivers})],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  rootPage: any = PracticePage;
  pages: Array<{title: string, component: any}>

  @ViewChild(Nav) nav: Nav;

  constructor(private app: IonicApp, private platform: Platform, private cu: ControlUnit, private drivers:Drivers) {
          console.log('Drivers: ', this.drivers);

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Practice', component: PracticePage },
      { title: 'Qualifying', component: QualifyingPage },
      { title: 'Race', component: RacePage },
      { title: 'Connection', component: ConnectionPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'About', component: AboutPage }
    ];

    let provider = platform.is('cordova') ? new BLEProvider() : new DemoProvider();

    provider.scan().subscribe(device => {
      console.log(device);
      cu.lap.subscribe(event => {
        console.log('New lap', event);
      });
      provider.connect(device).subscribe(connection => {
        cu.connect(connection);
        cu.version().subscribe(version => {
          console.log('CU version', version);
        });
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      if (window['plugins'] && window['plugins'].insomnia) {
        window['plugins'].insomnia.keepAwake(() => {
          console.log('Keeping app awake...');
        });
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
