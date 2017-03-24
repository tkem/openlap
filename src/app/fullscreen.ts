import { Injectable } from '@angular/core';

import { Cordova, Plugin } from '@ionic-native/core';

@Plugin({
  plugin: 'cordova-plugin-fullscreen',
  pluginName: 'AndroidFullScreen',
  pluginRef: 'navigator.AndroidFullScreen',
  repo: 'https://github.com/mesmotronic/cordova-plugin-fullscreen',
  platforms: ['Android']
})
@Injectable()
export class AndroidFullScreen {

  @Cordova()
  isSupported(): Promise<void> { return; }

  @Cordova()
  showSystemUI(): Promise<void> { return; }

  @Cordova()
  immersiveMode(): Promise<void> { return; }
}
