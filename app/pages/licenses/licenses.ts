import { Component } from '@angular/core';

import { TargetDirective } from '../../directives';

@Component({
  directives: [TargetDirective],
  templateUrl: 'build/pages/licenses/licenses.html',
})
export class LicensesPage {
  items = [{
    name: 'Ionic 2',
    url: 'http://ionic.io/2',
    copyright: 'Copyright 2015-2016 Drifty Co.',
    license: 'MIT'
  }, {
    name: 'Angular 2',
    url: 'https://angular.io/',
    copyright: 'Copyright (c) 2014-2016 Google, Inc.',
    license: 'MIT'
  }, {
    name: 'RxJS',
    url: 'https://github.com/ReactiveX/RxJS',
    copyright: 'Copyright 2015-2016 Netflix, Inc., Microsoft Corp. and contributors',
    license: 'Apache-2.0'
  }, {
    name: 'Apache Cordova',
    url: 'https://cordova.apache.org/',
    copyright: 'Copyright © 2012, 2013, 2015 The Apache Software Foundation',
    license: 'Apache-2.0'
  }, {
    name: 'cordova-plugin-ble-central',
    url: 'https://github.com/don/cordova-plugin-ble-central',
    copyright: 'Copyright 2014-2016 Don Coleman',
    license: 'Apache-2.0'
  }, {
    name: 'cordovarduino',
    url: 'https://github.com/xseignard/cordovarduino',
    copyright: 'Copyright (c) 2015 Xavier Seignard',
    license: 'MIT'
  }, {
    name: 'cordova-plugin-appversion',
    url: 'https://github.com/Rareloop/cordova-plugin-app-version',
    copyright: 'Copyright (c) 2015 Rareloop Ltd',
    license: 'MIT'
  }];
}
