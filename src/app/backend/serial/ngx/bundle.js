'use strict';

var tslib = require('tslib');
var i0 = require('@angular/core');
var core = require('@awesome-cordova-plugins/core');
require('rxjs');

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

var Serial = /** @class */ (function (_super) {
    tslib.__extends(Serial, _super);
    function Serial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Serial.prototype.requestPermission = function (options) { return core.cordova(this, "requestPermission", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    Serial.prototype.open = function (options) { return core.cordova(this, "open", {}, arguments); };
    Serial.prototype.write = function (data) { return core.cordova(this, "write", {}, arguments); };
    Serial.prototype.writeHex = function (data) { return core.cordova(this, "writeHex", {}, arguments); };
    Serial.prototype.read = function () { return core.cordova(this, "read", {}, arguments); };
    Serial.prototype.registerReadCallback = function () { return core.cordova(this, "registerReadCallback", { "observable": true }, arguments); };
    Serial.prototype.close = function () { return core.cordova(this, "close", {}, arguments); };
    Serial.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Serial, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    Serial.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Serial });
    Serial.pluginName = "Serial";
    Serial.plugin = "cordovarduino";
    Serial.pluginRef = "serial";
    Serial.repo = "https://github.com/xseignard/cordovarduino";
    Serial.platforms = ["Android"];
    Serial = tslib.__decorate([], Serial);
    return Serial;
}(core.AwesomeCordovaNativePlugin));
i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Serial, decorators: [{
            type: i0.Injectable
        }], propDecorators: { requestPermission: [], open: [], write: [], writeHex: [], read: [], registerReadCallback: [], close: [] } });

exports.Serial = Serial;
