Open Lap
========================================================================

Open Lap is a simple, no-nonsense slot car race management app for
Carrera® DIGITAL 124/132 systems.

In a nutshell, Open Lap lets you

- connect your mobile device via Bluetooth using Carrera AppConnect®,
  or a suitable serial to USB On-The-Go adapter cable.
- take it easy during free practice, go for fastest lap in qualifying,
  or compete in lap or time based race sessions.
- get informed about important events, such as fastest laps or low
  fuel conditions, by personalized voice messages.
- adjust vehicle speed, brake force and fuel tank size for each car
  individually.
- measure up to three intermediate or sector times (S1, S2, S3) using
  Carrera® Check Lane or compatible equipment.
- send out the pace car in case of emergency, or temporarily disable
  lap counting during a "yellow flag" phase.

Some features, such as the start light and pace car buttons, will
require Carrera® Control Unit firmware version 3.31 or higher.
Carrera® Check Lane support generally requires at least firmware
version 3.36.

Open Lap is available as an Android app from the [Google Play
Store](https://play.google.com/store/apps/details?id=at.co.kemmer.openlap).
You may also want to join the [Beta testing
program](https://play.google.com/apps/testing/at.co.kemmer.openlap) to
preview unreleased versions.


Building from Source
------------------------------------------------------------------------

Open Lap is built using [Ionic](http://ionicframework.com/) and
[Apache Cordova](https://cordova.apache.org/).  To build the Android
app, please follow Ionic's [installation
guide](http://ionicframework.com/docs/intro/installation/) and make
sure you have everything needed for Android development.  Then run:
```
npm install
npm run build
ionic cordova plugin add cordovarduino
ionic cordova build android
```

Please refer to the [Ionic CLI](http://ionicframework.com/docs/cli/)
documentation for further information on how to run the application on
an actual device, or in a Web browser or emulator for testing.

Please note that due to lack of resources, Open Lap is *not*
officially supported on iOS.  However, there've been reports of
successfully building and running an iOS version, so you still might
want to [give it a
try](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/)!


Contributing Translations
------------------------------------------------------------------------

If you'd like to see Open Lap in *your* native language, start by
having a look at the existing [translations](./src/assets/i18n).  Open
Lap uses [ngx-translate](http://www.ngx-translate.com/) for
internationalization, which stores translations as simple
[JSON](http://www.json.org/) files.  Just take one of the existing
files and replace all foreign language text as you see fit.  When
you're done, please open a new issue - or even a full-fledged pull
request, if you like - for submitting your translations.


License
------------------------------------------------------------------------

Copyright (c) 2016, 2017 Thomas Kemmer.

Translations: Haarman (Nederlands).

iOS tweaks: elliot2extreme.

Licensed under the [Apache License, Version
2.0](http://www.apache.org/licenses/LICENSE-2.0).

Carrera® and Carrera AppConnect® are registered trademarks of
Stadlbauer Marketing + Vertrieb GmbH.

Open Lap is not an official Carrera® product, and is not affiliated
with or endorsed by Stadlbauer Marketing + Vertrieb GmbH.

Thanks to Stephan Heß (a.k.a. [slotbaer](http://www.slotbaer.de/)) for
doing all the hard work.
