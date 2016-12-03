0.8.4 2016-12-03
----------------

- Reset driver mask after startlight and reconnect.

- Increase page load timeout.

- Upgrade ionic-native.


0.8.3 2016-11-29
----------------

- Fix Android 4.4 display issues.


0.8.2 2016-11-28
----------------

- Disable "stop" during practice.

- Do not close serial port when inactive.

- Use responsive layout for leaderboard.

- Improve reconnect handling.


0.8.1 2016-11-20
----------------

- Improve backend/connection handling.

- Update splash screen resources.


0.8.0 2016-11-19
----------------

- Upgrade to Ionic RC 3.

- Switch to ``ionic-storage`` for storing user settings.

- Add options to prematurely stop or restart a race.

- Add fullscreen option.

- Add "in pit" message.

- Various minor UI improvements.


0.7.3 2016-11-14
----------------

- Try to connect to last device on startup.

- Improve USB permission handling.

- Improve side menu UI.

- Upgrade to Ionic RC 2.


0.7.2 2016-11-02
----------------

- Show car number on leaderboard.

- Improve device orientation handling.

- Don't repeat last message when changing Speech settings.


0.7.1 2016-10-22
----------------

- Improve error handling when displaying log records.

- Remove clear button for driver input.


0.7.0 2016-10-21
----------------

- New side menu for improved connection access.

- Add custom storage provider (will reset user settings).

- Show driver names in colors page.

- Upgrade to Ionic RC 1.


0.6.4 2016-09-19
----------------

- Reset position tower and fuel on start.

- Add possible workaround for startlight update issues.

- Add default race time.

- Add chequered flag animation.


0.6.3 2016-09-14
----------------

- Fix lap-based race.


0.6.2 2016-09-12
----------------

- Improve startlight usability.

- Improve look of menus.


0.6.1 2016-09-09
----------------

- Race settings usability improvements.

- Upgrade ``ionic-native``.


0.6.0 2016-09-08
----------------

- Require Android >= version 4.4.

- Add "finish all laps" option to race settings (a.k.a. "slotcar mode"). 

- Add "lock-all" slider to car setup.

- Add more speech notifications.

- Move controller color setup to settings menu.

- Use native ``Toast`` plugin.

- Various refactorings and smaller improvements.


0.5.1 2016-08-12
----------------

- Add ``cordova-plugin-app-version`` required by ``ionic-native``.

- Add ``android-versionCode`` to ``config.xml``.


0.5.0 2016-08-12
----------------

- Upgrade to Ionic 2 Beta 11.

- Use ``TTS`` plugin for speech notifications.

- Improve CU reconnect handling.

- Various refactorings and improvements.


0.4.6 2016-07-26
----------------

- Improve connection handling.


0.4.5 2016-06-29
----------------

- Upgrade to Ionic 2 Beta 10.

- Enable production mode when running on device.

- Fix lap counts starting at 1.


0.4.4 2016-06-28
----------------

- Add splash screen.

- Improve logging configuration.


0.4.3 2016-06-27
----------------

- Add settings page.

- Click log record for JSON view.

- Use ``cordovarduino`` plugin for serial connection.

- Various refactorings and improvements.


0.4.2 2016-06-22
----------------

- More "material" design.

- Update application icon.


0.4.1 2016-06-18
----------------

- Fix logging issues.

- Connection improvements.


0.4.0 2016-06-17
----------------

- Improve connection handling.

- Upgrade to Ionic 2 Beta 9.


0.3.1 2016-06-16
----------------

- More responsive layout.

- Mark overall best lap.

- Remove cancel buttons from dialogs.


0.3.0 2016-06-15
----------------

- Move to modal user interface.

- Setup race, qualifying, drivers and controller colors.

- Add ``RaceControl`` provider.

- Add global exception handler.


0.2.0 2016-06-10
----------------

- Choose connection at startup.

- Add serial connection support.

- Add application logging.


0.1.0 2016-06-04
----------------

- Implement basic practice/qualifying/race functionality.
