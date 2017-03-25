/**
 * @name Android Full Screen
 * @description
 * This plugin enables developers to offer users a true full screen experience in their Cordova and PhoneGap apps for Android.
 *
 * Using Android 4.0+, you can use true full screen in "lean mode", the way you see in apps like YouTube, expanding the app right to the edges of the screen, hiding the status and navigation bars until the user next interacts. This is ideally suited to video or cut-scene content.
 *
 * In Android 4.4+, however, you can now enter true full screen, fully interactive immersive mode. In this mode, your app will remain in true full screen until you choose otherwise; users can swipe down from the top of the screen to temporarily display the system UI.
 *
 * ```typescript
 * import { AndroidFullScreen } from '@ionic-native/android-full-screen';
 *
 * constructor(private androidFullScreen: AndroidFullScreen) { }
 *
 * ...
 *
 * this.androidFullScreen.isImmersiveModeSupported()
 *   .then(() => this.androidFullScreen.immersiveMode())
 *   .catch((error: any) => console.log(error));
 *
 * ```
 */
export declare class AndroidFullScreen {
    /**
     * Is this plugin supported?
     */
    isSupported(): Promise<void>;
    /**
     * Is immersive mode supported?
     */
    isImmersiveModeSupported(): Promise<void>;
    /**
     * The width of the screen in immersive mode.
     */
    immersiveWidth(): Promise<number>;
    /**
     * The height of the screen in immersive mode.
     */
    immersiveHeight(): Promise<number>;
    /**
     * Hide system UI until user interacts.
     */
    leanMode(): Promise<void>;
    /**
     * Show system UI.
     */
    showSystemUI(): Promise<void>;
    /**
     * Extend your app underneath the status bar (Android 4.4+ only).
     */
    showUnderStatusBar(): Promise<void>;
    /**
     * Extend your app underneath the system UI (Android 4.4+ only).
     */
    showUnderSystemUI(): Promise<void>;
    /**
     * Hide system UI and keep it hidden (Android 4.4+ only).
     */
    immersiveMode(): Promise<void>;
}
