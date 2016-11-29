Open Lap
========================================================================

Open Lap is a simple, no-nonsense hybrid_ slotcar race management app
for Carrera® DIGITAL 124/132 systems.

In a nutshell, Open Lap lets you

- Connect your mobile device via Bluetooth using Carrera AppConnect®,
  or a suitable serial to USB adapter.
- Take it easy during free practice, or compete in lap or time based
  qualifying and race sessions.
- Selectively track times for both autonomous and pace cars.
- Adjust vehicle speed, brake force and fuel tank size for each car
  individually, even during a race or qualifying session.
- Get informed about important events, such as fastest laps or low
  fuel conditions, by personalized voice messages.

This project is still at an early stage, so there will be some
features missing and it may not always work as expected.  Please feel
free to report any issues or feature requests using Open Lap's `issue
tracker <https://github.com/tkem/openlap/issues/>`_ on GitHub.

Open Lap is available as an Android app from the `Google Play
<https://play.google.com/store/apps/details?id=at.co.kemmer.openlap>`_
store.  You may also want to join the `Beta testing program
<https://play.google.com/apps/testing/at.co.kemmer.openlap>`_ to
preview unreleased versions.


Building from Source
------------------------------------------------------------------------

Open Lap is built using `Ionic 2 <http://ionic.io/2>`_.  To build the
app for Android, please follow Ionic's `installation guide
<http://ionicframework.com/docs/v2/getting-started/installation/>`_ to
make sure you have everything needed for Android development.  Then
run::

  npm install
  npm run ionic:build
  ionic build android

Please refer to the `Ionic CLI
<http://ionicframework.com/docs/v2/cli/>`_ documentation for further
information on how to run the application on an actual device, or in a
Web browser or emulator for testing.


License
------------------------------------------------------------------------

Copyright (c) 2016 Thomas Kemmer.

Licensed under the `Apache License, Version 2.0`_.

Carrera and Carrera AppConnect are registered trademarks of Stadlbauer
Marketing + Vertrieb GmbH.

Open Lap is not an official Carrera® product, and is not affiliated
with or endorsed by Stadlbauer Marketing + Vertrieb GmbH.

Thanks to Stephan Heß (a.k.a. `slotbaer <http://www.slotbaer.de/>`_)
for doing all the hard work.


.. _hybrid: http://en.wikipedia.org/wiki/HTML5_in_mobile_devices#Hybrid_Mobile_Apps

.. _Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
