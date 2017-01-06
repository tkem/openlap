import { Component } from '@angular/core';

@Component({
  templateUrl: 'licenses.page.html',
})
export class LicensesPage {
  items = [{
    name: 'Apache Cordova',
    copyright: 'Copyright (c) 2012, 2013, 2015 The Apache Software Foundation',
    license: 'Apache-2.0',
    homepage: 'https://cordova.apache.org/'
  }, {
    name: 'Angular',
    copyright: 'Copyright (c) 2014-2016 Google, Inc.',
    license: 'MIT',
    homepage: 'https://angular.io/'
  }, {
    name: 'Ionic 2',
    copyright: 'Copyright (c) 2015-2016 Drifty Co.',
    license: 'MIT',
    homepage: 'https://github.com/driftyco/ionic#readme',
  }, {
    name: 'Ionic Native',
    copyright: 'Copyright 2015-present Drifty Co.',
    license: 'MIT',
    homepage: 'https://github.com/driftyco/ionic-native',
  }, {
    name: 'Ionicons',
    copyright: 'Copyright (c) 2015-present Ionic',
    license: 'MIT',
    homepage: 'http://ionicons.com/',
  }, {
    name: 'ng2-translate',
    copyright: 'Copyright (c) 2016 Olivier Combe',
    license: 'MIT',
    homepage: 'https://github.com/ocombe/ng2-translate'
  }, {
    name: 'RxJS',
    copyright: 'Copyright (c) 2015-2016 Netflix, Inc., Microsoft Corp. and contributors',
    license: 'Apache-2.0',
    homepage: 'https://github.com/ReactiveX/RxJS'
  }, {
    name: 'cordova-plugin-app-version',
    author: 'whiteoctober',
    license: 'MIT',
    homepage: 'https://github.com/whiteoctober/cordova-plugin-app-version#readme'
  }, {
    name: 'cordova-plugin-ble-central',
    author: 'Don Coleman <don.coleman@gmail.com>',
    license: 'Apache-2.0',
    homepage: 'https://github.com/don/cordova-plugin-ble-central#readme'
  }, {
    name: 'cordova-plugin-fullscreen',
    author: 'Neil Rackett',
    license: 'BSD',
    homepage: 'https://github.com/mesmotronic/cordova-fullscreen-plugin#readme'
  }, {
    name: 'cordova-plugin-insomnia',
    author: 'Eddy Verbruggen <eddyverbruggen@gmail.com> (https://github.com/EddyVerbruggen)',
    license: 'MIT',
    homepage: 'https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin#readme'
  }, {
    name: 'cordova-plugin-tts',
    author: 'VILIC VANE',
    license: 'MIT',
    homepage: 'https://github.com/vilic/cordova-plugin-tts#readme'
  }, {
    name: 'cordova-plugin-x-socialsharing',
    author: 'Eddy Verbruggen - @EddyVerbruggen',
    license: 'MIT',
    homepage: 'https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#readme'
  }, {
    name: 'cordova-plugin-x-toast',
    author: 'Eddy Verbruggen <eddyverbruggen@gmail.com> (https://github.com/EddyVerbruggen)',
    license: 'MIT',
    homepage: 'https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin#readme'
  }, {
    name: 'cordovarduino',
    copyright: 'Xavier Seignard <xavier.seignard@gmail.com>',
    license: 'MIT',
    homepage: 'https://github.com/xseignard/cordovarduino#readme'
  }];
}
