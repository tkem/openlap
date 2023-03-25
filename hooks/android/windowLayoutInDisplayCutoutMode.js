const fs = require('fs');
const path = require("path");

module.exports = function (ctx) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
    <resources>
        <style name="Theme.App.SplashScreen" parent="Theme.SplashScreen.IconBackground">
            <item name="windowSplashScreenBackground">@color/cdv_splashscreen_background</item>
            <item name="windowSplashScreenAnimatedIcon">@drawable/ic_cdv_splashscreen</item>
            <item name="windowSplashScreenAnimationDuration">200</item>
            <item name="postSplashScreenTheme">@style/Theme.AppCompat.NoActionBar</item>
            <item name="android:windowLayoutInDisplayCutoutMode">never</item>
        </style>
    </resources>`

    const themesXML = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/res/values/themes.xml');

    fs.writeFileSync(themesXML, xml);
};
