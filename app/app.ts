import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {RacePage} from './pages/race/race';
import {BLEProvider} from './connections/ble';
import {DemoProvider} from './connections/demo';
import {Provider} from './connections/connection';
import {ControlUnit} from './providers/cu';
import {Inject, provide} from 'angular2/core';

@App({
  templateUrl: 'build/app.html',
  providers: [provide(Provider, { useClass: BLEProvider}), ControlUnit],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  rootPage: any = RacePage;
  pages: Array<{title: string, component: any}>

  constructor(private app: IonicApp, private platform: Platform, private cu: ControlUnit) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Race', component: RacePage }
    ];

    let provider = platform.is('cordova') ? new BLEProvider() : new DemoProvider();

    provider.scan().subscribe(device => {
      console.log(device);
      cu.lap.subscribe(event => {
        console.log('New lap', event);
      });
      cu.status.subscribe(event => {
        console.log('New status', event);
      })
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
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
