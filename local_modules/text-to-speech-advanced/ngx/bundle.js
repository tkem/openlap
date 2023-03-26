'use strict';

var tslib = require('tslib');
var i0 = require('@angular/core');
var core = require('@awesome-cordova-plugins/core');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var i0__namespace = /*#__PURE__*/_interopNamespaceDefault(i0);

var TextToSpeechAdvanced = /** @class */ (function (_super) {
    tslib.__extends(TextToSpeechAdvanced, _super);
    function TextToSpeechAdvanced() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextToSpeechAdvanced.prototype.speak = function (textOrOptions) { return core.cordova(this, "speak", { "otherPromise": true }, arguments); };
    TextToSpeechAdvanced.prototype.stop = function () { return core.cordova(this, "stop", { "otherPromise": true }, arguments); };
    TextToSpeechAdvanced.prototype.getVoices = function () { return core.cordova(this, "getVoices", { "otherPromise": true }, arguments); };
    TextToSpeechAdvanced.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: TextToSpeechAdvanced, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    TextToSpeechAdvanced.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: TextToSpeechAdvanced });
    TextToSpeechAdvanced.pluginName = "Text To Speech Advanced";
    TextToSpeechAdvanced.plugin = "cordova-plugin-tts-advanced";
    TextToSpeechAdvanced.pluginRef = "TTS";
    TextToSpeechAdvanced.repo = "https://github.com/spasma/cordova-plugin-tts-advanced";
    TextToSpeechAdvanced.platforms = ["Android", "iOS"];
    TextToSpeechAdvanced = tslib.__decorate([], TextToSpeechAdvanced);
    return TextToSpeechAdvanced;
}(core.AwesomeCordovaNativePlugin));
i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: TextToSpeechAdvanced, decorators: [{
            type: i0.Injectable
        }], propDecorators: { speak: [], stop: [], getVoices: [] } });

exports.TextToSpeechAdvanced = TextToSpeechAdvanced;
