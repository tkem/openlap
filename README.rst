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

Please note that some features, such as the start light and pace car
buttons, require Carrera® Control Unit firmware version 5.331 or
higher.  Carrera® Check Lane support generally requires at least
firmware version 5.336.

Open Lap is available as an Android app from the `Google Play Store
<https://play.google.com/store/apps/details?id=at.co.kemmer.openlap>`_.
You may also want to join the `Beta testing program
<https://play.google.com/apps/testing/at.co.kemmer.openlap>`_ to
preview unreleased versions.


Building from Source
------------------------------------------------------------------------

Open Lap is built using `Ionic <http://ionicframework.com/>`_ and
`Apache Cordova <https://cordova.apache.org/>`_.  To build the Android
or iOS app, please follow Ionic's `installation guide
<http://ionicframework.com/docs/intro/installation/>`_ and make sure
you have everything needed for Android or iOS development.  Then run::

  npm install
  npm run build
  ionic cordova plugin add cordovarduino

  ionic cordova build android

  or

  ionic cordova build ios

Please refer to the `Ionic CLI <http://ionicframework.com/docs/cli/>`_
documentation for further information on how to run the application on
an actual device, or in a Web browser or emulator for testing.

Due to lack of resources, Open Lap has *not* been tested on iOS, and
is unlikely to run unchanged on that platform.  However, being a
hybrid_ app, it shouldn't take too much effort to make it work, so
please feel free to fork and give it a try!


Contributing Translations
------------------------------------------------------------------------

If you'd like to see Open Lap in *your* native language, start by
having a look at the existing `translations <./src/assets/i18n>`_.
Open Lap uses `ngx-translate <http://www.ngx-translate.com/>`_ for
internationalization, which stores translations as simple `JSON
<http://www.json.org/>`_ files.  Just take one of the existing files
and replace all foreign language text as you see fit.  When you're
done, please open a new issue - or even a full-fledged pull request,
if you like - for submitting your translations.


License
------------------------------------------------------------------------

Copyright (c) 2016, 2017 Thomas Kemmer.

Translations: Haarman (Nederlands).

Licensed under the `Apache License, Version 2.0`_.

Carrera® and Carrera AppConnect® are registered trademarks of
Stadlbauer Marketing + Vertrieb GmbH.

Open Lap is not an official Carrera® product, and is not affiliated
with or endorsed by Stadlbauer Marketing + Vertrieb GmbH.

Thanks to Stephan Heß (a.k.a. `slotbaer <http://www.slotbaer.de/>`_)
for doing all the hard work.


.. _hybrid: http://en.wikipedia.org/wiki/HTML5_in_mobile_devices#Hybrid_Mobile_Apps

.. _Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
