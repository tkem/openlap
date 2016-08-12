import { Component } from '@angular/core';

@Component({
  templateUrl: 'build/pages/settings/licenses/licenses.html',
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
    name: 'cordova-plugin-appversion',
    url: 'https://github.com/Rareloop/cordova-plugin-app-version',
    copyright: 'Copyright (c) 2015 Rareloop Ltd',
    license: 'MIT'
  }, {
    name: 'cordova-plugin-ble-central',
    url: 'https://github.com/don/cordova-plugin-ble-central',
    copyright: 'Copyright 2014-2016 Don Coleman',
    license: 'Apache-2.0'
  }, {
    name: 'cordova-plugin-insomnia',
    url: 'https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin',
    copyright: 'Copyright Eddy Verbruggen',
    license: 'MIT'
  }, {
    name: 'cordova-plugin-tts',
    url: 'https://github.com/vilic/cordova-plugin-tts',
    copyright: 'Copyright VILIC VANE',
    license: 'MIT'
  }, {
    name: 'cordovarduino',
    url: 'https://github.com/xseignard/cordovarduino',
    copyright: 'Copyright (c) 2015 Xavier Seignard',
    license: 'MIT'
  }];
}
