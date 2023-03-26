var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AwesomeCordovaNativePlugin, cordova } from '@awesome-cordova-plugins/core';
var TextToSpeechAdvancedOriginal = /** @class */ (function (_super) {
    __extends(TextToSpeechAdvancedOriginal, _super);
    function TextToSpeechAdvancedOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextToSpeechAdvancedOriginal.prototype.speak = function (textOrOptions) { return cordova(this, "speak", { "otherPromise": true }, arguments); };
    TextToSpeechAdvancedOriginal.prototype.stop = function () { return cordova(this, "stop", { "otherPromise": true }, arguments); };
    TextToSpeechAdvancedOriginal.prototype.getVoices = function () { return cordova(this, "getVoices", { "otherPromise": true }, arguments); };
    TextToSpeechAdvancedOriginal.pluginName = "Text To Speech Advanced";
    TextToSpeechAdvancedOriginal.plugin = "cordova-plugin-tts-advanced";
    TextToSpeechAdvancedOriginal.pluginRef = "TTS";
    TextToSpeechAdvancedOriginal.repo = "https://github.com/spasma/cordova-plugin-tts-advanced";
    TextToSpeechAdvancedOriginal.platforms = ["Android", "iOS"];
    return TextToSpeechAdvancedOriginal;
}(AwesomeCordovaNativePlugin));
var TextToSpeechAdvanced = new TextToSpeechAdvancedOriginal();
export { TextToSpeechAdvanced };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL3BsdWdpbnMvdGV4dC10by1zcGVlY2gtYWR2YW5jZWQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyx1Q0FBK0MsTUFBTSwrQkFBK0IsQ0FBQzs7SUF1RGxELHdDQUEwQjs7OztJQVVsRSxvQ0FBSyxhQUFDLGFBQWtDO0lBWXhDLG1DQUFJO0lBWUosd0NBQVM7Ozs7OzsrQkExRlg7RUF3RDBDLDBCQUEwQjtTQUF2RCxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBBd2Vzb21lQ29yZG92YU5hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRUU09wdGlvbnMge1xuICAvKiogdGV4dCB0byBzcGVhayAqL1xuICB0ZXh0OiBzdHJpbmc7XG4gIC8qKiBjYW5jZWwsIGJvb2xlYW46IHRydWUvZmFsc2UgKi9cbiAgaWRlbnRpZmllcjogc3RyaW5nO1xuICAvKiogdm9pY2UgaWRlbnRpZmllciAoaU9TIC8gQW5kcm9pZCkgZnJvbSBnZXRWb2ljZXMgKi9cbiAgbG9jYWxlPzogc3RyaW5nO1xuICAvKiogc3BlZWQgcmF0ZSwgMCB+IDEgKi9cbiAgcmF0ZT86IG51bWJlcjtcbiAgLyoqIHBpdGNoLCAwIH4gMSAqL1xuICBwaXRjaD86IG51bWJlcjtcbiAgLyoqIGNhbmNlbCwgYm9vbGVhbjogdHJ1ZS9mYWxzZSAqL1xuICBjYW5jZWw/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRUU1ZvaWNlIHtcbiAgLyoqIFZvaWNlIG5hbWUgKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKiogVm9pY2UgbGFuZ3VhZ2UgKi9cbiAgbGFuZ3VhZ2U6IHN0cmluZztcbiAgLyoqIFZvaWNlIGlkZW50aWZpZXIgc3RyaW5nICovXG4gIGlkZW50aWZpZXI6IHN0cmluZztcbn1cblxuLyoqXG4gKiBAbmFtZSBUZXh0IFRvIFNwZWVjaCBBZHZhbmNlZFxuICogQGRlc2NyaXB0aW9uXG4gKiBUZXh0IHRvIFNwZWVjaCBwbHVnaW5cbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgVGV4dFRvU3BlZWNoQWR2YW5jZWQgfSBmcm9tICdAYXdlc29tZS1jb3Jkb3ZhLXBsdWdpbnMvdGV4dC10by1zcGVlY2gtYWR2YW5jZWQvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIHR0czogVGV4dFRvU3BlZWNoQWR2YW5jZWQpIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqIHRoaXMudHRzLnNwZWFrKCdIZWxsbyBXb3JsZCcpXG4gKiAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdTdWNjZXNzJykpXG4gKiAgIC5jYXRjaCgocmVhc29uOiBhbnkpID0+IGNvbnNvbGUubG9nKHJlYXNvbikpO1xuICpcbiAqIGBgYFxuICogQGludGVyZmFjZXNcbiAqIFRUU09wdGlvbnNcbiAqIFRUU1ZvaWNlXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnVGV4dCBUbyBTcGVlY2ggQWR2YW5jZWQnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi10dHMtYWR2YW5jZWQnLFxuICBwbHVnaW5SZWY6ICdUVFMnLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL3NwYXNtYS9jb3Jkb3ZhLXBsdWdpbi10dHMtYWR2YW5jZWQnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGV4dFRvU3BlZWNoQWR2YW5jZWQgZXh0ZW5kcyBBd2Vzb21lQ29yZG92YU5hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNwZWFrc1xuICAgKlxuICAgKiBAcGFyYW0gdGV4dE9yT3B0aW9ucyB7c3RyaW5nIHwgVFRTT3B0aW9uc30gVGV4dCB0byBzcGVhayBvciBUVFNPcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc3BlYWtpbmcgZmluaXNoZXNcbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBvdGhlclByb21pc2U6IHRydWVcbiAgfSlcbiAgc3BlYWsodGV4dE9yT3B0aW9uczogc3RyaW5nIHwgVFRTT3B0aW9ucyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYW55IGN1cnJlbnQgVFRTIHBsYXliYWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgb3RoZXJQcm9taXNlOiB0cnVlXG4gIH0pXG4gIHN0b3AoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCB2b2ljZXNcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8VFRTVm9pY2VbXT59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgb3RoZXJQcm9taXNlOiB0cnVlXG4gIH0pXG4gIGdldFZvaWNlcygpOiBQcm9taXNlPFRUU1ZvaWNlW10+IHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==