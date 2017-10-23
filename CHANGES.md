1.5.0 2017-10-23
----------------

- Add position up/down indicators.

- Track if car has started refueling.

- Close page menu when clicking checkbox items.

- Upgrade `ngx-translate` to v8.0.0.

- Update dependencies.


1.4.2 2017-10-10
----------------

- Fix sporadic `IonicToastProvider` runtime errors.

- Fix firmware version check for virtual CU button support.

- Convert `README` and `CHANGES` to Markdown format.

- Adjust `TTS` rate on iOS (courtesy of elliot2extreme).

- Remove `TypedArray.from()` for iOS compatibility (courtesy of
  elliot2extreme).

- Add icon and splash screen resources for iOS.

- Update icon and splash screen source images.

- Update dependencies.


1.4.1 2017-07-10
----------------

- Improve Bluetooth reconnect handling.

- Show three-digit CU firmware version.

- Upgrade `ionic-angular` to v3.5.0.


1.4.0 2017-06-16
----------------

- Add ESC key functionality.

- Add "CU mode" for tuning settings.

- Change tuning "link" icon to Ionicons "lock/unlock".

- Change CU firmware version to include period.

- Minor UI improvements.

- Update dependencies.


1.3.1 2017-05-06
----------------

- Hide scrollbars on Android 4.4.

- Improve leaderboard position ("colored stripe") display on Android 4.4.

- Improve handling of two-sector tracks.

- Improve `Toast` error handling.

- Upgrade to `ionic` v3.1.


1.3.0 2017-05-03
----------------

- Add support for "yellow flag" phase.

- Add pace car control button.

- Fix display issues with unset speed/brake/fuel values.

- Fix Android 4.4 SVG scaling issues.

- Fix Android 4.4 issues with multiple header buttons.

- Improve CU protocol logging.

- Default to demo mode when running in emulator or browser.


1.2.1 2017-04-23
----------------

- Fix "clear" icon background color issue.


1.2.0 2017-04-21
----------------

- Add Carrera® Check Lane support.

- Refactor and clean up settings.

- Optionally set number of drivers for race and qualifying.

- Fix Dutch translation typo (courtesy of Haarman).

- Upgrade to `ionic-native` v3.5.


1.1.0 2017-04-11
----------------

- Translate TTS notifications.

- Add speech toggle button to main page.

- Add confirm dialogs.

- Ignore section times reported by Check Lane.

- Upgrade to `ionic` v3.


1.0.2 2017-04-01
----------------

- Improve handling of default driver names.

- Increase tuning page font size.

- Add `IonicErrorHandler`.

- Add workaround for random toast errors.

- Add translation instructions to README.

- Upgrade to `ionic-native` v3.

- Upgrade to `ngx-translate` v6.


1.0.1 2017-03-20
----------------

- Update dependencies.

- Add Dutch translation by Haarman.

- Fix CSS "nowrap" spelling error.

- Move root page to separate file (fixes Webpack source map issues).


1.0.0 2017-01-09
----------------

- Change default colors.

- Refactor current/completed laps.

- Improve overall app stability.


0.9.8 2017-01-07
----------------

- Validate length of incoming CU data packets.


0.9.7 2017-01-06
----------------

- Update texts and translations.

- Close logging popover on "clear".

- Reorder event priorities.


0.9.6 2017-01-06
----------------

- Refactor lap counter and events.

- Rename "messages" to "notifications".

- Fix icon-only buttons.


0.9.5 2017-01-05
----------------

- Fix messages update.


0.9.4 2017-01-04
----------------

- Fix "fastest lap" event.


0.9.3 2017-01-04
----------------

- Select lap count mode.

- Update dependencies.


0.9.2 2017-01-03
----------------

- Various tuning page improvements.


0.9.1 2017-01-02
----------------

- Fix update of message settings.


0.9.0 2017-01-02
----------------

- Add internationalization support.

- Disable individual messages.

- Improve manual reconnect.


0.8.10 2016-12-30
-----------------

- Share log via email, etc.


0.8.9 2016-12-29
----------------

- Optimize font size in landscape mode.

- Use local storage provider for development.

- Upgrade to Ionic RC 4.


0.8.8 2016-12-17
----------------

- Ignore new cars when race is finished.

- Suppress "Final lap" message if race is stopped.

- Re-activate "False start" message.

- Update default messages.


0.8.7 2016-12-16
----------------

- Add option to use fixed driver positions.


0.8.6 2016-12-16
----------------

- Add option to stop timer when race is interrupted.

- Change "Lap Time" to "Last Lap" for consistency.


0.8.5 2016-12-08
----------------

- Filter Bluetooth devices.

- Upgrade `ionic-native`.

- Make builds more reproducible.


0.8.4 2016-12-03
----------------

- Reset driver mask after startlight and reconnect.

- Increase page load timeout.

- Upgrade `ionic-native`.


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

- Switch to `ionic-storage` for storing user settings.

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

- Upgrade `ionic-native`.


0.6.0 2016-09-08
----------------

- Require Android >= version 4.4.

- Add "finish all laps" option to race settings (a.k.a. "slotcar mode").

- Add "lock-all" slider to car setup.

- Add more speech notifications.

- Move controller color setup to settings menu.

- Use native `Toast` plugin.

- Various refactorings and smaller improvements.


0.5.1 2016-08-12
----------------

- Add `cordova-plugin-app-version` required by `ionic-native`.

- Add `android-versionCode` to `config.xml`.


0.5.0 2016-08-12
----------------

- Upgrade to Ionic 2 Beta 11.

- Use `TTS` plugin for speech notifications.

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

- Use `cordovarduino` plugin for serial connection.

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

- Add `RaceControl` provider.

- Add global exception handler.


0.2.0 2016-06-10
----------------

- Choose connection at startup.

- Add serial connection support.

- Add application logging.


0.1.0 2016-06-04
----------------

- Implement basic practice/qualifying/race functionality.
