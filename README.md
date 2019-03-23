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
Carrera® Check Lane support requires at least firmware version 3.36.

Open Lap is available as an Android app on the [Google Play
Store](https://play.google.com/store/apps/details?id=at.co.kemmer.openlap).
You may also want to join the [Beta testing
program](https://play.google.com/apps/testing/at.co.kemmer.openlap) to
preview unreleased versions.

An iOS version is maintained by [Philipp
Anné](https://itunes.apple.com/us/developer/id965549566) and is
available on the [App
Store](https://itunes.apple.com/us/app/open-lap/id1448048406).


Building from Source
------------------------------------------------------------------------

Open Lap is built using [Ionic](https://ionicframework.com/) and
[Apache Cordova](https://cordova.apache.org/).  To install the
necessary dependencies, first run

```
npm install
```

To test and develop the app in your browser, please follow the Ionic
CLI [installation
guide](https://ionicframework.com/docs/installation/cli), then run


```
ionic serve
```

To actually build the app, please make sure you have everything needed
for [Android](https://ionicframework.com/docs/installation/android) or
[iOS](https://ionicframework.com/docs/installation/ios) development.
Then simply run

```
ionic cordova build android
```

or

```
ionic cordova build ios
```

Please refer to the [Ionic CLI](https://ionicframework.com/docs/cli/)
documentation for further information on how to run the application on
an actual device, or in a Web browser or emulator for testing.


Contributing Translations
------------------------------------------------------------------------

If you'd like to see Open Lap in your native language, start by having
a look at the existing [translations](./src/assets/i18n).  Open Lap
uses [ngx-translate](http://www.ngx-translate.com/) for
internationalization, which stores translations as simple
[JSON](http://www.json.org/) files.  Just take one of the existing
files and replace all foreign language text as you see fit.  When
you're done, please open a new issue - or even a full-fledged pull
request, if you like - for submitting your translations.


License
------------------------------------------------------------------------

Copyright (c) 2016-2019 Thomas Kemmer.

Translations: Haarman (Nederlands), SdiF (Italiano), Maikeru (Español).

iOS support: softyde, elliot2extreme.

Licensed under the [Apache License, Version
2.0](http://www.apache.org/licenses/LICENSE-2.0).

Carrera® and Carrera AppConnect® are registered trademarks of
Stadlbauer Marketing + Vertrieb GmbH.

Open Lap is not an official Carrera® product, and is not affiliated
with or endorsed by Stadlbauer Marketing + Vertrieb GmbH.

Thanks to Stephan Heß (a.k.a. [slotbaer](http://www.slotbaer.de/)) for
doing all the hard work.
