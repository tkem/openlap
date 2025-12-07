import { Component } from '@angular/core';

@Component({
    templateUrl: 'licenses.page.html',
    standalone: false
})
export class LicensesPage {
  items = [{
    name: 'Angular',
    copyright: 'Super-powered by Google ©2010-2025',
    license: 'MIT',
    homepage: 'https://angular.io/'
  }, {
    name: 'Apache Cordova',
    copyright: 'Copyright © 2025 The Apache Software Foundation',
    license: 'Apache-2.0',
    homepage: 'https://cordova.apache.org/'
  }, {
    name: 'Awesome Cordova Plugins',
    copyright: 'Copyright (c) 2015-present Drifty Co.',
    license: 'MIT',
    homepage: 'https://github.com/danielsogl/awesome-cordova-plugins',
  }, {
    name: 'Ionic',
    copyright: 'Copyright (c) 2015-present Drifty Co.',
    license: 'MIT',
    homepage: 'https://github.com/driftyco/ionic#readme',
  }, {
    name: 'RxJS',
    copyright: 'Copyright (c) 2015-2018 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors',
    license: 'Apache-2.0',
    homepage: 'https://github.com/ReactiveX/RxJS#readme'
  }, {
    name: 'cordova-plugin-app-version',
    copyright: 'Copyright (c) 2013 White October',
    license: 'MIT',
    homepage: 'https://github.com/whiteoctober/cordova-plugin-app-version#readme'
  }, {
    name: 'cordova-plugin-ble-central',
    copyright: 'Copyright 2014-2020 Don Coleman',
    license: 'Apache-2.0',
    homepage: 'https://github.com/don/cordova-plugin-ble-central#readme'
  }, {
    name: 'cordova-plugin-device',
    author: 'Apache Software Foundation',
    license: 'Apache-2.0',
    homepage: 'https://github.com/apache/cordova-plugin-device#readme'
  }, {
    name: 'cordova-plugin-fullscreen',
    copyright: 'Copyright (c) 2014, Mesmotronic Limited',
    license: 'BSD',
    homepage: 'https://github.com/mesmotronic/cordova-fullscreen-plugin#readme'
  }, {
    name: 'cordova-plugin-inappbrowser',
    author: 'Apache Software Foundation',
    license: 'Apache-2.0',
    homepage: 'https://github.com/apache/cordova-plugin-inappbrowser#readme'
  }, {
    name: 'cordova-plugin-insomnia',
    author: 'Eddy Verbruggen',
    license: 'MIT',
    homepage: 'https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin#readme'
  }, {
    name: 'cordova-plugin-screen-orientation',
    author: 'Apache Software Foundation',
    license: 'Apache-2.0',
    homepage: 'https://github.com/apache/cordova-plugin-screen-orientation#readme'
  }, {
    name: 'cordova-plugin-splashscreen',
    author: 'Apache Software Foundation',
    license: 'Apache-2.0',
    homepage: 'https://github.com/apache/cordova-plugin-splashscreen#readme'
  }, {
    name: 'cordova-plugin-statusbar',
    author: 'Apache Software Foundation',
    license: 'Apache-2.0',
    homepage: 'https://github.com/apache/cordova-plugin-statusbar#readme'
  }, {
    name: 'cordova-plugin-tts-advanced',
    author: 'Sebastiaan Pasma and VILIC VANE',
    license: 'MIT',
    homepage: 'https://github.com/spasma/cordova-plugin-tts-advanced#readme'
  }, {
    name: 'cordova-plugin-whitelist',
    author: 'Apache Software Foundation',
    license: 'Apache-2.0',
    homepage: 'https://github.com/apache/cordova-plugin-whitelist#readme'
  }, {
    name: 'cordova-plugin-x-socialsharing',
    author: 'Eddy Verbruggen',
    license: 'MIT',
    homepage: 'https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#readme'
  }, {
    name: 'cordova-plugin-x-toast',
    author: 'Eddy Verbruggen',
    license: 'MIT',
    homepage: 'https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin#readme'
  }, {
    name: 'cordova-sqlite-storage',
    author: 'various',
    license: 'MIT',
    homepage: 'https://github.com/litehelpers/Cordova-sqlite-storage'
  }, {
    name: 'cordovarduino',
    copyright: 'Copyright (c) 2015 Xavier Seignard',
    license: 'MIT',
    homepage: 'https://github.com/xseignard/cordovarduino#readme'
  }, {
    name: 'ngx-translate',
    author: 'Olivier Combe',
    copyright: 'Copyright (c) 2018 Olivier Combe, Copyright (c) 2024 Andreas Löw / CodeAndWeb GmbH',
    license: 'MIT',
    homepage: 'https://github.com/ngx-translate/core#readme'
  }];
}
