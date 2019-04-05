webpackJsonp([0],{

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__control_unit__ = __webpack_require__(372);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__control_unit__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__control_unit__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error_handler__ = __webpack_require__(373);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger__ = __webpack_require__(94);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__logger__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings__ = __webpack_require__(374);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__settings__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__settings__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__settings__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_3__settings__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__speech__ = __webpack_require__(375);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_4__speech__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__toast__ = __webpack_require__(376);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_5__toast__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__i18n_alert_controller__ = __webpack_require__(377);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_6__i18n_alert_controller__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_module__ = __webpack_require__(722);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_7__core_module__["a"]; });








//# sourceMappingURL=index.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__backend__ = __webpack_require__(52);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__backend__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ble__ = __webpack_require__(275);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demo__ = __webpack_require__(378);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__serial__ = __webpack_require__(379);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend_module__ = __webpack_require__(723);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__backend_module__["a"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rms_page__ = __webpack_require__(381);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__rms_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__race_settings_page__ = __webpack_require__(383);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__race_settings_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rms_module__ = __webpack_require__(729);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__rms_module__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LeaderboardItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var compare = {
    'position': function (lhs, rhs) {
        return lhs.position - rhs.position;
    },
    'number': function (lhs, rhs) {
        return lhs.id - rhs.id;
    }
};
var LeaderboardItem = /** @class */ (function () {
    function LeaderboardItem() {
    }
    return LeaderboardItem;
}());

var LeaderboardComponent = /** @class */ (function () {
    function LeaderboardComponent() {
    }
    Object.defineProperty(LeaderboardComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            this._items = items;
            if (items) {
                this.ordered = items.slice();
                this.ordered.sort(compare[this.order || 'position']);
                // TODO: move to rms?
                this.best = items.map(function (item) { return item.best; }).reduce(function (acc, times) {
                    times.forEach(function (time, index) {
                        if (time < (acc[index] || Infinity)) {
                            acc[index] = time;
                        }
                    });
                    return acc;
                }, []);
            }
            else {
                this.ordered = items;
                this.best = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], LeaderboardComponent.prototype, "fields", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], LeaderboardComponent.prototype, "order", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], LeaderboardComponent.prototype, "items", null);
    LeaderboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
            selector: 'leaderboard',template:/*ion-inline-start:"/home/tkem/src/openlap/src/rms/leaderboard/leaderboard.component.html"*/'<leaderboard-head class="row" [fields]="fields"></leaderboard-head>\n<leaderboard-item class="row" *ngFor="let item of ordered; let n = index;"\n                  [ngClass]="n % 2 ? \'odd\' : \'even\'"\n                  [fields]="fields" [item]="item" [items]="items" [best]="best">\n</leaderboard-item>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/rms/leaderboard/leaderboard.component.html"*/
        })
    ], LeaderboardComponent);
    return LeaderboardComponent;
}());

//# sourceMappingURL=leaderboard.component.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 223:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 223;

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BLEBackend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__carrera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core__ = __webpack_require__(13);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
var OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
var NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';
var DOLLAR = '$'.charCodeAt(0);
function wrapNative(observable, zone) {
    return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (subscriber) {
        var subscription = observable.subscribe({
            next: function (obj) { return zone.run(function () { return subscriber.next(obj); }); },
            error: function (obj) { return zone.run(function () { return subscriber.error(obj); }); },
            complete: function () { return zone.run(function () { return subscriber.complete(); }); }
        });
        return function () {
            subscription.unsubscribe();
        };
    });
}
function bufferToString(buffer) {
    // TODO: special DataView.convertToString() method?
    var v = new __WEBPACK_IMPORTED_MODULE_5__carrera__["c" /* DataView */](buffer);
    return v.toString();
}
var BLEPeripheral = /** @class */ (function () {
    function BLEPeripheral(device, ble, logger, zone) {
        this.ble = ble;
        this.logger = logger;
        this.zone = zone;
        this.type = 'ble';
        this.name = device.name;
        this.address = device.id;
    }
    BLEPeripheral.prototype.connect = function (connected, disconnected) {
        var observable = this.createObservable(connected, disconnected);
        var observer = this.createObserver(disconnected);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"].create(observer, observable);
    };
    BLEPeripheral.prototype.equals = function (other) {
        return other && other.type === this.type && other.address === this.address;
    };
    BLEPeripheral.prototype.createObservable = function (connected, disconnected) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (subscriber) {
            _this.logger.info('Connecting to BLE device ' + _this.address);
            var isConnected = false;
            var lastReceived = null;
            _this.lastWritten = null;
            _this.ble.connect(_this.address).subscribe({
                next: function (peripheral) {
                    _this.logger.info('Connected to BLE device', peripheral);
                    isConnected = true;
                    _this.ble.startNotification(_this.address, SERVICE_UUID, NOTIFY_UUID).subscribe({
                        next: function (data) {
                            if (_this.logger.isDebugEnabled()) {
                                var s = bufferToString(data);
                                if (s !== lastReceived) {
                                    _this.logger.debug('BLE received ' + s);
                                    lastReceived = s;
                                }
                            }
                            _this.onNotify(data, subscriber);
                        },
                        error: function (err) { return _this.onError(err, subscriber); }
                    });
                    if (connected) {
                        // this should resolve *after* this.ble.startNotification is installed
                        _this.ble.isConnected(_this.address).then(function () {
                            _this.logger.info('BLE device ready');
                            if (isConnected) {
                                _this.zone.run(function () { return connected.next(undefined); });
                            }
                        }).catch(function (err) {
                            _this.logger.error('BLE device not connected', err);
                        });
                    }
                },
                error: function (obj) {
                    if (obj instanceof Error) {
                        _this.logger.error('BLE connection error', obj);
                        _this.zone.run(function () { return subscriber.error(obj); });
                    }
                    else if (!isConnected) {
                        _this.logger.error('BLE connection error', obj);
                        _this.zone.run(function () { return subscriber.error(new Error('Connection error')); });
                    }
                    else {
                        _this.logger.info('BLE device disconnected', obj);
                        _this.zone.run(function () { return subscriber.complete(); });
                    }
                    isConnected = false;
                },
                complete: function () {
                    _this.logger.info('BLE connection closed');
                    _this.zone.run(function () { return subscriber.complete(); });
                    isConnected = false;
                }
            });
            return function () {
                _this.disconnect(disconnected);
            };
        });
    };
    BLEPeripheral.prototype.createObserver = function (disconnected) {
        var _this = this;
        return {
            next: function (value) {
                if (_this.logger.isDebugEnabled()) {
                    var s = bufferToString(value);
                    if (s !== _this.lastWritten) {
                        _this.logger.debug('BLE write ' + s);
                        _this.lastWritten = s;
                    }
                }
                _this.write(value);
            },
            error: function (err) { return _this.logger.error('BLE user error', err); },
            complete: function () { return _this.disconnect(disconnected); }
        };
    };
    BLEPeripheral.prototype.write = function (value) {
        var _this = this;
        this.ble.writeWithoutResponse(this.address, SERVICE_UUID, OUTPUT_UUID, value).catch(function (error) {
            _this.logger.error('BLE write error', error);
        });
    };
    BLEPeripheral.prototype.disconnect = function (disconnected) {
        var _this = this;
        this.logger.debug('Closing BLE connection to ' + this.address);
        this.ble.disconnect(this.address).then(function () {
            _this.logger.info('BLE disconnected from ' + _this.address);
        }).catch(function (error) {
            _this.logger.error('BLE disconnect error', error);
        }).then(function () {
            if (disconnected) {
                _this.zone.run(function () { return disconnected.next(undefined); });
            }
        });
    };
    BLEPeripheral.prototype.onNotify = function (data, subscriber) {
        // strip trailing '$' and prepend missing '0'/'?' for notifications
        // TODO: only handle version specially and drop '?'?
        var view = new Uint8Array(data);
        if (view[view.length - 1] == DOLLAR) {
            view.copyWithin(1, 0);
            view[0] = view.length == 6 ? 0x30 : 0x3f;
        }
        this.zone.run(function () { return subscriber.next(view.buffer); });
    };
    BLEPeripheral.prototype.onError = function (error, subscriber) {
        this.zone.run(function () { return subscriber.error(error); });
    };
    return BLEPeripheral;
}());
var BLEBackend = /** @class */ (function (_super) {
    __extends(BLEBackend, _super);
    function BLEBackend(ble, logger, platform, zone) {
        var _this = _super.call(this) || this;
        _this.ble = ble;
        _this.logger = logger;
        _this.platform = platform;
        _this.zone = zone;
        _this.scanner = __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].from(_this.platform.ready()).switchMap(function (readySource) {
            if (readySource == 'cordova') {
                // TODO: use BLE state listeners when available in ionic-native?
                return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].interval(1000).startWith(null).switchMap(function () {
                    return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].from(_this.ble.isEnabled().then(function () { return true; }, function () { return false; }));
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of(false);
            }
        }).distinctUntilChanged().switchMap(function (enabled) {
            if (enabled) {
                _this.logger.debug('Start scanning for BLE devices');
                return wrapNative(_this.ble.startScanWithOptions([], { reportDuplicates: true }), _this.zone).finally(function () {
                    _this.logger.debug('Stop scanning for BLE devices');
                });
            }
            else {
                _this.logger.debug('Not scanning for BLE devices');
                return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].empty();
            }
        }).share();
        return _this;
    }
    BLEBackend.prototype.scan = function () {
        var _this = this;
        // TODO: use and adapt rssi?
        return this.scanner.distinct(function (device) { return device.id; }).do(function (device) {
            _this.logger.debug('Discovered BLE device:', device);
        }).filter(function (device) {
            return /Control.Unit/i.test(device.name || '');
        }).map(function (device) {
            _this.logger.info('Discovered new BLE device:', device);
            return new BLEPeripheral(device, _this.ble, _this.logger, _this.zone);
        });
    };
    BLEBackend = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_6__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], BLEBackend);
    return BLEBackend;
}(__WEBPACK_IMPORTED_MODULE_4__backend__["a" /* Backend */]));

//# sourceMappingURL=ble.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataView; });
var DataView = /** @class */ (function () {
    function DataView(buffer, byteOffset, byteLength) {
        if (byteLength !== undefined) {
            this.array = new Uint8Array(buffer, byteOffset, byteLength);
        }
        else if (byteOffset) {
            this.array = new Uint8Array(buffer, byteOffset);
        }
        else {
            this.array = new Uint8Array(buffer);
        }
    }
    Object.defineProperty(DataView.prototype, "buffer", {
        get: function () {
            return this.array.buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataView.prototype, "byteLength", {
        get: function () {
            return this.array.byteLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataView.prototype, "byteOffset", {
        get: function () {
            return this.array.byteOffset;
        },
        enumerable: true,
        configurable: true
    });
    DataView.prototype.getUint4 = function (byteOffset) {
        return this.array[byteOffset] & 0xf;
    };
    DataView.prototype.getUint8 = function (byteOffset) {
        return (this.array[byteOffset] & 0xf) | ((this.array[byteOffset + 1] & 0xf) << 4);
    };
    DataView.prototype.getUint32 = function (byteOffset) {
        var value = 0;
        value |= (this.array[byteOffset + 0] & 0xf) << 24;
        value |= (this.array[byteOffset + 1] & 0xf) << 28;
        value |= (this.array[byteOffset + 2] & 0xf) << 16;
        value |= (this.array[byteOffset + 3] & 0xf) << 20;
        value |= (this.array[byteOffset + 4] & 0xf) << 8;
        value |= (this.array[byteOffset + 5] & 0xf) << 12;
        value |= (this.array[byteOffset + 6] & 0xf) << 0;
        value |= (this.array[byteOffset + 7] & 0xf) << 4;
        return value;
    };
    DataView.prototype.getUint8Array = function (byteOffset, byteLength) {
        return this.array.subarray(byteOffset, byteOffset + byteLength).map(function (n) { return n & 0xf; });
    };
    DataView.prototype.setUint4 = function (byteOffset, value) {
        this.array[byteOffset] = value | 0x30;
    };
    DataView.prototype.setUint8 = function (byteOffset, value) {
        this.array[byteOffset] = (value & 0xf) | 0x30;
        this.array[byteOffset + 1] = (value >> 4) | 0x30;
    };
    DataView.prototype.toString = function (byteOffset, byteLength) {
        return String.fromCharCode.apply(null, this.subarray(byteOffset, byteLength));
    };
    // FIXME: should use values, only
    DataView.from = function (cmd) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var array = new Uint8Array(values.length + 2);
        var crc = array[0] = cmd.charCodeAt(0);
        for (var i = 0; i != values.length; ++i) {
            var value = values[i];
            array[i + 1] = 0x30 | value;
            crc += value;
        }
        array[array.length - 1] = 0x30 | (crc & 0xf);
        return new DataView(array.buffer);
    };
    DataView.fromString = function (s) {
        // Note: TypedArray.from() seems to be not supported on iOS
        var array = new Uint8Array(s.split('').map(function (c) { return c.charCodeAt(0); }));
        return new DataView(array.buffer);
    };
    DataView.prototype.subarray = function (byteOffset, byteLength) {
        if (byteLength !== undefined) {
            return this.array.subarray(byteOffset, byteOffset + byteLength);
        }
        else if (byteOffset) {
            return this.array.subarray(byteOffset);
        }
        else {
            return this.array;
        }
    };
    return DataView;
}());

//# sourceMappingURL=data-view.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export controlUnitFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CONTROL_UNIT_SUBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONTROL_UNIT_PROVIDER; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__carrera__ = __webpack_require__(43);


function controlUnitFactory(subject) {
    return subject.value;
}
var CONTROL_UNIT_SUBJECT = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]('ControlUnitSubject');
var CONTROL_UNIT_PROVIDER = {
    provide: __WEBPACK_IMPORTED_MODULE_1__carrera__["a" /* ControlUnit */],
    useFactory: controlUnitFactory,
    deps: [CONTROL_UNIT_SUBJECT]
};
//# sourceMappingURL=control-unit.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggingErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoggingErrorHandler = /** @class */ (function () {
    function LoggingErrorHandler(logger) {
        this.logger = logger;
        this.defaultHandler = new __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicErrorHandler */]();
    }
    LoggingErrorHandler.prototype.handleError = function (error) {
        // FIXME: this will write to console twice
        this.defaultHandler.handleError(error);
        this.logger.error('Error:', error);
    };
    LoggingErrorHandler = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__logger__["a" /* Logger */]])
    ], LoggingErrorHandler);
    return LoggingErrorHandler;
}());

//# sourceMappingURL=error-handler.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RaceOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var COLORS = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
    '#ffffff',
    '#cccccc'
];
var NOTIFICATIONS = {
    falsestart: true,
    finished: true,
    finallap: true,
    bestlap: true,
    bests1: false,
    bests2: false,
    bests3: false,
    fuel2: true,
    fuel1: true,
    fuel0: true,
    pitenter: false,
    pitexit: false,
    yellowflag: true,
    greenflag: true
};
var Connection = /** @class */ (function () {
    function Connection() {
        this.connectionTimeout = 3000;
        this.requestTimeout = 2000;
        this.minReconnectDelay = 3000;
        this.maxReconnectDelay = 8000;
    }
    return Connection;
}());

var Options = /** @class */ (function () {
    function Options() {
        this.cumode = true;
        this.debug = false;
        this.fixedorder = false;
        this.language = '';
        this.speech = true;
    }
    return Options;
}());

var RaceOptions = /** @class */ (function () {
    function RaceOptions(mode) {
        this.mode = mode;
        this.slotmode = false;
        this.auto = false;
        this.pace = false;
        this.minLapTime = 500; // FIXME: Configurable?
        switch (mode) {
            case 'practice':
                this.laps = 0;
                this.time = 0;
                this.auto = true;
                this.pace = true;
                break;
            case 'qualifying':
                this.laps = 0;
                this.time = 3 * 60 * 1000;
                break;
            case 'race':
                this.laps = 30;
                this.time = 0;
                break;
        }
    }
    return RaceOptions;
}());

var Settings = /** @class */ (function () {
    function Settings(storage) {
        this.storage = storage;
        this.subjects = new Map();
    }
    Settings.prototype.clear = function () {
        var _this = this;
        return this.storage.ready().then(function () {
            _this.storage.clear().then(function () {
                _this.subjects.forEach(function (subject) { return subject.next(null); });
            });
        });
    };
    Settings.prototype.getConnection = function () {
        return this.get('connection').map(function (value) {
            if (value) {
                return Object.assign(new Connection(), value);
            }
            else {
                return null;
            }
        });
    };
    Settings.prototype.setConnection = function (value) {
        return this.set('connection', value);
    };
    Settings.prototype.getDrivers = function () {
        return this.get('drivers').map(function (value) {
            var result = new Array(8);
            for (var i = 0; i != result.length; ++i) {
                result[i] = Object.assign({ color: COLORS[i] }, value ? value[i] : null);
            }
            return result;
        });
    };
    Settings.prototype.setDrivers = function (value) {
        return this.set('drivers', value);
    };
    Settings.prototype.getNotifications = function () {
        return this.get('notifications').map(function (value) {
            var result = {};
            for (var _i = 0, _a = Object.keys(NOTIFICATIONS); _i < _a.length; _i++) {
                var key = _a[_i];
                result[key] = Object.assign({ enabled: NOTIFICATIONS[key] }, value ? value[key] : null);
            }
            return result;
        });
    };
    Settings.prototype.setNotifications = function (value) {
        return this.set('notifications', value);
    };
    Settings.prototype.getOptions = function () {
        return this.get('options').map(function (value) {
            return Object.assign(new Options(), value);
        });
    };
    Settings.prototype.setOptions = function (value) {
        return this.set('options', value);
    };
    Settings.prototype.getQualifyingSettings = function () {
        return this.get('qualifying').map(function (value) {
            return Object.assign(new RaceOptions('qualifying'), value);
        });
    };
    Settings.prototype.setQualifyingSettings = function (value) {
        return this.set('qualifying', value);
    };
    Settings.prototype.getRaceSettings = function () {
        return this.get('race').map(function (value) {
            return Object.assign(new RaceOptions('race'), value);
        });
    };
    Settings.prototype.setRaceSettings = function (value) {
        return this.set('race', value);
    };
    Settings.prototype.get = function (key) {
        var _this = this;
        var subject = this.subjects.get(key);
        if (!subject) {
            this.subjects.set(key, subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["ReplaySubject"](1));
            this.storage.ready().then(function () {
                _this.storage.get(key).then(function (value) {
                    subject.next(value);
                }).catch(function (error) {
                    subject.error(error);
                });
            });
        }
        return subject;
    };
    Settings.prototype.set = function (key, value) {
        var _this = this;
        return this.storage.ready().then(function () {
            return _this.storage.set(key, value).then(function () {
                var subject = _this.subjects.get(key);
                if (subject) {
                    subject.next(value);
                }
            });
        }).then(function () {
            // convert to void
            return;
        });
    };
    Settings = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], Settings);
    return Settings;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Speech; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_text_to_speech__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logger__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WebSpeech = /** @class */ (function () {
    function WebSpeech(speech, logger) {
        this.speech = speech;
        logger.debug('Using Web Speech API');
    }
    WebSpeech.prototype.speak = function (textOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var utterance = _this['__utterance__'] = new SpeechSynthesisUtterance();
            if (typeof textOrOptions === 'string') {
                utterance.text = textOrOptions;
            }
            else {
                utterance.text = textOrOptions.text;
                utterance.lang = textOrOptions.locale;
                utterance.rate = textOrOptions.rate;
            }
            utterance.onend = function () {
                resolve();
            };
            utterance.onerror = function (e) {
                reject(e);
            };
            try {
                _this.speech.speak(utterance);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    WebSpeech.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.speech.cancel();
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return WebSpeech;
}());
var DummySpeech = /** @class */ (function () {
    function DummySpeech(logger) {
        logger.info('Speech not supported on this platform');
    }
    DummySpeech.prototype.speak = function (textOrOptions) {
        return Promise.resolve();
    };
    DummySpeech.prototype.stop = function () {
        return Promise.resolve();
    };
    return DummySpeech;
}());
var Speech = /** @class */ (function () {
    function Speech(tts, logger, platform) {
        this.tts = tts;
        this.logger = logger;
        this.locale = 'en-US';
        this.promise = Promise.resolve();
        this.pending = 0;
        this.rate = 1.0;
        if (platform.is('cordova')) {
            // See https://github.com/vilic/cordova-plugin-tts/issues/40
            this.rate = platform.is('ios') ? 1.5 : 1.0;
        }
        else if (window.speechSynthesis) {
            this.tts = new WebSpeech(window.speechSynthesis, logger);
        }
        else {
            this.tts = new DummySpeech(logger);
        }
    }
    Speech.prototype.setLocale = function (locale) {
        this.locale = locale;
    };
    Speech.prototype.setRate = function (rate) {
        this.rate = rate;
    };
    Speech.prototype.speak = function (message) {
        var _this = this;
        // TODO: message priorities?
        if (message != this.lastMessage) {
            this.lastMessage = message;
            this.pending++;
            this.promise = this.promise.then(function () {
                if (--_this.pending === 0) {
                    return _this.tts.speak({ text: message, locale: _this.locale || 'en-us', rate: _this.rate }).then(function () {
                        if (_this.pending === 0) {
                            _this.lastMessage = null;
                        }
                    });
                }
                else {
                    _this.logger.warn('Speech cancelled: ' + message);
                }
            }).catch(function (error) {
                _this.logger.error('Speech error', error);
            });
        }
        else {
            this.logger.info('Speech duplicate dismissed: ' + message);
        }
    };
    Speech = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_text_to_speech__["a" /* TextToSpeech */], __WEBPACK_IMPORTED_MODULE_3__logger__["a" /* Logger */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Platform */]])
    ], Speech);
    return Speech;
}());

//# sourceMappingURL=speech.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toast; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__ = __webpack_require__(272);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NativeToastProvider = /** @class */ (function () {
    function NativeToastProvider(toast) {
        this.toast = toast;
    }
    NativeToastProvider.prototype.show = function (message, duration, position) {
        var _this = this;
        return this.toast.hide().then(function () {
            return new Promise(function (resolve, reject) {
                _this.toast.show(message, duration.toString(), position).subscribe(function () { return resolve(); }, function (error) { return reject(error); });
            });
        });
    };
    return NativeToastProvider;
}());
var IonicToastProvider = /** @class */ (function () {
    function IonicToastProvider(controller) {
        this.controller = controller;
    }
    IonicToastProvider.prototype.show = function (message, duration, position) {
        var toast = this.controller.create({
            message: message,
            duration: duration,
            position: position === 'center' ? 'middle' : position,
            showCloseButton: true
        });
        return toast.present();
    };
    return IonicToastProvider;
}());
var Toast = /** @class */ (function () {
    function Toast(platform, controller, nativeToast) {
        this.toast = platform.is('cordova') ? new NativeToastProvider(nativeToast) : new IonicToastProvider(controller);
    }
    Toast.prototype.show = function (message, duration, position) {
        return this.toast.show(message, duration, position);
    };
    Toast.prototype.showTop = function (message, duration) {
        return this.show(message, duration, 'top');
    };
    Toast.prototype.showBottom = function (message, duration) {
        return this.show(message, duration, 'bottom');
    };
    Toast.prototype.showCenter = function (message, duration) {
        return this.show(message, duration, 'center');
    };
    Toast = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__["a" /* Toast */]])
    ], Toast);
    return Toast;
}());

//# sourceMappingURL=toast.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return I18nAlertController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var I18nAlertController = /** @class */ (function () {
    function I18nAlertController(alert, translate) {
        this.alert = alert;
        this.translate = translate;
    }
    I18nAlertController.prototype.create = function (opts) {
        var _this = this;
        // create returns Alert, so use synchronous translate.instant()
        if (opts) {
            opts = Object.assign({}, opts, {
                title: opts.title ? this.translate.instant(opts.title) : opts.title,
                subTitle: opts.subTitle ? this.translate.instant(opts.subTitle) : opts.subTitle,
                message: opts.message ? this.translate.instant(opts.message) : opts.message,
                buttons: (opts.buttons || []).map(function (button) {
                    if (typeof button === 'string') {
                        return _this.translate.instant(button);
                    }
                    else {
                        return Object.assign({}, button, { text: _this.translate.instant(button.text) });
                    }
                })
            });
        }
        return this.alert.create(opts);
    };
    I18nAlertController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], I18nAlertController);
    return I18nAlertController;
}());

//# sourceMappingURL=i18n-alert.controller.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoBackend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__backend__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__carrera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(13);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VERSION = '5336';
var TIMEOUT_RATE = 0.0001;
var ERROR_RATE = 0.0001;
function random(min, max) {
    return min + Math.random() * (max - min);
}
function toString(buffer) {
    var array = new Uint8Array(buffer);
    var string = String.fromCharCode.apply(null, array);
    return string;
}
var Car = /** @class */ (function () {
    function Car(id) {
        this.sector = 0;
        this.pit = false;
        this.events = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.id = id;
        this.fuel = this.id == '7' || this.id == '8' ? 0 : 0xff;
    }
    Car.prototype.start = function (minSectorTime, maxSectorTime, sectors, delay) {
        var _this = this;
        if (sectors === void 0) { sectors = 1; }
        if (delay === void 0) { delay = 0; }
        this.minSectorTime = minSectorTime;
        this.maxSectorTime = maxSectorTime;
        this.sectors = sectors;
        this.timeout = setTimeout(function () { return _this.onNext(); }, delay);
    };
    Car.prototype.stop = function () {
        clearTimeout(this.timeout);
    };
    Car.prototype.onRefuel = function () {
        var _this = this;
        this.fuel += 0x10;
        if (this.fuel >= random(0xc0, 0xf0)) {
            this.timeout = setTimeout(function () { return _this.onNext(); }, this.fuelTime());
        }
        else {
            this.timeout = setTimeout(function () { return _this.onRefuel(); }, 500);
        }
    };
    Car.prototype.onNext = function () {
        var _this = this;
        if (++this.sector > this.sectors) {
            this.sector = 1;
        }
        if (this.id == '7' || this.id == '8') {
            this.events.emit(this);
            this.timeout = setTimeout(function () { return _this.onNext(); }, random(this.minSectorTime, this.maxSectorTime));
        }
        else {
            if (this.fuel >= 0x10 || this.sector !== 1) {
                this.events.emit(this);
            }
            if (this.fuel < random(0x10, 0x30) && this.sector === 1) {
                this.pit = true;
                this.timeout = setTimeout(function () { return _this.onRefuel(); }, 1500);
            }
            else {
                this.timeout = setTimeout(function () { return _this.onFuel(); }, this.fuelTime());
            }
        }
    };
    Car.prototype.onFuel = function () {
        var _this = this;
        this.pit = false;
        this.fuel = Math.max(0, this.fuel - random(0x04, 0x10));
        this.timeout = setTimeout(function () { return _this.onNext(); }, this.fuelTime());
    };
    Car.prototype.fuelTime = function () {
        return random(this.minSectorTime, this.maxSectorTime) / 2;
    };
    return Car;
}());
var DemoPeripheral = /** @class */ (function () {
    function DemoPeripheral(name, mode, logger) {
        var _this = this;
        this.name = name;
        this.mode = mode;
        this.logger = logger;
        this.start = Date.now();
        this.startSequence = 0;
        this.cars = [
            new Car('1'),
            new Car('2'),
            new Car('3'),
            new Car('4'),
            new Car('5'),
            new Car('6'),
            new Car('7'),
            new Car('8')
        ];
        this.laps = [];
        this.config = {
            numCars: 8,
            numSectors: 3,
            maxStartTime: 1500,
            minSectorTime: 3000,
            maxSectorTime: 4000
        };
        this.type = 'demo';
        this.version = __WEBPACK_IMPORTED_MODULE_3__carrera__["c" /* DataView */].from.apply(__WEBPACK_IMPORTED_MODULE_3__carrera__["c" /* DataView */], ['0'].concat(VERSION.split('').map(function (c) { return c.charCodeAt(0); }))).buffer;
        for (var i = 0; i != this.config.numCars; ++i) {
            this.cars[i].events.subscribe(function (car) { return _this.laps.push(_this.createLap(car.id, car.sector)); });
        }
        this.startAll();
    }
    DemoPeripheral.prototype.connect = function (connected, disconnected) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"].create(this.createObserver(), this.createObservable(connected, disconnected));
    };
    DemoPeripheral.prototype.equals = function (other) {
        return other && other.type === this.type && other.name == this.name;
    };
    DemoPeripheral.prototype.createObservable = function (connected, disconnected) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"](function (subscriber) {
            _this.logger.info('Creating Demo observable with mode=' + _this.mode);
            _this.subscriber = subscriber;
            setTimeout(function () {
                if (connected) {
                    connected.next(undefined);
                }
            }, 100);
            return function () {
                _this.logger.info('Destroying Demo observable');
                if (disconnected) {
                    disconnected.next(undefined);
                }
                delete _this.subscriber;
            };
        });
    };
    DemoPeripheral.prototype.createObserver = function () {
        var _this = this;
        return {
            next: function (value) {
                if (Math.random() < ERROR_RATE) {
                    if (_this.subscriber) {
                        console.log('Random Demo error');
                        _this.subscriber.error(new Error('Demo Error'));
                    }
                    return;
                }
                //console.log('Demo connection next:', toString(value));
                if (toString(value) != '?') {
                    console.log('Demo CU received ' + toString(value));
                }
                if (toString(value) == 'T1') {
                    _this.onESC();
                }
                if (toString(value) == 'T2') {
                    _this.onStart();
                }
                if (Math.random() < TIMEOUT_RATE) {
                    console.log('Random Demo timeout');
                    return;
                }
                setTimeout(function () {
                    if (_this.subscriber) {
                        // console.log('Demo connection response to ' + toString(value));
                        if (toString(value) == '0') {
                            _this.subscriber.next(_this.version);
                        }
                        else {
                            // TODO: command response
                            _this.subscriber.next(_this.laps.length ? _this.laps.shift() : _this.createStatus());
                        }
                    }
                }, 100);
            },
            error: function (err) {
                console.log('Demo connection error:', err);
            },
            complete: function () {
                console.log('Demo connection complete');
                _this.subscriber.complete();
            }
        };
    };
    DemoPeripheral.prototype.createLap = function (id, group) {
        if (group === void 0) { group = 1; }
        // TODO: use DataView, add CRC
        var time = Date.now() - this.start;
        return __WEBPACK_IMPORTED_MODULE_3__carrera__["c" /* DataView */].from('?', parseInt(id), (time >> 24) & 0x0f, (time >> 28) & 0x0f, (time >> 16) & 0x0f, (time >> 20) & 0x0f, (time >> 8) & 0x0f, (time >> 12) & 0x0f, (time >> 0) & 0x0f, (time >> 4) & 0x0f, group).buffer;
    };
    DemoPeripheral.prototype.createStatus = function () {
        return __WEBPACK_IMPORTED_MODULE_3__carrera__["c" /* DataView */].from('?', 10, (this.cars[0].fuel) >> 4 & 0xf, (this.cars[1].fuel) >> 4 & 0xf, (this.cars[2].fuel) >> 4 & 0xf, (this.cars[3].fuel) >> 4 & 0xf, (this.cars[4].fuel) >> 4 & 0xf, (this.cars[5].fuel) >> 4 & 0xf, (this.cars[6].fuel) >> 4 & 0xf, (this.cars[7].fuel) >> 4 & 0xf, this.startSequence, this.mode, this.getPitMask(0, 4), this.getPitMask(4, 8), 8 // position tower display
        ).buffer;
    };
    DemoPeripheral.prototype.getPitMask = function (begin, end) {
        var mask = 0;
        for (var i = begin; i != end; ++i) {
            mask >>= 1;
            mask |= (this.cars[i].pit ? 8 : 0);
        }
        return mask;
    };
    DemoPeripheral.prototype.onStart = function () {
        var _this = this;
        if (this.startSequence == 0) {
            this.stopAll();
            this.startSequence = 1;
            //this.error('Forced error');
        }
        else if (this.startSequence == 7) {
            this.startAll();
            this.startSequence = 0;
        }
        else {
            this.startSequence++;
            setTimeout(function () { return _this.onStart(); }, 1000);
        }
    };
    DemoPeripheral.prototype.onESC = function () {
        if (this.startSequence == 1) {
            this.startAll();
            this.startSequence = 0;
        }
    };
    DemoPeripheral.prototype.startAll = function () {
        for (var i = 0; i != this.config.numCars; ++i) {
            this.cars[i].start(this.config.minSectorTime, this.config.maxSectorTime, this.config.numSectors, random(0, this.config.maxStartTime));
        }
    };
    DemoPeripheral.prototype.stopAll = function () {
        for (var i = 0; i != this.config.numCars; ++i) {
            this.cars[i].stop();
        }
    };
    return DemoPeripheral;
}());
var DemoBackend = /** @class */ (function (_super) {
    __extends(DemoBackend, _super);
    function DemoBackend(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    DemoBackend.prototype.scan = function () {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(new DemoPeripheral('Demo', 0x6, this.logger));
    };
    DemoBackend = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__core__["f" /* Logger */]])
    ], DemoBackend);
    return DemoBackend;
}(__WEBPACK_IMPORTED_MODULE_2__backend__["a" /* Backend */]));

;
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SerialBackend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_serial__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__backend__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core__ = __webpack_require__(13);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BAUD_RATE = 19200;
var DOLLAR = '$'.charCodeAt(0);
function concat(lhs, rhs) {
    if (lhs.length == 0) {
        return rhs;
    }
    else if (rhs.length == 0) {
        return lhs;
    }
    else {
        var res = new Uint8Array(lhs.length + rhs.length);
        res.set(lhs, 0);
        res.set(rhs, lhs.byteLength);
        return res;
    }
}
var SerialPeripheral = /** @class */ (function () {
    function SerialPeripheral(serial, logger, zone) {
        this.serial = serial;
        this.logger = logger;
        this.zone = zone;
        this.type = 'serial';
        this.name = 'Serial USB OTG';
        this.connected = false;
    }
    SerialPeripheral.prototype.connect = function (connected, disconnected) {
        var observable = this.createObservable(connected, disconnected);
        var observer = this.createObserver(disconnected);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Subject"].create(observer, observable);
    };
    SerialPeripheral.prototype.equals = function (other) {
        return other && other.type === this.type;
    };
    SerialPeripheral.prototype.createObservable = function (connected, disconnected) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"](function (subscriber) {
            _this.logger.info('Connecting to serial port');
            _this.open({ baudRate: BAUD_RATE, sleepOnPause: false }).then(function () {
                _this.connected = true;
                _this.logger.info('Connected to serial port');
                var buffer = new Uint8Array(0);
                _this.serial.registerReadCallback().subscribe({
                    next: function (data) {
                        buffer = concat(buffer, new Uint8Array(data));
                        var index = -1;
                        var _loop_1 = function () {
                            var array = new Uint8Array(buffer.subarray(0, index));
                            buffer = buffer.subarray(index + 1);
                            if (_this.logger.isDebugEnabled()) {
                                var str = String.fromCharCode.apply(null, array);
                                if (str !== _this.lastReceived) {
                                    _this.logger.debug('Serial received ' + str);
                                    _this.lastReceived = str;
                                }
                            }
                            _this.zone.run(function () { return subscriber.next(array.buffer); });
                        };
                        while ((index = buffer.indexOf(DOLLAR)) != -1) {
                            _loop_1();
                        }
                    },
                    error: function (err) {
                        _this.logger.error('Error reading from serial port', err);
                        _this.zone.run(function () { return subscriber.error(err); });
                    }
                });
                if (connected) {
                    _this.zone.run(function () { return connected.next(undefined); });
                }
            }).catch(function (error) {
                _this.logger.error('Error connecting to serial port', error);
                _this.zone.run(function () { return subscriber.error(error); });
            });
            return function () {
                _this.close(disconnected);
            };
        });
    };
    SerialPeripheral.prototype.createObserver = function (disconnected) {
        var _this = this;
        return {
            next: function (value) { return _this.write(value); },
            error: function (err) { return _this.logger.error('Serial user error', err); },
            complete: function () { return _this.close(disconnected); }
        };
    };
    SerialPeripheral.prototype.open = function (options) {
        return this.serial.open(options);
    };
    SerialPeripheral.prototype.write = function (value) {
        var _this = this;
        var str = String.fromCharCode.apply(null, new Uint8Array(value));
        if (this.logger.isDebugEnabled()) {
            if (str !== this.lastWritten) {
                this.logger.debug('Serial write ' + str);
                this.lastWritten = str;
            }
        }
        this.serial.write('"' + str + '$').catch(function (error) {
            _this.logger.error('Serial write error', error);
        });
    };
    SerialPeripheral.prototype.close = function (disconnected) {
        var _this = this;
        if (this.connected) {
            this.logger.info('Closing serial port');
            this.serial.close().then(function () {
                _this.logger.info('Serial port closed');
            }).catch(function (error) {
                _this.logger.error('Error closing serial port', error);
            }).then(function () {
                if (disconnected) {
                    _this.zone.run(function () { return disconnected.next(undefined); });
                }
            });
            this.connected = false;
        }
    };
    return SerialPeripheral;
}());
var SerialBackend = /** @class */ (function (_super) {
    __extends(SerialBackend, _super);
    function SerialBackend(device, serial, logger, platform, zone) {
        var _this = _super.call(this) || this;
        _this.device = device;
        _this.serial = serial;
        _this.logger = logger;
        _this.platform = platform;
        _this.zone = zone;
        _this.scanner = __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].from(_this.platform.ready()).switchMap(function (readySource) {
            if (readySource == 'cordova' && platform.is('android') && !_this.device.isVirtual) {
                return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].from(_this.serial.requestPermission().then(function () { return true; }, function () { return false; }));
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].of(false);
            }
        }).do(function (enabled) {
            _this.logger.debug('Serial device ' + (enabled ? '' : 'not') + ' enabled');
        }).share();
        return _this;
    }
    SerialBackend.prototype.scan = function () {
        var _this = this;
        return this.scanner.switchMap(function (enabled) {
            if (enabled) {
                return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].of(new SerialPeripheral(_this.serial, _this.logger, _this.zone));
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].empty();
            }
        });
    };
    SerialBackend = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_serial__["a" /* Serial */],
            __WEBPACK_IMPORTED_MODULE_6__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], SerialBackend);
    return SerialBackend;
}(__WEBPACK_IMPORTED_MODULE_5__backend__["a" /* Backend */]));

;
//# sourceMappingURL=serial.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var ConnectionsComponent = /** @class */ (function () {
    function ConnectionsComponent(backends, logger, platform, settings, toast, translate) {
        this.backends = backends;
        this.logger = logger;
        this.platform = platform;
        this.settings = settings;
        this.toast = toast;
        this.translate = translate;
    }
    ConnectionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function (readySource) {
            _this.peripherals = __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].from(_this.backends.map(function (backend) { return backend.scan().catch(function (e, caught) {
                _this.logger.error('Scan error:', e);
                _this.showToast(e.toString());
                return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].empty();
            }); })).mergeAll().scan(function (result, value) { return result.concat(value); }, []);
        });
    };
    ConnectionsComponent.prototype.onSelect = function (peripheral) {
        var _this = this;
        this.settings.getConnection().take(1).subscribe(function (connection) {
            _this.settings.setConnection(Object.assign({}, connection, {
                type: peripheral.type,
                name: peripheral.name,
                address: peripheral.address
            }));
        });
    };
    ConnectionsComponent.prototype.showToast = function (message) {
        var _this = this;
        this.translate.get(message).toPromise().then(function (message) {
            return _this.toast.showCenter(message, 3000);
        }).catch(function (error) {
            _this.logger.error('Error showing toast', error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], ConnectionsComponent.prototype, "selected", void 0);
    ConnectionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-connections',template:/*ion-inline-start:"/home/tkem/src/openlap/src/menu/connections.component.html"*/'<ng-template ngFor let-peripheral [ngForOf]="peripherals | async">\n  <button ion-item menuClose (click)="onSelect(peripheral)" *ngIf="!peripheral.equals(selected)">\n    <h2>{{peripheral.name}}</h2>\n    <h4>{{peripheral.address}}</h4>\n  </button>\n</ng-template>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/menu/connections.component.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__backend__["a" /* Backend */])),
        __metadata("design:paramtypes", [Array, __WEBPACK_IMPORTED_MODULE_5__core__["f" /* Logger */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__core__["i" /* Settings */],
            __WEBPACK_IMPORTED_MODULE_5__core__["k" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], ConnectionsComponent);
    return ConnectionsComponent;
}());

//# sourceMappingURL=connections.component.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RmsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__carrera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rms_menu__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__session__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_fromEvent__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_observable_fromEvent__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ORIENTATION = {
    portrait: 'code',
    landscape: 'number name'
};
var FIELDS = [{
        // no fuel/pit lane
        practice: [
            'bestlap gap int lastlap laps status',
            'bestlap sector1 sector2 sector3 lastlap status'
        ],
        qualifying: [
            'bestlap gap int lastlap laps status',
            'bestlap sector1 sector2 sector3 lastlap status'
        ],
        race: [
            'time bestlap lastlap laps status',
            'time sector1 sector2 sector3 lastlap status',
        ]
    }, {
        // with fuel/pit lane
        practice: [
            'bestlap gap int lastlap laps fuel status',
            'bestlap sector1 sector2 sector3 lastlap fuel status'
        ],
        qualifying: [
            'bestlap gap int lastlap laps fuel status',
            'bestlap sector1 sector2 sector3 lastlap fuel status'
        ],
        race: [
            'time bestlap lastlap laps pits fuel status',
            'time sector1 sector2 sector3 lastlap fuel status'
        ]
    }];
var RmsPage = /** @class */ (function () {
    function RmsPage(cu, logger, settings, speech, params, popover, translate) {
        var _this = this;
        this.cu = cu;
        this.logger = logger;
        this.settings = settings;
        this.speech = speech;
        this.popover = popover;
        this.translate = translate;
        this.options = params.data;
        var start = this.cu.getStart().distinctUntilChanged();
        var state = this.cu.getState().distinctUntilChanged();
        var mode = this.cu.getMode().distinctUntilChanged();
        // use "resize" event for easier testing on browsers
        var orientation = __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].fromEvent(window, 'resize').startWith(undefined).map(function () {
            return window.innerWidth < window.innerHeight ? 'portrait' : 'landscape';
        }).distinctUntilChanged();
        this.slides = mode.startWith(0).combineLatest(orientation).map(function (_a) {
            var mode = _a[0], orientation = _a[1];
            return FIELDS[mode & 0x03 ? 1 : 0][_this.options.mode].map(function (s) {
                return (ORIENTATION[orientation] + ' ' + s).split(/\s+/);
            });
        });
        this.speechEnabled = settings.getOptions().map(function (options) { return options.speech; });
        this.sortorder = settings.getOptions().map(function (options) { return options.fixedorder ? 'number' : 'position'; });
        this.start = start;
        this.lights = start.map(function (value) {
            return value == 1 ? 5 : value > 1 && value < 7 ? value - 1 : 0;
        });
        this.blink = state.combineLatest(start, function (state, value) {
            return state !== 'connected' || value >= 8;
        });
        this.pitlane = mode.map(function (value) { return (value & 0x04) != 0; });
        this.keySupported = this.cu.getVersion().distinctUntilChanged().map(function (v) { return v >= '5331'; });
    }
    RmsPage.prototype.ngOnInit = function () {
        this.onStart();
    };
    RmsPage.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    RmsPage.prototype.onStart = function () {
        var _this = this;
        var session = this.session = new __WEBPACK_IMPORTED_MODULE_6__session__["a" /* Session */](this.cu, this.options);
        this.lapcount = session.currentLap.map(function (lap) {
            return {
                count: lap,
                total: _this.options.laps
            };
        });
        var drivers = this.settings.getDrivers().switchMap(function (drivers) {
            var observables = drivers.map(function (obj, index) {
                var code = obj.code || '#' + (index + 1);
                if (obj.name) {
                    return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].of({ name: obj.name, code: code, color: obj.color });
                }
                else {
                    return _this.getTranslations('Driver {{number}}', { number: index + 1 }).map(function (name) {
                        return { name: name, code: code, color: obj.color };
                    });
                }
            });
            return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].combineLatest.apply(__WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"], observables);
        });
        var best = [Infinity, Infinity, Infinity, Infinity];
        var events = __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].merge(session.grid.map(function (obs) { return obs.pairwise(); }).mergeAll().mergeMap(function (_a) {
            var prev = _a[0], curr = _a[1];
            var events = [];
            curr.best.forEach(function (time, index) {
                if ((time || Infinity) < best[index]) {
                    best[index] = time;
                    if (curr.laps >= 3) {
                        events.push([index ? 'bests' + index : 'bestlap', curr.id]);
                    }
                }
            });
            if (!curr.finished && curr.time) {
                if (curr.fuel < prev.fuel) {
                    events.push(['fuel' + curr.fuel, curr.id]);
                }
                if (curr.pit && !prev.pit) {
                    events.push(['pitenter', curr.id]);
                }
                if (!curr.pit && prev.pit) {
                    events.push(['pitexit', curr.id]);
                }
            }
            return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].from(events);
        }), this.start.distinctUntilChanged().filter(function (value) { return value === 9; }).map(function () {
            return ['falsestart', null];
        }), this.lapcount.filter(function (laps) {
            return _this.options.laps && laps.count === _this.options.laps && !session.finished.value;
        }).map(function () {
            return ['finallap', null];
        }), session.yellowFlag.distinctUntilChanged().skipWhile(function (value) { return !value; }).map(function (value) {
            return [value ? 'yellowflag' : 'greenflag', null];
        }), session.finished.distinctUntilChanged().filter(function (finished) { return finished; }).map(function () {
            return ['finished', null];
        })).withLatestFrom(drivers).map(function (_a) {
            var _b = _a[0], event = _b[0], id = _b[1], drivers = _a[1];
            return [event, id !== null ? drivers[id] : null];
        });
        // TODO: convert to Observable.scan()?
        var gridpos = [];
        var pitfuel = [];
        this.ranking = session.ranking.combineLatest(drivers).map(function (_a) {
            var ranks = _a[0], drivers = _a[1];
            return ranks.map(function (item, index) {
                if (_this.options.mode == 'race' && gridpos[item.id] === undefined && item.time !== undefined) {
                    gridpos[item.id] = index;
                }
                if (!item.pit || item.fuel < pitfuel[item.id]) {
                    pitfuel[item.id] = item.fuel;
                }
                return Object.assign({}, item, {
                    position: index,
                    driver: drivers[item.id],
                    gridpos: gridpos[item.id],
                    refuel: item.pit && item.fuel > pitfuel[item.id]
                });
            });
        }).share();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = events.withLatestFrom(this.settings.getOptions(), this.settings.getNotifications(), this.getTranslations('notifications')).subscribe(function (_a) {
            var _b = _a[0], event = _b[0], driver = _b[1], options = _a[1], notifications = _a[2], translations = _a[3];
            _this.logger.debug('Race event: ' + event, driver);
            if (options.speech && notifications[event] && notifications[event].enabled) {
                var message = notifications[event].message || translations[event];
                if (driver && driver.name) {
                    _this.speech.speak(driver.name + ': ' + message);
                }
                else {
                    _this.speech.speak(message);
                }
            }
        });
        this.subscription.add(this.lapcount.subscribe(function (laps) {
            _this.cu.setLap(laps.count);
        }, function (error) {
            _this.logger.error('Lap counter error:', error);
        }, function () {
            _this.logger.info('Lap counter finished');
        }));
        if (this.options.mode != 'practice') {
            var start = this.cu.getStart();
            start.take(1).toPromise().then(function (value) {
                if (value === 0) {
                    _this.cu.toggleStart();
                }
                // wait until startlight goes off; TODO: subscribe/unsibscribe?
                _this.cu.getStart().pairwise().filter(function (_a) {
                    var prev = _a[0], curr = _a[1];
                    return prev != 0 && curr == 0;
                }).take(1).toPromise().then(function () {
                    _this.logger.info('Start ' + _this.options.mode + ' mode');
                    session.start();
                });
            });
        }
    };
    RmsPage.prototype.toggleSpeech = function () {
        var _this = this;
        this.settings.getOptions().take(1).subscribe(function (options) {
            _this.settings.setOptions(Object.assign({}, options, { speech: !options.speech }));
        });
    };
    RmsPage.prototype.triggerPaceCar = function () {
        this.cu.trigger(__WEBPACK_IMPORTED_MODULE_3__carrera__["b" /* ControlUnitButton */].PACE_CAR);
    };
    RmsPage.prototype.triggerStart = function () {
        this.cu.trigger(__WEBPACK_IMPORTED_MODULE_3__carrera__["b" /* ControlUnitButton */].START);
    };
    RmsPage.prototype.showMenu = function (event) {
        var _this = this;
        var menu = this.popover.create(__WEBPACK_IMPORTED_MODULE_5__rms_menu__["a" /* RmsMenu */], {
            mode: this.options.mode,
            active: this.session && !this.session.finished.value && this.options.mode != 'practice',
            restart: function () { return _this.onStart(); },
            cancel: function () { return _this.session.stop(); },
        });
        menu.present({ ev: event });
    };
    // see https://github.com/ngx-translate/core/issues/330
    RmsPage.prototype.getTranslations = function (key, params) {
        var _this = this;
        return this.translate.get(key, params).concat(this.translate.onLangChange.asObservable().map(function () { return _this.translate.get(key, params); }).concatAll());
    };
    RmsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            providers: [__WEBPACK_IMPORTED_MODULE_4__core__["a" /* CONTROL_UNIT_PROVIDER */]],template:/*ion-inline-start:"/home/tkem/src/openlap/src/rms/rms.page.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <checkerboard cols="9" rows="5" *ngIf="session.finished | async"></checkerboard>\n      <span [ngSwitch]="options.mode">\n        <ng-template ngSwitchCase="practice">\n          <span translate>Free Practice</span>\n        </ng-template>\n        <ng-template ngSwitchCase="qualifying">\n          <span translate>Qualifying</span>\n        </ng-template>\n        <ng-template ngSwitchCase="race">\n          <span *ngIf="lapcount | async as laps; else race">\n            <span *ngIf="laps.count; else race">\n              <span *ngIf="laps.total; then race1; else race2"></span>\n              <ng-template #race1>\n                {{ \'Lap {\' + \'{count}\' + \'}/{\' + \'{total}\' + \'}\' | translate:laps}}\n              </ng-template>\n              <ng-template #race2>\n                {{ \'Lap {\' + \'{count}\' + \'}\' | translate:laps}}\n              </ng-template>\n            </span>\n          </span>\n          <ng-template #race>\n            <span translate>Race</span>\n          </ng-template>\n        </ng-template>\n      </span>\n      <checkerboard cols="9" rows="5" *ngIf="session.finished | async"></checkerboard>\n      <span *ngIf="options.time && !(session.finished | async)" style="float: right">\n        {{session.timer | async | time:\'h:mm:ss\'}}\n      </span>\n    </ion-title>\n    <ion-buttons end>\n      <!-- Android 4.4: no whitespace between ion-buttons buttons... -->\n      <button ion-button icon-only (click)="toggleSpeech()">\n        <ion-icon [name]="(speechEnabled | async) ? \'volume-up\' : \'volume-off\'"></ion-icon>\n      </button><button ion-button icon-only (click)="showMenu($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-slides pager="true">\n    <ion-slide *ngFor="let fields of (slides | async)">\n      <leaderboard [fields]="fields" [items]="ranking | async" [order]="sortorder | async">\n      </leaderboard>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar class="race-control" text-center>\n    <button class="startlight" [disabled]="!(keySupported | async)" (click)="triggerStart()">\n      <startlight [active]="(lights | async) >= 1" [blink]="blink | async"></startlight>\n      <startlight [active]="(lights | async) >= 2" [blink]="blink | async"></startlight>\n      <startlight [active]="(lights | async) >= 3" [blink]="blink | async"></startlight>\n      <startlight [active]="(lights | async) >= 4" [blink]="blink | async"></startlight>\n      <startlight [active]="(lights | async) >= 5" [blink]="blink | async"></startlight>\n    </button>\n    <ion-buttons left>\n      <button ion-button [disabled]="!(keySupported | async)" (click)="triggerPaceCar()">\n        <svg viewBox="0 0 9 5" [ngSwitch]="lights | async">\n          <text text-anchor="middle" x="50%" y="2" dy="0.3" font-size="2" textLength="8" lengthAdjust="spacingAndGlyphs">PACE CAR</text>\n          <text text-anchor="middle" x="50%" y="4" dy="0.3" font-size="2" textLength="8" lengthAdjust="spacingAndGlyphs">ESC</text>\n        </svg>\n      </button>\n    </ion-buttons>\n    <ion-buttons right>\n      <button ion-button (click)="session.toggleYellowFlag()">\n        <dot-matrix [ngClass]="{\'yellow-flag\': session.yellowFlag | async}" cols="9" rows="5"></dot-matrix>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/rms/rms.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__carrera__["a" /* ControlUnit */], __WEBPACK_IMPORTED_MODULE_4__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_4__core__["i" /* Settings */], __WEBPACK_IMPORTED_MODULE_4__core__["j" /* Speech */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], RmsPage);
    return RmsPage;
}());

//# sourceMappingURL=rms.page.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RmsMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RmsMenu = /** @class */ (function () {
    function RmsMenu(alert, settings, view, params) {
        this.alert = alert;
        this.settings = settings;
        this.view = view;
        this.options = new __WEBPACK_IMPORTED_MODULE_2__core__["g" /* Options */]();
        this.params = params.data;
    }
    Object.defineProperty(RmsMenu.prototype, "fixedOrder", {
        get: function () {
            return this.options.fixedorder;
        },
        set: function (value) {
            this.options.fixedorder = value;
            this.settings.setOptions(this.options);
            this.close();
        },
        enumerable: true,
        configurable: true
    });
    RmsMenu.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.settings.getOptions().subscribe(function (options) {
            _this.options = options;
        });
    };
    RmsMenu.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    RmsMenu.prototype.restart = function () {
        var _this = this;
        this.close().then(function () {
            if (_this.params.active) {
                var alert_1 = _this.alert.create({
                    message: 'Restart ' + _this.params.mode + '?',
                    buttons: [{
                            text: 'Cancel',
                            role: 'cancel',
                        }, {
                            text: 'OK',
                            handler: function () { return _this.params.restart(); }
                        }]
                });
                alert_1.present();
            }
            else {
                _this.params.restart();
            }
        });
    };
    RmsMenu.prototype.cancel = function () {
        var _this = this;
        this.close().then(function () {
            if (_this.params.active) {
                var alert_2 = _this.alert.create({
                    message: 'Cancel ' + _this.params.mode + '?',
                    buttons: [{
                            text: 'Cancel',
                            role: 'cancel',
                        }, {
                            text: 'OK',
                            handler: function () { return _this.params.cancel(); }
                        }]
                });
                alert_2.present();
            }
            else {
                _this.params.cancel();
            }
        });
    };
    RmsMenu.prototype.close = function () {
        return this.view.dismiss();
    };
    RmsMenu = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/rms/rms.menu.html"*/'<ion-item-group>\n  <ion-item>\n    <ion-label translate>Order by number</ion-label>\n    <ion-checkbox [(ngModel)]="fixedOrder"></ion-checkbox>\n  </ion-item>\n  <button ion-item [disabled]="!params.active" (click)="cancel()">\n    <span translate>Cancel</span>&hellip;\n  </button>\n  <button ion-item (click)="restart()">\n    <span translate>Restart</span><span *ngIf="params.active">&hellip;</span>\n  </button>\n</ion-item-group>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/rms/rms.menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core__["e" /* I18nAlertController */],
            __WEBPACK_IMPORTED_MODULE_2__core__["i" /* Settings */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], RmsMenu);
    return RmsMenu;
}());

//# sourceMappingURL=rms.menu.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RaceSettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




function formatTime(milliseconds) {
    var h = Math.floor(milliseconds / 3600000);
    var m = Math.floor(milliseconds / 60000 % 60);
    var s = Math.floor(milliseconds / 1000 % 60);
    return [h, m, s].map(function (v) { return ('0' + v).substr(-2); }).join(':');
}
function parseTime(s) {
    return s.split(':').reduce(function (sum, cur) { return sum * 60 + parseInt(cur); }, 0) * 1000;
}
function timeRequired(control) {
    if (!control.value || !parseTime(control.value)) {
        return { 'required': true };
    }
    else {
        return null;
    }
}
function lapsOrTimeRequired(group) {
    var laps = parseInt(group.get('laps').value);
    if (laps && laps > 0) {
        return null;
    }
    if (!timeRequired(group.get('time'))) {
        return null;
    }
    return { 'required': true };
}
function createQualifyingForm(fb, params) {
    return fb.group({
        time: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](formatTime(params.get('time') || 180000), timeRequired),
        pause: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]({
            value: params.get('pause') || false,
            disabled: !params.get('time')
        }),
        drivers: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](params.get('drivers') || ''),
        auto: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](params.get('auto') || false),
        pace: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](params.get('pace') || false)
    });
}
function createRaceForm(fb, params) {
    return fb.group({
        laps: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](params.get('laps') || '', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].pattern('\\d*')),
        time: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](formatTime(params.get('time') || 0)),
        pause: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]({
            value: !!params.get('pause'),
            disabled: !params.get('time')
        }),
        slotmode: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]({
            value: !!params.get('slotmode'),
            disabled: !params.get('laps')
        }),
        drivers: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](params.get('drivers') || ''),
        auto: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](params.get('auto') || false),
        pace: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](params.get('pace') || false)
    }, {
        validator: lapsOrTimeRequired
    });
}
var RaceSettingsPage = /** @class */ (function () {
    function RaceSettingsPage(fb, params, view) {
        this.view = view;
        this.mode = params.get('mode');
        if (this.mode == 'race') {
            this.form = createRaceForm(fb, params);
        }
        else {
            this.form = createQualifyingForm(fb, params);
        }
    }
    RaceSettingsPage.prototype.ngAfterViewInit = function () {
        // see https://github.com/driftyco/ionic/issues/9041
        if (this.pauseToggle) {
            this.pauseToggle.disabled = this.form.get('pause').disabled;
        }
        if (this.slotmodeToggle) {
            this.slotmodeToggle.disabled = this.form.get('slotmode').disabled;
        }
    };
    RaceSettingsPage.prototype.onChangeLaps = function (value) {
        if (parseInt(value || '0') > 0) {
            this.form.get('slotmode').enable();
        }
        else {
            this.form.get('slotmode').disable();
        }
        if (this.slotmodeToggle) {
            this.slotmodeToggle.disabled = this.form.get('slotmode').disabled;
        }
    };
    RaceSettingsPage.prototype.onChangeTime = function (value) {
        if (value.hour.value != 0 || value.minute.value != 0 || value.second.value != 0) {
            this.form.get('pause').enable();
        }
        else {
            this.form.get('pause').disable();
        }
        if (this.pauseToggle) {
            this.pauseToggle.disabled = this.form.get('pause').disabled;
        }
    };
    RaceSettingsPage.prototype.onSubmit = function (options) {
        this.view.dismiss(Object.assign(new __WEBPACK_IMPORTED_MODULE_3__core__["h" /* RaceOptions */](this.mode), {
            laps: parseInt(options.laps || '0'),
            time: parseTime(options.time || ''),
            pause: options.pause,
            drivers: options.drivers ? parseInt(options.drivers) : undefined,
            auto: options.auto,
            pace: options.pace,
            slotmode: options.slotmode
        }));
    };
    RaceSettingsPage.prototype.onCancel = function () {
        this.view.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('pause'),
        __metadata("design:type", Object)
    ], RaceSettingsPage.prototype, "pauseToggle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slotmode'),
        __metadata("design:type", Object)
    ], RaceSettingsPage.prototype, "slotmodeToggle", void 0);
    RaceSettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/rms/race-settings.page.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title [ngSwitch]="mode" translate>\n      <span *ngSwitchCase="\'practice\'" translate>Free Practice</span>\n      <span *ngSwitchCase="\'qualifying\'" translate>Qualifying</span>\n      <span *ngSwitchDefault translate>Race</span>\n    </ion-title>\n    <ion-buttons left>\n      <button ion-button (click)="onCancel()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons right>\n      <button ion-button (click)="onSubmit(form.value)" [disabled]="!form.valid" translate type="submit">\n        Start\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">\n    <ion-list>\n      <ion-item>\n        <ion-label color="light" translate>Time</ion-label>\n        <ion-datetime #time formControlName="time"\n                      displayFormat="H:mm:ss" pickerFormat="H mm ss"\n                      cancelText="{{\'Cancel\' | translate}}" doneText="{{\'Done\' | translate}}"\n                      (ionChange)="onChangeTime($event)">\n        </ion-datetime>\n      </ion-item>\n      <ion-item *ngIf="mode == \'race\'">\n        <ion-label color="light" translate>Number of laps</ion-label>\n        <ion-input #laps formControlName="laps" type="number"\n                   (blur)="onChangeLaps(laps.value)"\n                   (keyup)="onChangeLaps(laps.value)"\n                   placeholder="{{\'None\' | translate}}">\n        </ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label color="light" translate>Number of drivers</ion-label>\n        <ion-select formControlName="drivers" \n                    cancelText="{{\'Cancel\' | translate}}" \n                    okText="{{\'OK\' | translate}}">\n          <!-- ion-option seems to require translate attribute value; see\n               https://github.com/ionic-team/ionic/issues/8561#issuecomment-391079689 \n            -->\n          <ion-option translate="Automatic" value="">Automatic</ion-option>\n          <ion-option value="1">1</ion-option>\n          <ion-option value="2">2</ion-option>\n          <ion-option value="3">3</ion-option>\n          <ion-option value="4">4</ion-option>\n          <ion-option value="5">5</ion-option>\n          <ion-option value="6">6</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label color="light" translate>Autonomous Car</ion-label>\n        <ion-toggle formControlName="auto"></ion-toggle>\n      </ion-item>\n      <ion-item>\n        <ion-label color="light" translate>Pace Car</ion-label>\n        <ion-toggle formControlName="pace"></ion-toggle>\n      </ion-item>\n      <ion-item>\n        <ion-label color="light" translate>Stop time when paused</ion-label>\n        <ion-toggle #pause formControlName="pause"></ion-toggle>\n      </ion-item>\n      <ion-item *ngIf="mode == \'race\'">\n        <ion-label color="light" translate>Finish all laps</ion-label>\n        <ion-toggle #slotmode formControlName="slotmode"></ion-toggle>\n      </ion-item>\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/rms/race-settings.page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ViewController */]])
    ], RaceSettingsPage);
    return RaceSettingsPage;
}());

//# sourceMappingURL=race-settings.page.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_module__ = __webpack_require__(743);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__settings_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_page__ = __webpack_require__(393);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__settings_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__colors_page__ = __webpack_require__(386);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__colors_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drivers_page__ = __webpack_require__(388);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__drivers_page__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_app_version__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutPage = /** @class */ (function () {
    function AboutPage(appVersion, logger) {
        this.appVersion = appVersion;
        this.logger = logger;
    }
    AboutPage.prototype.ngOnInit = function () {
        var _this = this;
        this.version = this.appVersion.getVersionNumber().catch(function (error) {
            _this.logger.error('Error retrieving application version', error);
            return 'develop';
        });
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/about.page.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span translate>About Open Lap</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <img style="float: left; margin-right: 1em;" src="assets/images/icon.png" width="80" height="80">\n  <div padding>\n    <h1>Open Lap {{version | async}}</h1>\n    <a href="https://github.com/tkem/openlap/" target="_system">\n      https://github.com/tkem/openlap/\n    </a>\n  </div>\n\n  <p style="clear: both;">\n\n  <p>Copyright &copy; 2016-2019 Thomas Kemmer</p>\n\n  <p>\n    Licensed under the\n    <a href="https://github.com/tkem/mopidy-mobile/blob/master/LICENSE" target="_system">Apache License, Version 2.0</a>.\n  </p>\n\n  <p>\n    <span translate>Translations</span>:\n    Haarman (Nederlands), SdiF (Italiano), Maikeru (Español), nico12 (Français).\n  </p>\n\n  <p>\n    <span translate>iOS support</span>: softyde, elliot2extreme.\n  </p>\n\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/about.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_2__core__["f" /* Logger */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.page.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ColorsPage = /** @class */ (function () {
    function ColorsPage(logger, settings) {
        this.logger = logger;
        this.settings = settings;
        this.placeholder = 'Driver {{number}}';
    }
    ColorsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.settings.getDrivers().take(1).toPromise().then(function (drivers) {
            _this.drivers = drivers;
        }).catch(function (error) {
            _this.logger.error('Error getting colors', error);
        });
    };
    ColorsPage.prototype.ngOnDestroy = function () {
        var _this = this;
        this.settings.setDrivers(this.drivers).catch(function (error) {
            _this.logger.error('Error setting colors', error);
        });
    };
    ColorsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/colors.page.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span translate>Colors</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let driver of drivers; let id = index">\n      <ion-label>#{{id + 1}}</ion-label>\n      <ion-input readonly\n       [ngModel]="driver.name"\n       [placeholder]="placeholder | translate:{number: id + 1}"\n      >\n      </ion-input>\n      <input item-right [(ngModel)]="driver.color" type="color" [style.zIndex]="100">\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/colors.page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_1__core__["i" /* Settings */]])
    ], ColorsPage);
    return ColorsPage;
}());

//# sourceMappingURL=colors.page.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


function isObjectSubset(a, b) {
    for (var key in a) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
var ConnectionPage = /** @class */ (function () {
    function ConnectionPage(settings) {
        this.settings = settings;
        this.connection = new __WEBPACK_IMPORTED_MODULE_1__core__["c" /* Connection */]();
        this.ranges = {
            connection: 5000,
            request: 1000,
            reconnect: {
                lower: 2000,
                upper: 10000
            }
        };
    }
    ConnectionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.settings.getConnection().subscribe(function (connection) {
            _this.connection = connection;
            _this.ranges = {
                connection: connection.connectionTimeout,
                request: connection.requestTimeout,
                reconnect: {
                    lower: connection.minReconnectDelay,
                    upper: connection.maxReconnectDelay
                }
            };
        });
    };
    ConnectionPage.prototype.ngOnDestroy = function () {
        var connection = {
            connectionTimeout: this.ranges.connection,
            requestTimeout: this.ranges.request,
            minReconnectDelay: this.ranges.reconnect.lower,
            maxReconnectDelay: this.ranges.reconnect.upper
        };
        if (!isObjectSubset(connection, this.connection)) {
            this.settings.setConnection(Object.assign({}, this.connection, connection));
        }
        this.subscription.unsubscribe();
    };
    ConnectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/connection.page.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span translate>Connection</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label stacked translate>Connection timeout</ion-label>\n      <ion-range [(ngModel)]="ranges.connection" min="1000" max="5000" step="500" snaps="true">\n        <ion-label range-left>1 s</ion-label>\n        <ion-label range-right>5 s</ion-label>\n      </ion-range>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked translate>Request timeout</ion-label>\n      <ion-range [(ngModel)]="ranges.request" min="1000" max="5000" step="500" snaps="true">\n        <ion-label range-left>1 s</ion-label>\n        <ion-label range-right>5 s</ion-label>\n      </ion-range>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked translate>Reconnect delay</ion-label>\n      <ion-range [(ngModel)]="ranges.reconnect" dualKnobs="true" min="2000" max="10000" step="1000" snaps="true">\n        <ion-label range-left>2 s</ion-label>\n        <ion-label range-right>10 s</ion-label>\n      </ion-range>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/connection.page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core__["i" /* Settings */]])
    ], ConnectionPage);
    return ConnectionPage;
}());

//# sourceMappingURL=connection.page.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriversPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DriversPage = /** @class */ (function () {
    function DriversPage(logger, settings, speech, translate) {
        this.logger = logger;
        this.settings = settings;
        this.speech = speech;
        this.translate = translate;
        this.placeholder = 'Driver {{number}}';
    }
    DriversPage.prototype.ngOnInit = function () {
        var _this = this;
        this.settings.getDrivers().take(1).toPromise().then(function (drivers) {
            _this.drivers = drivers;
        }).catch(function (error) {
            _this.logger.error('Error getting drivers', error);
        });
    };
    DriversPage.prototype.ngOnDestroy = function () {
        var _this = this;
        this.settings.setDrivers(this.drivers).catch(function (error) {
            _this.logger.error('Error setting drivers', error);
        });
    };
    DriversPage.prototype.getCode = function (name, id) {
        var chars = name.replace(/\W/g, '').toUpperCase(); // TODO: proper Unicode support
        var codes = this.drivers.filter(function (_, index) { return index !== id; }).map(function (obj) { return obj.code; });
        for (var n = 2; n < chars.length; ++n) {
            var s = chars.substr(0, 2) + chars.substr(n, 1);
            if (codes.indexOf(s) === -1) {
                return s;
            }
        }
        return undefined;
    };
    DriversPage.prototype.reorderItems = function (indexes) {
        var _this = this;
        var colors = this.drivers.map(function (driver) { return driver.color; });
        var element = this.drivers[indexes.from];
        this.drivers.splice(indexes.from, 1);
        this.drivers.splice(indexes.to, 0, element);
        colors.forEach(function (color, index) {
            _this.drivers[index].color = color;
        });
    };
    DriversPage.prototype.speak = function (id) {
        var _this = this;
        this.getDriverName(id).then(function (name) {
            _this.speech.speak(name);
        });
    };
    DriversPage.prototype.getDriverName = function (id) {
        if (this.drivers[id] && this.drivers[id].name) {
            return Promise.resolve(this.drivers[id].name);
        }
        else {
            return this.translate.get(this.placeholder, { number: id + 1 }).toPromise();
        }
    };
    DriversPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/drivers.page.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span translate>Drivers</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list reorder="true" (ionItemReorder)="reorderItems($event)">\n    <ion-item *ngFor="let driver of drivers; let id = index">\n      <ion-label>#{{id + 1}}</ion-label>\n      <ion-input clearInput\n        [ngModel]="driver.name"\n        (ngModelChange)="driver.code = getCode(driver.name = $event, id)"\n        [placeholder]="placeholder | translate:{number: id + 1}"\n      >\n      </ion-input>\n      <ion-note item-right>{{driver.code || \'#\' + (id + 1)}}</ion-note>\n      <button ion-button clear icon-only item-right (click)="speak(id)">\n        <ion-icon name="volume-up"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/drivers.page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_2__core__["i" /* Settings */], __WEBPACK_IMPORTED_MODULE_2__core__["j" /* Speech */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], DriversPage);
    return DriversPage;
}());

//# sourceMappingURL=drivers.page.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LicensesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LicensesPage = /** @class */ (function () {
    function LicensesPage() {
        this.items = [{
                name: 'Apache Cordova',
                copyright: 'Copyright (c) 2012, 2013, 2015 The Apache Software Foundation',
                license: 'Apache-2.0',
                homepage: 'https://cordova.apache.org/'
            }, {
                name: 'Angular',
                copyright: 'Copyright (c) 2010-2018 Google, Inc.',
                license: 'MIT',
                homepage: 'https://angular.io/'
            }, {
                name: 'Ionic',
                copyright: 'Copyright (c) 2015-present Drifty Co.',
                license: 'MIT',
                homepage: 'https://github.com/driftyco/ionic#readme',
            }, {
                name: 'Ionic Native',
                copyright: 'Copyright (c) 2015-present Drifty Co.',
                license: 'MIT',
                homepage: 'https://github.com/driftyco/ionic-native',
            }, {
                name: 'Ionicons',
                copyright: 'Copyright (c) 2016 Drifty',
                license: 'MIT',
                homepage: 'http://ionicons.com/',
            }, {
                name: 'ngx-translate',
                copyright: 'Copyright (c) 2016 Olivier Combe',
                license: 'MIT',
                homepage: 'http://www.ngx-translate.com/'
            }, {
                name: 'RxJS',
                copyright: 'Copyright (c) 2015-2018 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors',
                license: 'Apache-2.0',
                homepage: 'https://github.com/ReactiveX/RxJS'
            }, {
                name: 'cordova-plugin-app-version',
                author: 'whiteoctober',
                license: 'MIT',
                homepage: 'https://github.com/whiteoctober/cordova-plugin-app-version#readme'
            }, {
                name: 'cordova-plugin-ble-central',
                author: 'Don Coleman <don.coleman@gmail.com>',
                license: 'Apache-2.0',
                homepage: 'https://github.com/don/cordova-plugin-ble-central#readme'
            }, {
                name: 'cordova-plugin-device',
                author: 'Apache Software Foundation',
                license: 'Apache-2.0',
                homepage: 'https://github.com/apache/cordova-plugin-device#readme'
            }, {
                name: 'cordova-plugin-fullscreen',
                author: 'Neil Rackett',
                license: 'BSD',
                homepage: 'https://github.com/mesmotronic/cordova-fullscreen-plugin#readme'
            }, {
                name: 'cordova-plugin-inappbrowser',
                author: 'Apache Software Foundation',
                license: 'Apache-2.0',
                homepage: 'https://github.com/apache/cordova-plugin-inappbrowser#readme'
            }, {
                name: 'cordova-plugin-insomnia',
                author: 'Eddy Verbruggen <eddyverbruggen@gmail.com> (https://github.com/EddyVerbruggen)',
                license: 'MIT',
                homepage: 'https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin#readme'
            }, {
                name: 'cordova-plugin-splashscreen',
                author: 'Apache Software Foundation',
                license: 'Apache-2.0',
                homepage: 'https://github.com/apache/cordova-plugin-splashscreen#readme'
            }, {
                name: 'cordova-plugin-statusbar',
                author: 'Apache Software Foundation',
                license: 'Apache-2.0',
                homepage: 'https://github.com/apache/cordova-plugin-statusbar#readme'
            }, {
                name: 'cordova-plugin-tts',
                author: 'VILIC VANE',
                license: 'MIT',
                homepage: 'https://github.com/vilic/cordova-plugin-tts#readme'
            }, {
                name: 'cordova-plugin-whitelist',
                author: 'Apache Software Foundation',
                license: 'Apache-2.0',
                homepage: 'https://github.com/apache/cordova-plugin-whitelist#readme'
            }, {
                name: 'cordova-plugin-x-socialsharing',
                author: 'Eddy Verbruggen - @EddyVerbruggen',
                license: 'MIT',
                homepage: 'https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#readme'
            }, {
                name: 'cordova-plugin-x-toast',
                author: 'Eddy Verbruggen <eddyverbruggen@gmail.com> (https://github.com/EddyVerbruggen)',
                license: 'MIT',
                homepage: 'https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin#readme'
            }, {
                name: 'cordova-sqlite-storage',
                author: 'various',
                license: 'MIT',
                homepage: 'https://github.com/litehelpers/Cordova-sqlite-storage'
            }, {
                name: 'cordovarduino',
                author: 'Xavier Seignard <xavier.seignard@gmail.com>',
                license: 'MIT',
                homepage: 'https://github.com/xseignard/cordovarduino#readme'
            }, {
                name: 'ionic-plugin-keyboard',
                author: 'Ionic',
                license: 'Apache-2.0',
                homepage: 'https://github.com/driftyco/ionic-plugin-keyboard#readme'
            }];
    }
    LicensesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/licenses.page.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span translate>Open source licenses</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <a ion-item [href]="item.homepage || item.url" target="_system" *ngFor="let item of items">\n      <h1>{{item.name}}</h1>\n      <h2>{{item.copyright || item.author}}</h2>\n      <p><span translate>License</span>: {{item.license}}</p>\n    </a>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/licenses.page.html"*/,
        })
    ], LicensesPage);
    return LicensesPage;
}());

//# sourceMappingURL=licenses.page.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggingMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






function stringify(obj) {
    try {
        return JSON.stringify(obj);
    }
    catch (error) {
        return '' + obj;
    }
}
var LoggingMenu = /** @class */ (function () {
    function LoggingMenu(appVersion, sharing, device, logger, settings, view) {
        this.appVersion = appVersion;
        this.sharing = sharing;
        this.device = device;
        this.logger = logger;
        this.settings = settings;
        this.view = view;
        this.options = new __WEBPACK_IMPORTED_MODULE_5__core__["g" /* Options */]();
    }
    Object.defineProperty(LoggingMenu.prototype, "debugEnabled", {
        get: function () {
            return this.options.debug;
        },
        set: function (value) {
            this.options.debug = value;
            this.settings.setOptions(this.options);
            this.close();
        },
        enumerable: true,
        configurable: true
    });
    LoggingMenu.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.settings.getOptions().subscribe({
            next: function (options) {
                _this.options = options;
            },
            error: function (error) {
                _this.logger.error('Logging settings: ', error);
            },
            complete: function () {
                _this.logger.debug('Logging settings complete');
            }
        });
    };
    LoggingMenu.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    LoggingMenu.prototype.clear = function () {
        this.logger.clear();
        this.close();
    };
    LoggingMenu.prototype.close = function () {
        return this.view.dismiss();
    };
    LoggingMenu.prototype.share = function () {
        var _this = this;
        Promise.all([this.appVersion.getAppName(), this.appVersion.getVersionNumber()]).then(function (_a) {
            var name = _a[0], version = _a[1];
            var message = _this.logger.records.map(function (record) {
                return [record.level, record.time, record.args.map(stringify).join(' ')].join('\t');
            }).join('\n');
            var subject = name + ' ' + version + ' (' + [_this.device.model, _this.device.platform, _this.device.version].join(' ') + ')';
            return _this.sharing.shareWithOptions({ message: message, subject: subject });
        }).catch(function (error) {
            _this.logger.error('Error sharing log:', error);
        }).then(function () {
            _this.close();
        });
    };
    LoggingMenu = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/logging.menu.html"*/'<ion-item-group>\n  <ion-item>\n    <ion-label translate>Debug messages</ion-label>\n    <ion-checkbox [(ngModel)]="debugEnabled"></ion-checkbox>\n  </ion-item>\n  <button ion-item (click)="share()">\n    <span translate>Share</span>&hellip;\n  </button>\n  <button ion-item (click)="clear()">\n    <span translate>Clear</span>\n  </button>\n</ion-item-group>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/logging.menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_5__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_5__core__["i" /* Settings */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], LoggingMenu);
    return LoggingMenu;
}());

//# sourceMappingURL=logging.menu.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logging_menu__ = __webpack_require__(390);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoggingPage = /** @class */ (function () {
    function LoggingPage(logger, popover) {
        this.logger = logger;
        this.popover = popover;
        // FIXME: numeric values of levels are implementation details
        this.icons = [
            { name: 'bug', style: { color: 'green' } },
            { name: 'information-circle', style: { color: 'blue' } },
            { name: 'warning', style: { color: 'yellow' } },
            { name: 'alert', style: { color: 'red' } }
        ];
    }
    LoggingPage.prototype.showMenu = function (event) {
        var popover = this.popover.create(__WEBPACK_IMPORTED_MODULE_3__logging_menu__["a" /* LoggingMenu */]);
        popover.present({ ev: event });
    };
    LoggingPage.prototype.stringify = function (obj) {
        try {
            return JSON.stringify(obj);
        }
        catch (error) {
            return '' + obj;
        }
    };
    LoggingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/logging.page.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span translate>Event log</span>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="showMenu($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let record of logger.records" (click)="record.json = !record.json" text-wrap>\n      <ion-icon item-left [name]="icons[record.level]?.name" [ngStyle]="icons[record.level]?.style"></ion-icon>\n      <span>{{record.time | date:\'HH:mm:ss\'}}.{{(record.time % 1000) | number:\'3.0-0\'}}</span>\n      <span *ngFor="let arg of record.args">\n        {{record.json ? stringify(arg) : arg}}\n      </span>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/logging.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* PopoverController */]])
    ], LoggingPage);
    return LoggingPage;
}());

//# sourceMappingURL=logging.page.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(settings, speech, translate) {
        this.settings = settings;
        this.speech = speech;
        this.translate = translate;
        this.items = [{
                id: 'finished',
                label: 'Race finished'
            }, {
                id: 'finallap',
                label: 'Final lap'
            }, {
                id: 'yellowflag',
                label: 'Yellow flag'
            }, {
                id: 'greenflag',
                label: 'Track clear'
            }, {
                id: 'falsestart',
                label: 'False start'
            }, {
                id: 'bestlap',
                label: 'Fastest lap',
            }, {
                id: 'bests1',
                label: 'Fastest sector 1',
            }, {
                id: 'bests2',
                label: 'Fastest sector 2',
            }, {
                id: 'bests3',
                label: 'Fastest sector 3',
            }, {
                id: 'fuel2',
                label: 'Fuel < 20%'
            }, {
                id: 'fuel1',
                label: 'Fuel < 10%'
            }, {
                id: 'fuel0',
                label: 'No fuel'
            }, {
                id: 'pitenter',
                label: 'Car enters pit'
            }, {
                id: 'pitexit',
                label: 'Car leaves pit'
            }];
        this.notifications = {};
    }
    NotificationsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.settings.getNotifications().subscribe(function (notifications) {
            _this.notifications = notifications;
        });
    };
    NotificationsPage.prototype.ngOnDestroy = function () {
        this.settings.setNotifications(this.notifications);
        this.subscription.unsubscribe();
    };
    NotificationsPage.prototype.speak = function (id) {
        var _this = this;
        this.getMessage(id).then(function (message) {
            _this.speech.speak(message);
        });
    };
    NotificationsPage.prototype.getMessage = function (id) {
        if (this.notifications[id] && this.notifications[id].message) {
            return Promise.resolve(this.notifications[id].message);
        }
        else {
            return this.translate.get('notifications.' + id).toPromise();
        }
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/notifications.page.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span translate>Notifications</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let item of items">\n      <ion-label stacked>{{item.label | translate}}</ion-label>\n      <ion-input [(ngModel)]="notifications[item.id].message"\n        [placeholder]="\'notifications.\' + item.id | translate"\n      ></ion-input>\n      <button ion-button clear icon-only item-right (click)="speak(item.id)">\n        <ion-icon name="volume-up"></ion-icon>\n      </button>\n      <ion-toggle [(ngModel)]="notifications[item.id].enabled"></ion-toggle>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/notifications.page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core__["i" /* Settings */], __WEBPACK_IMPORTED_MODULE_2__core__["j" /* Speech */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.page.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_page__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connection_page__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__licenses_page__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logging_page__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifications_page__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SettingsPage = /** @class */ (function () {
    function SettingsPage(alert, settings) {
        this.alert = alert;
        this.settings = settings;
        this.aboutPage = __WEBPACK_IMPORTED_MODULE_1__about_page__["a" /* AboutPage */];
        this.connectionPage = __WEBPACK_IMPORTED_MODULE_2__connection_page__["a" /* ConnectionPage */];
        this.licensesPage = __WEBPACK_IMPORTED_MODULE_3__licenses_page__["a" /* LicensesPage */];
        this.loggingPage = __WEBPACK_IMPORTED_MODULE_4__logging_page__["a" /* LoggingPage */];
        this.notificationsPage = __WEBPACK_IMPORTED_MODULE_5__notifications_page__["a" /* NotificationsPage */];
        this.options = new __WEBPACK_IMPORTED_MODULE_6__core__["g" /* Options */]();
    }
    SettingsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.settings.getOptions().subscribe(function (options) {
            _this.options = options;
        });
    };
    SettingsPage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SettingsPage.prototype.reset = function () {
        var _this = this;
        var alert = this.alert.create({
            message: 'Reset all user settings to default values?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'OK',
                    handler: function () { _this.settings.clear(); }
                }]
        });
        alert.present();
    };
    SettingsPage.prototype.update = function () {
        this.settings.setOptions(this.options);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/settings/settings.page.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <span translate>Settings</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-item-group>\n    <ion-item>\n      <ion-label color="light" translate>Language</ion-label>\n      <ion-select [(ngModel)]="options.language" (ionChange)="update()" cancelText="{{\'Cancel\' | translate}}" okText="{{\'OK\' | translate}}">\n        <!-- ion-option seems to require translate attribute value; see\n             https://github.com/ionic-team/ionic/issues/8561#issuecomment-391079689\n          -->\n        <ion-option translate="Default" value="">Default</ion-option>\n        <ion-option value="de">Deutsch</ion-option>\n        <ion-option value="en">English</ion-option>\n        <ion-option value="es">Español</ion-option>\n        <ion-option value="fr">Français</ion-option>\n        <ion-option value="it">Italiano</ion-option>\n        <ion-option value="nl">Nederlands</ion-option>\n      </ion-select>\n    </ion-item>\n    <button ion-item [navPush]="connectionPage">\n      <span translate>Connection</span>\n    </button>\n    <button ion-item [navPush]="notificationsPage">\n      <span translate>Notifications</span>\n    </button>\n    <button ion-item (click)="reset()">\n      <span translate>Reset settings</span>\n    </button>\n  </ion-item-group>\n  <ion-item-group>\n    <ion-list-header>\n      <span translate>About</span>\n    </ion-list-header>\n    <button ion-item [navPush]="loggingPage">\n      <span translate>Event log</span>\n    </button>\n    <button ion-item [navPush]="licensesPage">\n      <span translate>Open source licenses</span>\n    </button>\n    <button ion-item [navPush]="aboutPage">\n      <span translate>About Open Lap</span>\n    </button>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/settings/settings.page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__core__["e" /* I18nAlertController */], __WEBPACK_IMPORTED_MODULE_6__core__["i" /* Settings */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.page.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tuning_page__ = __webpack_require__(395);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__tuning_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tuning_module__ = __webpack_require__(744);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__tuning_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TuningPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__carrera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tuning_menu__ = __webpack_require__(396);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// TODO: store with CU or settings?
var MODELS = [0, 1, 2, 3, 4, 5].map(function (id) { return ({
    id: id,
    speed: null,
    brake: null,
    fuel: null
}); });
var TuningPage = /** @class */ (function () {
    function TuningPage(cu, popover, ref, settings) {
        this.cu = cu;
        this.popover = popover;
        this.ref = ref;
        this.models = MODELS;
        this.locked = false;
        this.type = 'speed';
        this.placeholder = 'Driver {{number}}';
        this.fromCU = {
            'speed': [1, 2, 3, 5, 6, 7, 9, 11, 13, 15],
            'brake': [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            'fuel': [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        };
        this.toCU = {
            'speed': [0, 0, 1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9],
            'brake': [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            'fuel': [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9]
        };
        this.connected = this.cu.getState().map(function (state) { return state == 'connected'; });
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        this.drivers = settings.getDrivers();
        this.options = settings.getOptions();
    }
    TuningPage.prototype.ngOnInit = function () {
        var _this = this;
        this.subject.debounceTime(400).subscribe(function (event) {
            for (var _i = 0, _a = (event.id !== undefined ? [_this.models[event.id]] : _this.models); _i < _a.length; _i++) {
                var model = _a[_i];
                switch (event.type) {
                    case 'speed':
                        _this.cu.setSpeed(model.id, model.speed);
                        break;
                    case 'brake':
                        _this.cu.setBrake(model.id, model.brake);
                        break;
                    case 'fuel':
                        _this.cu.setFuel(model.id, model.fuel);
                        break;
                }
            }
        });
    };
    TuningPage.prototype.ngOnDestroy = function () {
        this.subject.complete();
    };
    TuningPage.prototype.applyAll = function () {
        for (var _i = 0, _a = this.models; _i < _a.length; _i++) {
            var model = _a[_i];
            if (model.speed !== null) {
                this.cu.setSpeed(model.id, model.speed);
            }
            if (model.brake !== null) {
                this.cu.setBrake(model.id, model.brake);
            }
            if (model.fuel !== null) {
                this.cu.setFuel(model.id, model.fuel);
            }
        }
    };
    TuningPage.prototype.showMenu = function (event) {
        var _this = this;
        var menu = this.popover.create(__WEBPACK_IMPORTED_MODULE_5__tuning_menu__["a" /* TuningMenu */], {
            apply: function () { _this.applyAll(); }
        });
        menu.present({ ev: event });
    };
    TuningPage.prototype.update = function (type, value, id) {
        for (var _i = 0, _a = (id !== undefined ? [this.models[id]] : this.models); _i < _a.length; _i++) {
            var model = _a[_i];
            model[type] = value;
        }
        this.subject.next({ id: id, type: type });
        this.ref.detectChanges();
    };
    TuningPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            providers: [__WEBPACK_IMPORTED_MODULE_4__core__["a" /* CONTROL_UNIT_PROVIDER */]],template:/*ion-inline-start:"/home/tkem/src/openlap/src/tuning/tuning.page.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span translate>Tuning</span>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="locked = !locked">\n        <ion-icon [name]="locked ? \'lock\' : \'unlock\'"></ion-icon>\n      </button><button ion-button icon-only (click)="showMenu($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-segment [(ngModel)]="type">\n    <ion-segment-button translate value="speed">Speed</ion-segment-button>\n    <ion-segment-button translate value="brake">Brake</ion-segment-button>\n    <ion-segment-button translate value="fuel">Fuel</ion-segment-button>\n  </ion-segment>\n  <ion-grid class="tuning">\n    <ion-row *ngFor="let model of models">\n      <ion-col class="number" [stripe]="(drivers | async)[model.id]?.color">\n        {{model.id + 1}}\n      </ion-col>\n      <ion-col class="name" showWhen="landscape">\n        {{(drivers | async)[model.id]?.name || (placeholder | translate:{number: model.id + 1})}}\n      </ion-col>\n      <ion-col class="code" showWhen="portrait">\n        {{(drivers | async)[model.id]?.code || \'#\' + (model.id + 1)}}\n      </ion-col>\n      <ion-col self-align-center class="range" *ngIf="!(options | async).cumode" [ngSwitch]="type">\n        <ion-range *ngSwitchCase="\'speed\'" no-padding min="0" max="15" snaps="true"\n                   [disabled]="!(connected | async)"\n                   [ngClass]="{\'pristine\': model.speed == null}"\n                   [ngModel]="model.speed || 0"\n                   (ionChange)="update(\'speed\', $event.value, locked ? undefined : model.id)"\n                   >\n        </ion-range>\n        <ion-range *ngSwitchCase="\'brake\'" no-padding min="0" max="15" snaps="true"\n                   [disabled]="!(connected | async)"\n                   [ngClass]="{\'pristine\': model.brake == null}"\n                   [ngModel]="model.brake || 0"\n                   (ionChange)="update(\'brake\', $event.value, locked ? undefined : model.id)"\n                   >\n        </ion-range>\n        <ion-range *ngSwitchCase="\'fuel\'" no-padding min="0" max="15" snaps="true"\n                   [disabled]="!(connected | async)"\n                   [ngClass]="{\'pristine\': model.fuel == null}"\n                   [ngModel]="model.fuel || 0"\n                   (ionChange)="update(\'fuel\', $event.value, locked ? undefined : model.id)"\n                   >\n        </ion-range>\n      </ion-col>\n      <ion-col self-align-center class="range" *ngIf="(options | async).cumode" [ngSwitch]="type">\n        <ion-range *ngSwitchCase="\'speed\'" no-padding min="0" max="9" snaps="true"\n                   [disabled]="!(connected | async)"\n                   [ngClass]="{\'pristine\': model.speed == null}"\n                   [ngModel]="toCU.speed[model.speed] || 0"\n                   (ionChange)="update(\'speed\', fromCU.speed[$event.value], locked ? undefined : model.id)"\n                   >\n        </ion-range>\n        <ion-range *ngSwitchCase="\'brake\'" no-padding min="0" max="9" snaps="true"\n                   [disabled]="!(connected | async)"\n                   [ngClass]="{\'pristine\': model.brake == null}"\n                   [ngModel]="toCU.brake[model.brake] || 0"\n                   (ionChange)="update(\'brake\', fromCU.brake[$event.value], locked ? undefined : model.id)"\n                   >\n        </ion-range>\n        <ion-range *ngSwitchCase="\'fuel\'" no-padding min="0" max="9" snaps="true"\n                   [disabled]="!(connected | async)"\n                   [ngClass]="{\'pristine\': model.fuel == null}"\n                   [ngModel]="toCU.fuel[model.fuel] || 0"\n                   (ionChange)="update(\'fuel\', fromCU.fuel[$event.value], locked ? undefined : model.id)"\n                   >\n        </ion-range>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/tuning/tuning.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__carrera__["a" /* ControlUnit */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_4__core__["i" /* Settings */]])
    ], TuningPage);
    return TuningPage;
}());

//# sourceMappingURL=tuning.page.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TuningMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TuningMenu = /** @class */ (function () {
    function TuningMenu(logger, settings, view, params) {
        this.logger = logger;
        this.settings = settings;
        this.view = view;
        this.options = new __WEBPACK_IMPORTED_MODULE_2__core__["g" /* Options */]();
        this.params = params.data;
    }
    Object.defineProperty(TuningMenu.prototype, "mode", {
        get: function () {
            return this.options.cumode;
        },
        set: function (value) {
            this.options.cumode = value;
            this.settings.setOptions(this.options);
            this.close();
        },
        enumerable: true,
        configurable: true
    });
    TuningMenu.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.settings.getOptions().subscribe({
            next: function (options) {
                _this.options = options;
            },
            error: function (error) {
                _this.logger.error('Tuning settings: ', error);
            },
            complete: function () {
                _this.logger.debug('Tuning settings complete');
            }
        });
    };
    TuningMenu.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    TuningMenu.prototype.apply = function () {
        this.params.apply();
        this.close();
    };
    TuningMenu.prototype.close = function () {
        return this.view.dismiss();
    };
    TuningMenu = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/tuning/tuning.menu.html"*/'<ion-item-group>\n  <ion-item>\n    <ion-label translate>Control Unit mode</ion-label>\n    <ion-checkbox [(ngModel)]="mode"></ion-checkbox>\n  </ion-item>\n  <button ion-item (click)="apply()">\n    <span translate>Apply all</span>\n  </button>\n</ion-item-group>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/tuning/tuning.menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_2__core__["i" /* Settings */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], TuningMenu);
    return TuningMenu;
}());

//# sourceMappingURL=tuning.menu.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RootPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RootPage = /** @class */ (function () {
    function RootPage() {
    }
    RootPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/app/root.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Open Lap\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h1 translate>Welcome to Open Lap!</h1>\n  <p translate>\n    Please select a Control Unit device from the menu.\n  </p>\n  <p translate>\n    If no devices are listed, please make sure that Bluetooth and Location (for scanning Bluetooth devices) are enabled or you are using a suitable serial to USB OTG converter cable.\n  </p>\n</ion-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/app/root.html"*/
        })
    ], RootPage);
    return RootPage;
}());

//# sourceMappingURL=root.page.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(403);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_full_screen__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_ble__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_insomnia__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_serial__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_text_to_speech__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_toast__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngx_translate_http_loader__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__backend__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__menu__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__rms__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__settings__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__shared__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__tuning__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__app_component__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__root_page__ = __webpack_require__(397);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























// AoT requires an exported function for factories
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_17__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_25__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_26__root_page__["a" /* RootPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_25__app_component__["a" /* AppComponent */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_18__backend__["b" /* BackendModule */],
                __WEBPACK_IMPORTED_MODULE_19__core__["d" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_20__menu__["a" /* MenuModule */],
                __WEBPACK_IMPORTED_MODULE_21__rms__["b" /* RmsModule */],
                __WEBPACK_IMPORTED_MODULE_22__settings__["c" /* SettingsModule */],
                __WEBPACK_IMPORTED_MODULE_23__shared__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_24__tuning__["a" /* TuningModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_full_screen__["a" /* AndroidFullScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_ble__["a" /* BLE */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_insomnia__["a" /* Insomnia */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_serial__["a" /* Serial */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_toast__["a" /* Toast */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_25__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_26__root_page__["a" /* RootPage */]
            ],
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__control_unit__ = __webpack_require__(721);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__control_unit__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__control_unit__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_view__ = __webpack_require__(371);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__data_view__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Backend; });
var Backend = /** @class */ (function () {
    function Backend() {
    }
    return Backend;
}());

//# sourceMappingURL=backend.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_module__ = __webpack_require__(730);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_module__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ControlUnitButton; });
/* unused harmony export Settings */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlUnit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_publish__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_publish___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_publish__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_publishReplay__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_publishReplay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_publishReplay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_retryWhen__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_retryWhen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_retryWhen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__data_view__ = __webpack_require__(371);












var CONNECTION_TIMEOUT = 5000;
var REQUEST_TIMEOUT = 1000;
var MIN_RECONNECT_DELAY = 2000;
var MAX_RECONNECT_DELAY = 10000;
var POLL_COMMAND = __WEBPACK_IMPORTED_MODULE_11__data_view__["a" /* DataView */].fromString('?');
var RESET_COMMAND = __WEBPACK_IMPORTED_MODULE_11__data_view__["a" /* DataView */].fromString('=10');
var VERSION_COMMAND = __WEBPACK_IMPORTED_MODULE_11__data_view__["a" /* DataView */].fromString('0');
var ControlUnitButton;
(function (ControlUnitButton) {
    ControlUnitButton[ControlUnitButton["ESC"] = 1] = "ESC";
    ControlUnitButton[ControlUnitButton["PACE_CAR"] = 1] = "PACE_CAR";
    ControlUnitButton[ControlUnitButton["ENTER"] = 2] = "ENTER";
    ControlUnitButton[ControlUnitButton["START"] = 2] = "START";
    ControlUnitButton[ControlUnitButton["SPEED"] = 5] = "SPEED";
    ControlUnitButton[ControlUnitButton["BRAKE"] = 6] = "BRAKE";
    ControlUnitButton[ControlUnitButton["FUEL"] = 7] = "FUEL";
    ControlUnitButton[ControlUnitButton["CODE"] = 8] = "CODE";
})(ControlUnitButton || (ControlUnitButton = {}));
var Settings = /** @class */ (function () {
    function Settings() {
        this.connectionTimeout = CONNECTION_TIMEOUT;
        this.requestTimeout = REQUEST_TIMEOUT;
        this.minReconnectDelay = MIN_RECONNECT_DELAY;
        this.maxReconnectDelay = MAX_RECONNECT_DELAY;
    }
    return Settings;
}());

;
var ControlUnit = /** @class */ (function () {
    function ControlUnit(peripheral, settings, logger) {
        var _this = this;
        this.peripheral = peripheral;
        this.settings = settings;
        this.logger = logger;
        this.requests = Array();
        this.state = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]('disconnected');
        this.connection = this.peripheral.connect({
            next: function () { return _this.connection.next(POLL_COMMAND.buffer); }
        });
        var connection = this.connection.share(); // FIXME: concat does not define order of (un)subscribe
        this.data = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].concat(connection.timeout(settings.connectionTimeout).take(1).do(function () { return _this.state.next('connected'); }), connection.timeout(settings.requestTimeout)).retryWhen(function (errors) {
            return _this.doReconnect(errors);
        }).do(function () {
            _this.poll();
        }).map(function (data) {
            return new __WEBPACK_IMPORTED_MODULE_11__data_view__["a" /* DataView */](data);
        }).publish();
        this.status = this.data.filter(function (view) {
            return view.byteLength >= 16 && view.toString(0, 2) === '?:';
        }).publishReplay(1).refCount();
    }
    ControlUnit.prototype.connect = function () {
        this.state.next('connecting');
        this.subscription = this.data.connect();
        return Promise.resolve();
    };
    ControlUnit.prototype.disconnect = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        return Promise.resolve();
    };
    ControlUnit.prototype.reconnect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.disconnect();
            setTimeout(function () {
                _this.connect();
                resolve();
            }, _this.settings.minReconnectDelay);
        });
    };
    ControlUnit.prototype.getState = function () {
        return this.state.asObservable();
    };
    ControlUnit.prototype.getFuel = function () {
        return this.status.map(function (data) { return data.getUint8Array(2, 8); });
    };
    ControlUnit.prototype.getStart = function () {
        return this.status.map(function (data) { return data.getUint4(10); });
    };
    ControlUnit.prototype.getMode = function () {
        return this.status.map(function (data) { return data.getUint4(11); });
    };
    ControlUnit.prototype.getPit = function () {
        return this.status.map(function (data) { return data.getUint8(12); });
    };
    ControlUnit.prototype.getTimer = function () {
        var _this = this;
        return this.data.filter(function (view) {
            // TODO: check CRC
            return view.byteLength >= 12 && view.toString(0, 1) === '?' && view.toString(1, 1) !== ':';
        }).filter(function (view) {
            var id = view.toString(1, 1);
            if (id < '1' || id > '8') {
                _this.logger.warn('Invalid timer data:', view.toString());
                return false;
            }
            else {
                return true;
            }
        }).map(function (view) {
            // tuples are never inferred
            return [view.getUint4(1) - 1, view.getUint32(2), view.getUint4(10)];
        }).distinctUntilChanged(
        // guard against repeated timings
        function (a, b) { return a[0] === b[0] && a[1] === b[1]; });
    };
    ControlUnit.prototype.getVersion = function () {
        // TODO: timeout, retry?
        var observable = this.data.filter(function (view) {
            return view.byteLength == 6 && view.toString(0, 1) == '0';
        }).map(function (view) {
            return view.toString(1, 4);
        });
        this.requests.push(VERSION_COMMAND);
        return observable;
    };
    ControlUnit.prototype.reset = function () {
        this.requests.push(RESET_COMMAND);
    };
    ControlUnit.prototype.setLap = function (value) {
        this.setLapHi(value >> 4);
        this.setLapLo(value & 0xf);
    };
    ControlUnit.prototype.setLapHi = function (value) {
        this.set(17, 7, value);
    };
    ControlUnit.prototype.setLapLo = function (value) {
        this.set(18, 7, value);
    };
    ControlUnit.prototype.setPosition = function (id, pos) {
        this.set(6, id, pos);
    };
    ControlUnit.prototype.clearPosition = function () {
        this.set(6, 0, 9);
    };
    ControlUnit.prototype.setMask = function (value) {
        this.requests.push(__WEBPACK_IMPORTED_MODULE_11__data_view__["a" /* DataView */].from(':', value & 0xf, value >> 4));
    };
    ControlUnit.prototype.setSpeed = function (id, value) {
        this.set(0, id, value, 2);
    };
    ControlUnit.prototype.setBrake = function (id, value) {
        this.set(1, id, value, 2);
    };
    ControlUnit.prototype.setFuel = function (id, value) {
        this.set(2, id, value, 2);
    };
    ControlUnit.prototype.toggleStart = function () {
        this.trigger(ControlUnitButton.START);
    };
    ControlUnit.prototype.trigger = function (button) {
        this.requests.push(__WEBPACK_IMPORTED_MODULE_11__data_view__["a" /* DataView */].fromString('T' + String.fromCharCode(0x30 | button)));
    };
    ControlUnit.prototype.set = function (address, id, value, repeat) {
        if (repeat === void 0) { repeat = 1; }
        var args = [address & 0x0f, (address >> 4) | (id << 1), value, repeat];
        this.requests.push(__WEBPACK_IMPORTED_MODULE_11__data_view__["a" /* DataView */].from.apply(__WEBPACK_IMPORTED_MODULE_11__data_view__["a" /* DataView */], ['J'].concat(args)));
    };
    ControlUnit.prototype.poll = function () {
        var request = this.requests.shift() || POLL_COMMAND;
        this.connection.next(request.buffer);
    };
    ControlUnit.prototype.doReconnect = function (errors) {
        var _this = this;
        var state = this.state;
        return errors.do(function (error) {
            _this.logger.error('Device error:', error);
        }).scan(function (count, error) {
            return state.value === 'connected' ? 0 : count + 1;
        }, 0).do(function () {
            state.next('disconnected');
        }).concatMap(function (count) {
            var backoff = _this.settings.minReconnectDelay * Math.pow(1.5, count);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].timer(Math.min(backoff, _this.settings.maxReconnectDelay));
        }).do(function () {
            state.next('connecting');
        });
    };
    return ControlUnit;
}());

//# sourceMappingURL=control-unit.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export controlUnitSubject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__i18n_alert_controller__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_unit__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error_handler__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logger__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__speech__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__toast__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









function controlUnitSubject() {
    return new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](null);
}
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_3__control_unit__["b" /* CONTROL_UNIT_SUBJECT */], useFactory: controlUnitSubject },
                __WEBPACK_IMPORTED_MODULE_2__i18n_alert_controller__["a" /* I18nAlertController */],
                __WEBPACK_IMPORTED_MODULE_5__logger__["a" /* Logger */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4__error_handler__["a" /* LoggingErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__settings__["d" /* Settings */],
                __WEBPACK_IMPORTED_MODULE_7__speech__["a" /* Speech */],
                __WEBPACK_IMPORTED_MODULE_8__toast__["a" /* Toast */]
            ]
        })
    ], CoreModule);
    return CoreModule;
}());

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backend__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ble__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__demo__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__serial__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web_bluetooth__ = __webpack_require__(724);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var BackendModule = /** @class */ (function () {
    function BackendModule() {
    }
    BackendModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__backend__["a" /* Backend */], useClass: __WEBPACK_IMPORTED_MODULE_2__ble__["a" /* BLEBackend */], multi: true },
                { provide: __WEBPACK_IMPORTED_MODULE_1__backend__["a" /* Backend */], useClass: __WEBPACK_IMPORTED_MODULE_3__demo__["a" /* DemoBackend */], multi: true },
                { provide: __WEBPACK_IMPORTED_MODULE_1__backend__["a" /* Backend */], useClass: __WEBPACK_IMPORTED_MODULE_4__serial__["a" /* SerialBackend */], multi: true },
                { provide: __WEBPACK_IMPORTED_MODULE_1__backend__["a" /* Backend */], useClass: __WEBPACK_IMPORTED_MODULE_5__web_bluetooth__["a" /* WebBluetoothBackend */], multi: true },
            ]
        })
    ], BackendModule);
    return BackendModule;
}());

//# sourceMappingURL=backend.module.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebBluetoothBackend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__backend__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__carrera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core__ = __webpack_require__(13);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SERVICE_UUID = '39df7777-b1b4-b90b-57f1-7144ae4e4a6a';
var OUTPUT_UUID = '39df8888-b1b4-b90b-57f1-7144ae4e4a6a';
var NOTIFY_UUID = '39df9999-b1b4-b90b-57f1-7144ae4e4a6a';
var DOLLAR = '$'.charCodeAt(0);
function bufferToString(buffer) {
    // TODO: special DataView.convertToString() method?
    var v = new __WEBPACK_IMPORTED_MODULE_4__carrera__["c" /* DataView */](buffer);
    return v.toString();
}
var WebBluetoothPeripheral = /** @class */ (function () {
    function WebBluetoothPeripheral(device, logger, zone) {
        this.device = device;
        this.logger = logger;
        this.zone = zone;
        this.type = 'web-bluetooth';
        this.name = device.name;
        this.address = device.id;
    }
    WebBluetoothPeripheral.prototype.connect = function (connected, disconnected) {
        var observable = this.createObservable(connected, disconnected);
        var observer = this.createObserver(disconnected);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"].create(observer, observable);
    };
    WebBluetoothPeripheral.prototype.equals = function (other) {
        return other && other.type === this.type && other.address === this.address;
    };
    WebBluetoothPeripheral.prototype.createObservable = function (connected, disconnected) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"](function (subscriber) {
            _this.logger.info('Connecting to Web Bluetooth device ' + _this.address);
            var service = _this.device.gatt.connect().then(function (server) {
                return server.getPrimaryService(SERVICE_UUID);
            });
            var notify = service.then(function (s) { return s.getCharacteristic(NOTIFY_UUID); });
            var eventListener = function (event) {
                var data = event.target.value.buffer;
                if (_this.logger.isDebugEnabled()) {
                    var s = bufferToString(data);
                    if (s !== lastReceived) {
                        _this.logger.debug('Web Bluetooth received ' + s);
                        lastReceived = s;
                    }
                }
                _this.onNotify(data, subscriber);
            };
            var lastReceived = null;
            _this.lastWritten = null;
            _this.output = service.then(function (s) { return s.getCharacteristic(OUTPUT_UUID); });
            notify.then(function (characteristic) {
                return characteristic.startNotifications().then(function (_) { return characteristic; });
            }).then(function (characteristic) {
                characteristic.addEventListener('characteristicvaluechanged', eventListener);
                _this.logger.info('Web Bluetooth device ready');
                if (connected) {
                    _this.zone.run(function () { return connected.next(undefined); });
                }
            }).catch(function (error) {
                _this.onError(error, subscriber);
            });
            return function () {
                notify.then(function (characteristic) {
                    return characteristic.stopNotifications().then(function (_) { return characteristic; });
                }).then(function (characteristic) {
                    characteristic.removeEventListener('characteristicvaluechanged', eventListener);
                }).catch(function (error) {
                    _this.logger.error('Error stopping Web Bluetooth notifications', error);
                }).then(function (_) {
                    _this.disconnect(disconnected);
                });
            };
        });
    };
    WebBluetoothPeripheral.prototype.createObserver = function (disconnected) {
        var _this = this;
        return {
            next: function (value) {
                if (_this.device.gatt.connected && _this.output) {
                    if (_this.logger.isDebugEnabled()) {
                        var s = bufferToString(value);
                        if (s !== _this.lastWritten) {
                            _this.logger.debug('Web Bluetooth write ' + s);
                            _this.lastWritten = s;
                        }
                    }
                    _this.output.then(function (characteristic) {
                        return characteristic.writeValue(value);
                    }).catch(function (error) {
                        _this.logger.error('Web Bluetooth write error', error);
                    });
                }
                else {
                    _this.logger.error('Web Bluetooth write while device disconnected');
                }
            },
            error: function (err) { return _this.logger.error('Web Bluetooth user error', err); },
            complete: function () { return _this.disconnect(disconnected); }
        };
    };
    WebBluetoothPeripheral.prototype.disconnect = function (disconnected) {
        if (this.device.gatt.connected) {
            this.logger.debug('Closing Web Bluetooth connection to ' + this.address);
            try {
                this.device.gatt.disconnect();
            }
            catch (error) {
                this.logger.debug('Error closing Web Bluetooth connection', error);
            }
            this.output = null;
            if (disconnected) {
                this.zone.run(function () { return disconnected.next(undefined); });
            }
        }
    };
    WebBluetoothPeripheral.prototype.onNotify = function (data, subscriber) {
        // strip trailing '$' and prepend missing '0'/'?' for notifications
        // TODO: only handle version specially and drop '?'?
        var view = new Uint8Array(data);
        if (view[view.length - 1] == DOLLAR) {
            view.copyWithin(1, 0);
            view[0] = view.length == 6 ? 0x30 : 0x3f;
        }
        this.zone.run(function () { return subscriber.next(view.buffer); });
    };
    WebBluetoothPeripheral.prototype.onError = function (error, subscriber) {
        this.zone.run(function () { return subscriber.error(error); });
    };
    return WebBluetoothPeripheral;
}());
var WebBluetoothBackend = /** @class */ (function (_super) {
    __extends(WebBluetoothBackend, _super);
    function WebBluetoothBackend(logger, platform, zone) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        _this.platform = platform;
        _this.zone = zone;
        _this.navigator = window.navigator;
        return _this;
    }
    WebBluetoothBackend.prototype.scan = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].from(this.platform.ready()).switchMap(function (readySource) {
            if (readySource != 'cordova' && _this.navigator.bluetooth) {
                return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].from(_this.requestDevice()).catch(function (err) {
                    _this.logger.error('Error requesting Web Bluetooth device', err);
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].empty();
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].empty();
            }
        });
    };
    WebBluetoothBackend.prototype.requestDevice = function () {
        var _this = this;
        if (this.device) {
            return this.device; // avoid multiple pop-up dialogs
        }
        else {
            return this.navigator.bluetooth.requestDevice({
                filters: [{ name: 'Control_Unit' }],
                optionalServices: [SERVICE_UUID]
            }).then(function (device) {
                var p = new WebBluetoothPeripheral(device, _this.logger, _this.zone);
                _this.device = Promise.resolve(p);
                return p;
            });
        }
    };
    WebBluetoothBackend = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__core__["f" /* Logger */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], WebBluetoothBackend);
    return WebBluetoothBackend;
}(__WEBPACK_IMPORTED_MODULE_3__backend__["a" /* Backend */]));

//# sourceMappingURL=web-bluetooth.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_module__ = __webpack_require__(726);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__menu_module__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__connections_component__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_component__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__connections_component__["a" /* ConnectionsComponent */],
                __WEBPACK_IMPORTED_MODULE_4__menu_component__["a" /* MenuComponent */]
            ],
            entryComponents: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__menu_component__["a" /* MenuComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__shared__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */]
            ],
            providers: []
        })
    ], MenuModule);
    return MenuModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__carrera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rms__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tuning__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__connections_component__ = __webpack_require__(380);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MenuComponent = /** @class */ (function () {
    function MenuComponent(alert, logger, settings, modal, platform) {
        this.alert = alert;
        this.logger = logger;
        this.settings = settings;
        this.modal = modal;
        this.platform = platform;
        this.colorsPage = __WEBPACK_IMPORTED_MODULE_6__settings__["a" /* ColorsPage */];
        this.driversPage = __WEBPACK_IMPORTED_MODULE_6__settings__["b" /* DriversPage */];
        this.settingsPage = __WEBPACK_IMPORTED_MODULE_6__settings__["d" /* SettingsPage */];
        this.tuningPage = __WEBPACK_IMPORTED_MODULE_7__tuning__["b" /* TuningPage */];
        this.initialized = false;
    }
    MenuComponent.prototype.ngOnChanges = function (changes) {
        if ('cu' in changes) {
            this.mode = !!this.cu;
            this.version = this.cu ? this.cu.getVersion() : __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].of(undefined);
        }
    };
    MenuComponent.prototype.onMenuOpen = function () {
        // Web Bluetooth workaround - needs user gesture for scanning
        if (!this.initialized && this.connections) {
            if (navigator.bluetooth) {
                this.connections.ngOnInit();
            }
            this.initialized = true;
        }
    };
    MenuComponent.prototype.onMenuClose = function () {
        this.mode = !!this.cu;
    };
    MenuComponent.prototype.onMenuToggle = function () {
        this.mode = !this.mode;
    };
    MenuComponent.prototype.reconnect = function () {
        var _this = this;
        if (this.cu) {
            this.logger.info('Reconnecting to', this.cu.peripheral);
            this.cu.reconnect().then(function () {
                _this.version = _this.cu.getVersion();
            });
        }
    };
    MenuComponent.prototype.startPractice = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__rms__["c" /* RmsPage */], new __WEBPACK_IMPORTED_MODULE_4__core__["h" /* RaceOptions */]('practice'));
    };
    MenuComponent.prototype.startQualifying = function () {
        var _this = this;
        this.settings.getQualifyingSettings().take(1).subscribe(function (options) {
            var modal = _this.modal.create(__WEBPACK_IMPORTED_MODULE_5__rms__["a" /* RaceSettingsPage */], options);
            modal.onDidDismiss(function (options) {
                if (options) {
                    _this.settings.setQualifyingSettings(options).then(function () {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__rms__["c" /* RmsPage */], options);
                    });
                }
            });
            modal.present();
        });
    };
    MenuComponent.prototype.startRace = function () {
        var _this = this;
        this.settings.getRaceSettings().take(1).subscribe(function (options) {
            var modal = _this.modal.create(__WEBPACK_IMPORTED_MODULE_5__rms__["a" /* RaceSettingsPage */], options);
            modal.onDidDismiss(function (options) {
                if (options) {
                    _this.settings.setRaceSettings(options).then(function () {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__rms__["c" /* RmsPage */], options);
                    });
                }
            });
            modal.present();
        });
    };
    MenuComponent.prototype.exitApp = function () {
        var _this = this;
        var alert = this.alert.create({
            message: 'Exit Open Lap?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'OK',
                    handler: function () { return _this.exit(); }
                }]
        });
        alert.present();
    };
    MenuComponent.prototype.exit = function () {
        this.logger.info('Exiting application');
        if (this.cu) {
            this.cu.disconnect();
        }
        this.platform.exitApp();
        this.logger.info('Exited application');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__carrera__["a" /* ControlUnit */])
    ], MenuComponent.prototype, "cu", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MenuComponent.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_8__connections_component__["a" /* ConnectionsComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8__connections_component__["a" /* ConnectionsComponent */])
    ], MenuComponent.prototype, "connections", void 0);
    MenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-menu',template:/*ion-inline-start:"/home/tkem/src/openlap/src/menu/menu.component.html"*/'<ion-menu [content]="nav" (ionClose)="onMenuClose()" (ionOpen)="onMenuOpen()">\n  <ion-content>\n    <ion-item [color]="cu ? \'primary\' : \'danger\'" (click)="onMenuToggle()">\n      <h1>{{cu ? cu.peripheral.name : (\'No connection\' | translate)}}</h1>\n      <h2>{{cu?.peripheral.address}}</h2>\n      <h3 *ngIf="cu">\n        <span translate>Firmware version</span>\n        {{version | async | cuversion}}\n      </h3>\n      <ion-icon item-right [name]="mode ? \'arrow-dropdown\' : \'arrow-dropup\'"></ion-icon>\n    </ion-item>\n    <div *ngIf="mode">\n      <ion-item-group>\n        <button ion-item menuClose [disabled]="!cu" (click)="startPractice()">\n          <ion-icon name="speedometer" item-left></ion-icon>\n          <span translate>Free Practice</span>\n        </button>\n        <button ion-item menuClose [disabled]="!cu" (click)="startQualifying()">\n          <ion-icon name="stopwatch" item-left></ion-icon>\n          <span translate>Qualifying</span>\n        </button>\n        <button ion-item menuClose [disabled]="!cu" (click)="startRace()">\n          <ion-icon name="trophy" item-left></ion-icon>\n          <span translate>Race</span>\n        </button>\n      </ion-item-group>\n      <ion-item-group>\n        <button ion-item menuClose (click)="nav.push(driversPage)">\n          <ion-icon name="people" item-left></ion-icon>\n          <span translate>Drivers</span>\n        </button>\n        <button ion-item menuClose (click)="nav.push(colorsPage)">\n          <ion-icon name="color-palette" item-left></ion-icon>\n          <span translate>Colors</span>\n        </button>\n        <button ion-item menuClose [disabled]="!cu" (click)="nav.push(tuningPage)">\n          <ion-icon name="build" item-left></ion-icon>\n          <span translate>Tuning</span>\n        </button>\n      </ion-item-group>\n      <ion-item-group>\n        <button ion-item menuClose (click)="nav.push(settingsPage)">\n          <ion-icon name="settings" item-left></ion-icon>\n          <span translate>Settings</span>\n        </button>\n        <button ion-item menuClose (click)="exitApp()">\n          <ion-icon name="exit" item-left></ion-icon>\n          <span translate>Exit</span>\n        </button>\n      </ion-item-group>\n    </div>\n    <div *ngIf="!mode">\n      <ion-item-group>\n        <app-connections [selected]="cu?.peripheral"></app-connections>\n      </ion-item-group>\n      <ion-item-group *ngIf="cu">\n        <button ion-item (click)="reconnect()">\n          <ion-icon name="refresh" item-left></ion-icon>\n          <span translate>Reconnect</span>\n        </button>\n      </ion-item-group>\n    </div>\n  </ion-content>\n</ion-menu>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/menu/menu.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__core__["e" /* I18nAlertController */],
            __WEBPACK_IMPORTED_MODULE_4__core__["f" /* Logger */],
            __WEBPACK_IMPORTED_MODULE_4__core__["i" /* Settings */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
    ], MenuComponent);
    return MenuComponent;
}());

//# sourceMappingURL=menu.component.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Session; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);

var TIMER_INTERVAL = 500;
function createMask(first, last) {
    var mask = 0;
    while (first !== last) {
        mask |= (1 << first);
        ++first;
    }
    return mask;
}
function numCompare(lhs, rhs) {
    var r = lhs - rhs;
    if (!isNaN(r)) {
        return r;
    }
    else if (isNaN(lhs)) {
        return isNaN(rhs) ? 0 : 1;
    }
    else {
        return -1;
    }
}
function timeCompare(lhs, rhs) {
    return (lhs.best[0] || Infinity) - (rhs.best[0] || Infinity);
}
function raceCompare(lhs, rhs) {
    return (rhs.laps - lhs.laps) || numCompare(lhs.time, rhs.time) || (lhs.id - rhs.id);
}
var COMPARE = {
    'practice': timeCompare,
    'qualifying': timeCompare,
    'race': raceCompare
};
var Session = /** @class */ (function () {
    // TODO: move settings handling/combine to race-control!
    function Session(cu, options) {
        var _this = this;
        this.cu = cu;
        this.options = options;
        this.finished = new __WEBPACK_IMPORTED_MODULE_0_rxjs__["BehaviorSubject"](false);
        this.yellowFlag = new __WEBPACK_IMPORTED_MODULE_0_rxjs__["BehaviorSubject"](false);
        this.timer = __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].of(0);
        this.started = false;
        this.stopped = false;
        this.active = 0;
        this.realMask = null;
        var compare = COMPARE[options.mode];
        var reset = __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].merge(cu.getStart().distinctUntilChanged().filter(function (start) { return start != 0; }), cu.getState().distinctUntilChanged().filter(function (state) { return state == 'connected'; })).map(function (value) {
            cu.setMask(_this.mask);
        });
        // create monotonic timer
        var timer = cu.getTimer().filter(function (_a) {
            var id = _a[0];
            return !(_this.mask & (1 << id));
        }).scan(function (_a, _b) {
            var _ = _a[0], _c = _a[1], prev = _c[0], offset = _c[1], then = _c[2];
            var id = _b[0], time = _b[1], group = _b[2];
            // TODO: combine with reset?
            var now = Date.now();
            if (time < prev) {
                offset = ((now - then + prev) || 0) - time;
            }
            return [[id, time + offset, group], [time, offset, now]];
        }, [[], [Infinity, 0, NaN]]).map(function (_a) {
            var t = _a[0];
            return t;
        });
        var fuel = cu.getFuel();
        var pit = cu.getPit();
        this.mask = (options.auto ? 0 : 1 << 6) | (options.pace ? 0 : 1 << 7);
        if (options.drivers) {
            this.mask |= createMask(options.drivers, 6);
            this.grid = this.createGrid(timer, fuel, pit, ~this.mask & 0xff);
        }
        else {
            this.grid = this.createGrid(timer, fuel, pit);
        }
        this.ranking = reset.startWith(null).combineLatest(this.grid).map(function (_a) {
            var _reset = _a[0], grid = _a[1];
            return grid; // for reset side effects only...
        }).mergeAll().scan(function (grid, event) {
            var newgrid = grid.slice();
            newgrid[event.id] = event;
            return newgrid;
        }, []).map(function (cars) {
            var ranks = cars.filter(function (car) { return !!car; });
            ranks.sort(compare);
            return ranks;
        });
        this.currentLap = this.grid.mergeAll().scan(function (current, event) {
            if (current > event.laps) {
                return current;
            }
            else if (_this.finished.value || isNaN(event.time)) {
                return event.laps;
            }
            else {
                return event.laps + 1;
            }
        }, 0).startWith(0).publishReplay(1).refCount().distinctUntilChanged();
        if (options.time) {
            this.timer = __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].interval(TIMER_INTERVAL).withLatestFrom(cu.getStart(), cu.getState()).filter(function (_a) {
                var _ = _a[0], start = _a[1], state = _a[2];
                return _this.started && (!_this.options.pause || (start == 0 && state == 'connected'));
            }).scan(function (time) {
                return Math.max(0, time - TIMER_INTERVAL);
            }, options.time).do(function (time) {
                if (time == 0) {
                    _this.stopped = true;
                    _this.finish();
                }
            }).share().startWith(options.time);
        }
        this.cu.setMask(this.mask);
        this.cu.clearPosition();
        this.cu.reset();
    }
    Session.prototype.start = function () {
        this.started = true;
    };
    Session.prototype.stop = function () {
        this.stopped = true;
        this.finish();
    };
    Session.prototype.toggleYellowFlag = function () {
        var value = this.yellowFlag.value;
        if (this.yellowFlag.value) {
            this.mask = this.realMask;
            this.realMask = null;
        }
        else {
            this.realMask = this.mask;
            this.mask = 0xff;
        }
        this.cu.setMask(this.mask);
        this.yellowFlag.next(!value);
    };
    Session.prototype.createGrid = function (timer, fuel, pits, mask) {
        var _this = this;
        if (mask === void 0) { mask = 0; }
        var init = new Array();
        for (var i = 0; mask; ++i) {
            if (mask & 1) {
                init.push([i, NaN, 0]);
            }
            mask >>>= 1;
        }
        return timer.startWith.apply(timer, init).groupBy(function (_a) {
            var id = _a[0];
            return id;
        }).map(function (group) {
            _this.active |= (1 << group.key);
            var times = group.scan(function (_a, _b) {
                var times = _a[0], last = _a[1], best = _a[2], finished = _a[3];
                var id = _b[0], time = _b[1], sensor = _b[2];
                var tail = times[times.length - 1] || [];
                if (sensor && time > (tail.length >= sensor ? tail[sensor - 1] : -Infinity) + _this.options.minLapTime) {
                    if (sensor === 1) {
                        times.push([time]);
                        last[0] = time - tail[0];
                        best[0] = Math.min(last[0], best[0] || Infinity);
                        if (tail.length > 1) {
                            last[tail.length] = time - tail[tail.length - 1];
                            best[tail.length] = Math.min(last[tail.length], best[tail.length] || Infinity);
                        }
                        if (!finished && _this.isFinished(times.length - 1)) {
                            _this.finish(id);
                            finished = true;
                        }
                    }
                    else {
                        var index = sensor - 1;
                        tail[index] = time;
                        last[index] = time - tail[index - 1];
                        best[index] = Math.min(last[index], best[index] || Infinity);
                    }
                }
                return [times, last, best, finished];
            }, [[], [], [], false]);
            return times.combineLatest(pits.map(function (mask) { return ((mask & ~_this.mask) & (1 << group.key)) != 0; }).distinctUntilChanged().scan(function (_a, inpit) {
                var count = _a[0];
                return [inpit ? count + 1 : count, inpit];
            }, [0, false]), fuel.map(function (fuel) { return fuel[group.key]; }).distinctUntilChanged()).map(function (_a) {
                var _b = _a[0], times = _b[0], last = _b[1], best = _b[2], finished = _b[3], _c = _a[1], pits = _c[0], pit = _c[1], fuel = _a[2];
                var laps = times.length ? times.length - 1 : 0;
                var curr = times[times.length - 1] || [];
                var prev = times[times.length - 2] || [];
                return {
                    id: group.key,
                    time: curr[0],
                    laps: laps,
                    last: last,
                    best: best,
                    fuel: fuel,
                    pit: pit,
                    pits: pits,
                    sector: curr.length - 1 || prev.length,
                    finished: finished
                };
            }).publishReplay(1).refCount();
        }).publishReplay().refCount();
    };
    Session.prototype.finish = function (id) {
        var mask = this.mask;
        this.mask |= (~this.active & 0xff);
        if (id !== undefined) {
            this.mask |= (1 << id);
        }
        if (mask != this.mask) {
            this.cu.setMask(this.mask);
        }
        this.finished.next(true);
    };
    Session.prototype.isFinished = function (laps) {
        if (this.stopped) {
            return true;
        }
        else if (this.options.laps && laps >= this.options.laps) {
            return true;
        }
        else if (!this.options.slotmode && this.finished.value) {
            return true;
        }
        else {
            return false;
        }
    };
    return Session;
}());

//# sourceMappingURL=session.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RmsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__leaderboard__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rms_menu__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rms_page__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__race_settings_page__ = __webpack_require__(383);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var RmsModule = /** @class */ (function () {
    function RmsModule() {
    }
    RmsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__rms_menu__["a" /* RmsMenu */],
                __WEBPACK_IMPORTED_MODULE_7__rms_page__["a" /* RmsPage */],
                __WEBPACK_IMPORTED_MODULE_8__race_settings_page__["a" /* RaceSettingsPage */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__rms_menu__["a" /* RmsMenu */],
                __WEBPACK_IMPORTED_MODULE_7__rms_page__["a" /* RmsPage */],
                __WEBPACK_IMPORTED_MODULE_8__race_settings_page__["a" /* RaceSettingsPage */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_7__rms_page__["a" /* RmsPage */],
                __WEBPACK_IMPORTED_MODULE_8__race_settings_page__["a" /* RaceSettingsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_5__leaderboard__["a" /* LeaderboardModule */],
                __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* SharedModule */]
            ],
            providers: []
        })
    ], RmsModule);
    return RmsModule;
}());

//# sourceMappingURL=rms.module.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkerboard_component__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cu_version_pipe__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dot_matrix_component__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gauge_component__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__startlight_component__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__stripe_component__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__target_directive__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__time_pipe__ = __webpack_require__(738);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__checkerboard_component__["a" /* CheckerboardComponent */],
                __WEBPACK_IMPORTED_MODULE_4__cu_version_pipe__["a" /* CuVersionPipe */],
                __WEBPACK_IMPORTED_MODULE_5__dot_matrix_component__["a" /* DotMatrixComponent */],
                __WEBPACK_IMPORTED_MODULE_6__gauge_component__["a" /* GaugeComponent */],
                __WEBPACK_IMPORTED_MODULE_7__startlight_component__["a" /* StartlightComponent */],
                __WEBPACK_IMPORTED_MODULE_8__stripe_component__["a" /* StripeComponent */],
                __WEBPACK_IMPORTED_MODULE_9__target_directive__["a" /* TargetDirective */],
                __WEBPACK_IMPORTED_MODULE_10__time_pipe__["a" /* TimePipe */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__checkerboard_component__["a" /* CheckerboardComponent */],
                __WEBPACK_IMPORTED_MODULE_4__cu_version_pipe__["a" /* CuVersionPipe */],
                __WEBPACK_IMPORTED_MODULE_5__dot_matrix_component__["a" /* DotMatrixComponent */],
                __WEBPACK_IMPORTED_MODULE_6__gauge_component__["a" /* GaugeComponent */],
                __WEBPACK_IMPORTED_MODULE_7__startlight_component__["a" /* StartlightComponent */],
                __WEBPACK_IMPORTED_MODULE_8__stripe_component__["a" /* StripeComponent */],
                __WEBPACK_IMPORTED_MODULE_9__target_directive__["a" /* TargetDirective */],
                __WEBPACK_IMPORTED_MODULE_10__time_pipe__["a" /* TimePipe */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckerboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

function createCheckerboardPath(width, height) {
    var path = [];
    for (var x = 0; x < width; x += 2) {
        path.push('M', x, ',0V', height, 'H', x + 1, 'V0Z');
    }
    for (var y = 1; y < height; y += 2) {
        path.push('M0,', y, 'H', width, 'V', y + 1, 'H0Z');
    }
    return path.join('');
}
var CheckerboardComponent = /** @class */ (function () {
    function CheckerboardComponent() {
    }
    CheckerboardComponent.prototype.ngOnChanges = function (_) {
        this.path = createCheckerboardPath(this.cols, this.rows);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], CheckerboardComponent.prototype, "cols", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], CheckerboardComponent.prototype, "rows", void 0);
    CheckerboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
            selector: 'checkerboard',
            styles: ['svg { fill: currentColor; height: 1em; }'],template:/*ion-inline-start:"/home/tkem/src/openlap/src/shared/checkerboard.component.html"*/'<svg attr.viewBox="0 0 {{cols}} {{rows}}">\n  <path [attr.d]="path" fill-rule="evenodd"/>\n</svg>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/shared/checkerboard.component.html"*/,
        })
    ], CheckerboardComponent);
    return CheckerboardComponent;
}());

//# sourceMappingURL=checkerboard.component.js.map

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuVersionPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CuVersionPipe = /** @class */ (function () {
    function CuVersionPipe() {
    }
    CuVersionPipe.prototype.transform = function (value) {
        return value ? value.replace(/^5(\d)(\d+)$/, '$1.$2') : '';
    };
    CuVersionPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'cuversion', pure: true }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], CuVersionPipe);
    return CuVersionPipe;
}());

//# sourceMappingURL=cu-version.pipe.js.map

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DotMatrixComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DotMatrixComponent = /** @class */ (function () {
    function DotMatrixComponent() {
        this.radius = 0.4;
    }
    DotMatrixComponent.prototype.ngOnChanges = function (_) {
        this.xoffsets = [];
        this.yoffsets = [];
        for (var x = 0; x < this.cols; ++x) {
            this.xoffsets.push(x + 0.5);
        }
        for (var y = 0; y < this.rows; ++y) {
            this.yoffsets.push(y + 0.5);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], DotMatrixComponent.prototype, "cols", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], DotMatrixComponent.prototype, "rows", void 0);
    DotMatrixComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
            selector: 'dot-matrix',
            styles: ['svg { fill: currentColor; height: 1em; }'],template:/*ion-inline-start:"/home/tkem/src/openlap/src/shared/dot-matrix.component.html"*/'<svg attr.viewBox="0 0 {{cols}} {{rows}}">\n  <g *ngFor="let cx of xoffsets">\n    <circle *ngFor="let cy of yoffsets" [attr.cx]="cx" [attr.cy]="cy" [attr.r]="radius"></circle>\n  </g>\n  <path [attr.d]="path" fill-rule="evenodd"/>\n</svg>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/shared/dot-matrix.component.html"*/,
        })
    ], DotMatrixComponent);
    return DotMatrixComponent;
}());

//# sourceMappingURL=dot-matrix.component.js.map

/***/ }),

/***/ 734:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GaugeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GaugeComponent = /** @class */ (function () {
    function GaugeComponent() {
        this.min = 0;
        this.max = 1.0;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "min", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "max", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "value", void 0);
    GaugeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
            selector: 'gauge',
            // FIXME: empty inline-box not shown in Firefox?
            styles: ['span { display: inline-block; background-clip: content-box; min-height: 0.75em; width: 100%; }'],template:/*ion-inline-start:"/home/tkem/src/openlap/src/shared/gauge.component.html"*/'<span [style.paddingRight]="100 * (max - value) / (max - min) + \'%\'"></span>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/shared/gauge.component.html"*/
        })
    ], GaugeComponent);
    return GaugeComponent;
}());

//# sourceMappingURL=gauge.component.js.map

/***/ }),

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartlightComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StartlightComponent = /** @class */ (function () {
    function StartlightComponent() {
        this.blink = false;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], StartlightComponent.prototype, "active", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], StartlightComponent.prototype, "blink", void 0);
    StartlightComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
            selector: 'startlight',
            styles: ["\n  @keyframes startlight-blink {\n    from {\n      background: radial-gradient(circle at 60% 60%, gray 0%, black 95%, gray 100%);\n    }\n    to {\n      background: radial-gradient(circle at 60% 60%, red 0%, #330000 95%, red 100%);\n    }\n  }\n  div {\n    display: inline-block;\n    border-radius: 50%;\n    width: 1em;\n    height: 1em;\n    background: radial-gradient(circle at 60% 60%, gray 0%, black 95%, gray 100%);\n  }\n  div.active {\n    background: radial-gradient(circle at 60% 60%, red 0%, #330000 95%, red 100%);\n  }\n  div.blink {\n    animation-name: startlight-blink;\n    animation-duration: 0.5s;\n    animation-iteration-count: infinite;\n    animation-timing-function: linear;\n  }\n  "],template:/*ion-inline-start:"/home/tkem/src/openlap/src/shared/startlight.component.html"*/'<div [ngClass]="{ active: active, blink: blink }"></div>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/shared/startlight.component.html"*/
        })
    ], StartlightComponent);
    return StartlightComponent;
}());

//# sourceMappingURL=startlight.component.js.map

/***/ }),

/***/ 736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StripeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StripeComponent = /** @class */ (function () {
    function StripeComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], StripeComponent.prototype, "stripe", void 0);
    StripeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: '[stripe]',
            styles: ["\n           :host {\n             overflow: hidden;\n             position: relative;\n             z-index: 0;\n           }\n           .stripe-inner {\n             position: absolute;\n             height: 100%;\n             width: 100%;\n             top: 0;\n             left: 0;\n             -webkit-transform: skew(-30deg);\n             transform: skew(-30deg);\n             -webkit-transform-origin: top right;\n             transform-origin: top right;\n             border-right: 0.3em solid;\n             background: #999;\n             z-index: -1;\n           }"
            ],template:/*ion-inline-start:"/home/tkem/src/openlap/src/shared/stripe.component.html"*/'<div class="stripe-inner" [style.border-right-color]="stripe">&nbsp;</div>\n<ng-content></ng-content>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/shared/stripe.component.html"*/
        })
    ], StripeComponent);
    return StripeComponent;
}());

//# sourceMappingURL=stripe.component.js.map

/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TargetDirective = /** @class */ (function () {
    function TargetDirective() {
    }
    TargetDirective.prototype.onClick = function () {
        window.open(this.href, this.target);
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], TargetDirective.prototype, "target", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], TargetDirective.prototype, "href", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TargetDirective.prototype, "onClick", null);
    TargetDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: 'a[target]',
        })
    ], TargetDirective);
    return TargetDirective;
}());

//# sourceMappingURL=target.directive.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function formatHMS(t, digits) {
    if (digits === void 0) { digits = false; }
    var h = Math.floor(t / 3600000);
    var m = Math.floor((t - h * 3600000) / 60000);
    var s = (t - h * 3600000 - m * 60000) / 1000;
    if (digits) {
        return [h, ':', (m < 10 ? '0' : ''), m, ':', (s < 10 ? '0' : ''), s.toFixed(3)].join('');
    }
    else {
        return [h, ':', (m < 10 ? '0' : ''), m, ':', (s < 10 ? '0' : ''), Math.floor(s)].join('');
    }
}
function formatMS(t, digits) {
    if (digits === void 0) { digits = false; }
    var m = Math.floor(t / 60000);
    var s = (t - m * 60000) / 1000;
    if (digits) {
        return [m, ':', (s < 10 ? '0' : ''), s.toFixed(3)].join('');
    }
    else {
        return [m, ':', (s < 10 ? '0' : ''), Math.floor(s)].join('');
    }
}
var TIME_FORMATS = {
    'h:mm:ss': function (t) { return formatHMS(t); },
    'm:ss': function (t) { return formatMS(t); },
    's': function (t) { return Math.floor(t / 1000).toString(); },
    'h:mm:ss.sss': function (t) { return formatHMS(t, true); },
    'm:ss.sss': function (t) { return formatMS(t, true); },
    's.sss': function (t) { return (t / 1000).toFixed(3); },
    '+h:mm:ss': function (t) { return '+' + formatHMS(t); },
    '+m:ss': function (t) { return '+' + formatMS(t); },
    '+s': function (t) { return '+' + Math.floor(t / 1000).toString(); },
    '+h:mm:ss.sss': function (t) { return '+' + formatHMS(t, true); },
    '+m:ss.sss': function (t) { return '+' + formatMS(t, true); },
    '+s.sss': function (t) { return '+' + (t / 1000).toFixed(3); }
};
var TimePipe = /** @class */ (function () {
    function TimePipe() {
    }
    TimePipe.prototype.transform = function (value, pattern) {
        if (pattern === void 0) { pattern = 'h:mm:ss'; }
        if (value === null || value === undefined || Number.isNaN(value)) {
            return null;
        }
        else if (pattern in TIME_FORMATS) {
            return TIME_FORMATS[pattern](value >= 0 ? value : 0);
        }
        else {
            return pattern;
        }
    };
    TimePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'time', pure: true }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], TimePipe);
    return TimePipe;
}());

//# sourceMappingURL=time.pipe.js.map

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leaderboard_component__ = __webpack_require__(167);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__leaderboard_module__ = __webpack_require__(740);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__leaderboard_module__["a"]; });
 // TODO: item file?

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__leaderboard_component__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__leaderboard_head_component__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__leaderboard_item_component__ = __webpack_require__(742);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var LeaderboardModule = /** @class */ (function () {
    function LeaderboardModule() {
    }
    LeaderboardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__leaderboard_component__["a" /* LeaderboardComponent */],
                __WEBPACK_IMPORTED_MODULE_4__leaderboard_head_component__["a" /* LeaderboardHeadComponent */],
                __WEBPACK_IMPORTED_MODULE_5__leaderboard_item_component__["a" /* LeaderboardItemComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__leaderboard_component__["a" /* LeaderboardComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* SharedModule */]
            ]
        })
    ], LeaderboardModule);
    return LeaderboardModule;
}());

//# sourceMappingURL=leaderboard.module.js.map

/***/ }),

/***/ 741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardHeadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LeaderboardHeadComponent = /** @class */ (function () {
    function LeaderboardHeadComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], LeaderboardHeadComponent.prototype, "fields", void 0);
    LeaderboardHeadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
            selector: 'leaderboard-head',template:/*ion-inline-start:"/home/tkem/src/openlap/src/rms/leaderboard/leaderboard-head.component.html"*/'<div class="position cell">\n    <span class="title">POS</span>\n</div>\n<div *ngFor="let field of fields" [ngSwitch]="field" [ngClass]="[field, \'cell\']">\n    <span class="title" *ngSwitchCase="\'number\'">NO</span>\n    <span class="title" *ngSwitchCase="\'name\'">NAME</span>\n    <span class="title" *ngSwitchCase="\'code\'">NAME</span>\n    <span class="title" *ngSwitchCase="\'time\'">TIME</span>\n    <span class="title" *ngSwitchCase="\'lastlap\'">LAST LAP</span>\n    <span class="title" *ngSwitchCase="\'bestlap\'">BEST LAP</span>\n    <span class="title" *ngSwitchCase="\'sector1\'">S1</span>\n    <span class="title" *ngSwitchCase="\'sector2\'">S2</span>\n    <span class="title" *ngSwitchCase="\'sector3\'">S3</span>\n    <span class="title" *ngSwitchCase="\'gap\'">GAP</span>\n    <span class="title" *ngSwitchCase="\'int\'">INT</span>\n    <span class="title" *ngSwitchCase="\'laps\'">LAPS</span>\n    <span class="title" *ngSwitchCase="\'pits\'">PITS</span>\n    <span class="title" *ngSwitchCase="\'fuel\'">FUEL</span>\n    <span class="title" *ngSwitchCase="\'status\'"></span>\n</div>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/rms/leaderboard/leaderboard-head.component.html"*/
        })
    ], LeaderboardHeadComponent);
    return LeaderboardHeadComponent;
}());

//# sourceMappingURL=leaderboard-head.component.js.map

/***/ }),

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__leaderboard_component__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LeaderboardItemComponent = /** @class */ (function () {
    function LeaderboardItemComponent() {
    }
    LeaderboardItemComponent.prototype.abs = function (n) {
        return n < 0 ? -n : n;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], LeaderboardItemComponent.prototype, "fields", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__leaderboard_component__["b" /* LeaderboardItem */])
    ], LeaderboardItemComponent.prototype, "item", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], LeaderboardItemComponent.prototype, "items", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], LeaderboardItemComponent.prototype, "best", void 0);
    LeaderboardItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
            selector: 'leaderboard-item',template:/*ion-inline-start:"/home/tkem/src/openlap/src/rms/leaderboard/leaderboard-item.component.html"*/'<div class="position cell" [stripe]="item.driver?.color">\n    {{item.position + 1}}\n</div>\n<div *ngFor="let field of fields" [ngSwitch]="field" [ngClass]="[field, \'cell\']">\n    <ng-template ngSwitchCase="number">\n        {{item.id + 1}}\n    </ng-template>\n    <ng-template ngSwitchCase="name">\n        {{item.driver?.name}}\n    </ng-template>\n    <ng-template ngSwitchCase="code">\n        {{item.driver?.code}}\n    </ng-template>\n    <ng-template ngSwitchCase="time">\n        <span [ngSwitch]="item.position == 0 ? \'\' : (items[0].laps - item.laps).toString()">\n            <ng-template ngSwitchCase="">\n                {{item.time | time:\'m:ss.sss\'}}\n            </ng-template>\n            <ng-template ngSwitchCase="0">\n                {{(item.time - items[0].time) | time:\'+s.sss\'}}\n            </ng-template>\n            <ng-template ngSwitchCase="1">\n                +1 Lap\n            </ng-template>\n            <ng-template ngSwitchDefault>\n                +{{items[0].laps - item.laps}} Laps\n            </ng-template>\n        </span>\n    </ng-template>\n    <ng-template ngSwitchCase="bestlap">\n        <span [ngClass]="{notime: !item.best[0]}">\n            {{(item.best[0] | time:\'s.sss\') || \'NO&thinsp;TIME\'}}\n        </span>\n    </ng-template>\n    <ng-template ngSwitchCase="gap">\n        {{(item.position && item.best[0] ? item.best[0] - items[0].best[0] : null) | time:\'+s.sss\'}}\n    </ng-template>\n    <ng-template ngSwitchCase="int">\n        {{(item.position && item.best[0] ? item.best[0] - items[item.position - 1].best[0] : null) | time:\'+s.sss\'}}\n    </ng-template>\n    <ng-template ngSwitchCase="lastlap">\n        <span [ngClass]="{best: item.last[0] == item.best[0], allbest: item.last[0] == best[0], notime: !item.last[0]}">\n            {{(item.last[0] | time:\'s.sss\') || \'NO&thinsp;TIME\'}}\n        </span>\n    </ng-template>\n    <ng-template ngSwitchCase="sector1">\n        <span [ngClass]="{sector: item.sector == 1, best: item.last[1] == item.best[1], allbest: item.last[1] == best[1]}">\n            {{item.last[1] | time:\'s.sss\'}}\n        </span>\n    </ng-template>\n    <ng-template ngSwitchCase="sector2">\n        <span [ngClass]="{sector: item.sector == 2, best: item.last[2] == item.best[2], allbest: item.last[2] == best[2]}">\n            {{item.last[2] | time:\'s.sss\'}}\n        </span>\n    </ng-template>\n    <ng-template ngSwitchCase="sector3">\n        <span [ngClass]="{sector: item.sector == 3, best: item.last[3] == item.best[3], allbest: item.last[3] == best[3]}">\n            {{item.last[3] | time:\'s.sss\'}}\n        </span>\n    </ng-template>\n    <ng-template ngSwitchCase="laps">\n        {{item.laps}}\n    </ng-template>\n    <ng-template ngSwitchCase="pits">\n        {{item.pits}}\n    </ng-template>\n    <ng-template ngSwitchCase="fuel">\n        <gauge max="15" [value]="item.fuel">&nbsp;</gauge>\n    </ng-template>\n    <ng-template ngSwitchCase="status">\n        <checkerboard cols="7" rows="5" *ngIf="item.finished"></checkerboard>\n        <span *ngIf="!item.finished && item.pit" [ngClass]="item.refuel ? \'inpit\' : \'pitenter\'">PIT</span>\n        <span *ngIf="!item.finished && !item.pit && item.gridpos != null && item.laps && items.length > 2"\n            [ngClass]="item.gridpos > item.position ? \'pos-up\' : item.gridpos < item.position ? \'pos-dn\' : \'pos-eq\'">\n            {{abs(item.gridpos - item.position)}}\n        </span>\n    </ng-template>\n</div>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/rms/leaderboard/leaderboard-item.component.html"*/
        })
    ], LeaderboardItemComponent);
    return LeaderboardItemComponent;
}());

//# sourceMappingURL=leaderboard-item.component.js.map

/***/ }),

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__about_page__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__colors_page__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__connection_page__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__drivers_page__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__licenses_page__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__logging_menu__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__logging_page__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__notifications_page__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__settings_page__ = __webpack_require__(393);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__about_page__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__colors_page__["a" /* ColorsPage */],
                __WEBPACK_IMPORTED_MODULE_7__connection_page__["a" /* ConnectionPage */],
                __WEBPACK_IMPORTED_MODULE_8__drivers_page__["a" /* DriversPage */],
                __WEBPACK_IMPORTED_MODULE_9__licenses_page__["a" /* LicensesPage */],
                __WEBPACK_IMPORTED_MODULE_10__logging_menu__["a" /* LoggingMenu */],
                __WEBPACK_IMPORTED_MODULE_11__logging_page__["a" /* LoggingPage */],
                __WEBPACK_IMPORTED_MODULE_12__notifications_page__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_13__settings_page__["a" /* SettingsPage */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__about_page__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__colors_page__["a" /* ColorsPage */],
                __WEBPACK_IMPORTED_MODULE_7__connection_page__["a" /* ConnectionPage */],
                __WEBPACK_IMPORTED_MODULE_8__drivers_page__["a" /* DriversPage */],
                __WEBPACK_IMPORTED_MODULE_9__licenses_page__["a" /* LicensesPage */],
                __WEBPACK_IMPORTED_MODULE_10__logging_menu__["a" /* LoggingMenu */],
                __WEBPACK_IMPORTED_MODULE_11__logging_page__["a" /* LoggingPage */],
                __WEBPACK_IMPORTED_MODULE_12__notifications_page__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_13__settings_page__["a" /* SettingsPage */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_6__colors_page__["a" /* ColorsPage */],
                __WEBPACK_IMPORTED_MODULE_8__drivers_page__["a" /* DriversPage */],
                __WEBPACK_IMPORTED_MODULE_13__settings_page__["a" /* SettingsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* SharedModule */]
            ],
            providers: []
        })
    ], SettingsModule);
    return SettingsModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TuningModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tuning_menu__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tuning_page__ = __webpack_require__(395);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TuningModule = /** @class */ (function () {
    function TuningModule() {
    }
    TuningModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__tuning_menu__["a" /* TuningMenu */],
                __WEBPACK_IMPORTED_MODULE_5__tuning_page__["a" /* TuningPage */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__tuning_menu__["a" /* TuningMenu */],
                __WEBPACK_IMPORTED_MODULE_5__tuning_page__["a" /* TuningPage */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_5__tuning_page__["a" /* TuningPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* SharedModule */]
            ],
            providers: []
        })
    ], TuningModule);
    return TuningModule;
}());

//# sourceMappingURL=tuning.module.js.map

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_android_full_screen__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_insomnia__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__root_page__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__backend__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__carrera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__rms__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












var CONNECTION_TIMEOUT = 3000;
var AppComponent = /** @class */ (function () {
    function AppComponent(cu, backends, logger, settings, speech, platform, androidFullScreen, insomnia, splashScreen, toast, translate) {
        var _this = this;
        this.cu = cu;
        this.backends = backends;
        this.logger = logger;
        this.settings = settings;
        this.speech = speech;
        this.platform = platform;
        this.androidFullScreen = androidFullScreen;
        this.insomnia = insomnia;
        this.splashScreen = splashScreen;
        this.toast = toast;
        this.translate = translate;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__root_page__["a" /* RootPage */]; // FIXME: get rid of this!
        this.platform.ready().then(function (readySource) {
            _this.logger.info('Initializing ' + readySource + ' application');
            if (readySource === 'cordova') {
                _this.platform.resize.subscribe(function () {
                    _this.enableFullScreen(_this.platform.isLandscape());
                });
                _this.enableFullScreen(_this.platform.isLandscape());
                _this.insomnia.keepAwake();
            }
        });
        translate.setDefaultLang('en');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settings.getOptions().subscribe(function (options) {
            _this.logger.setDebugEnabled(options.debug);
            _this.setLanguage(options.language);
        });
        this.settings.getConnection().subscribe(function (connection) {
            if (_this.cu.value) {
                _this.cu.value.disconnect();
            }
            if (connection) {
                _this.logger.info('Connecting to ' + connection.name);
                __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].from(_this.backends.map(function (backend) { return backend.scan(); })).mergeAll().filter(function (device) {
                    return device.equals(connection);
                }).timeout(CONNECTION_TIMEOUT).first().toPromise().then(function (device) {
                    var cu = new __WEBPACK_IMPORTED_MODULE_9__carrera__["a" /* ControlUnit */](device, connection, _this.logger);
                    _this.cu.next(cu);
                    cu.connect();
                }).then(function () {
                    _this.setRoot(__WEBPACK_IMPORTED_MODULE_11__rms__["c" /* RmsPage */], new __WEBPACK_IMPORTED_MODULE_10__core__["h" /* RaceOptions */]('practice'));
                }).catch(function (error) {
                    _this.logger.warn('Error connecting to ' + connection.name + ':', error);
                    _this.setRoot(_this.rootPage);
                });
            }
            else {
                _this.logger.info('No connection set');
                _this.cu.next(null);
                _this.setRoot(_this.rootPage);
            }
        });
        // TODO: move this to RaceControl?
        this.subscription = this.cu.filter(function (cu) { return !!cu; }).switchMap(function (cu) {
            return cu.getState().debounceTime(200).distinctUntilChanged().map(function (state) { return [state, cu.peripheral.name]; });
        }).subscribe(function (_a) {
            var state = _a[0], device = _a[1];
            switch (state) {
                case 'connected':
                    _this.showConnectionToast('Connected to {{device}}', device);
                    break;
                case 'connecting':
                    _this.showConnectionToast('Connecting to {{device}}', device);
                    break;
                case 'disconnected':
                    _this.showConnectionToast('Disconnected from {{device}}', device);
                    break;
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AppComponent.prototype.enableFullScreen = function (value) {
        var _this = this;
        this.androidFullScreen.isImmersiveModeSupported().then(function () {
            if (value) {
                return _this.androidFullScreen.immersiveMode();
            }
            else {
                return _this.androidFullScreen.showSystemUI();
            }
        }).catch(function (error) {
            _this.logger.error('Fullscreen error:', error);
        });
    };
    AppComponent.prototype.setLanguage = function (language) {
        var _this = this;
        this.translate.use(language || this.translate.getBrowserLang() || 'en').toPromise().then(function (obj) {
            _this.translate.get('notifications.locale').toPromise().then(function (locale) {
                _this.speech.setLocale(locale);
            });
        });
    };
    AppComponent.prototype.setRoot = function (page, params) {
        var _this = this;
        this.nav.setRoot(page, params).catch(function (error) {
            _this.logger.error('Error setting root page', error);
        }).then(function () {
            _this.logger.info('Hiding splash screen');
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.showConnectionToast = function (message, device) {
        var _this = this;
        this.translate.get(message, { device: device }).toPromise().then(function (message) {
            return _this.toast.showCenter(message, 3000);
        }).catch(function (error) {
            _this.logger.error('Error showing toast', error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], AppComponent.prototype, "nav", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/tkem/src/openlap/src/app/app.html"*/'<app-menu [cu]="cu | async" [nav]="content"></app-menu>\n<ion-nav #content id="nav" swipeBackEnabled="false" [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/tkem/src/openlap/src/app/app.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_10__core__["b" /* CONTROL_UNIT_SUBJECT */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__backend__["a" /* Backend */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_rxjs__["BehaviorSubject"], Array, __WEBPACK_IMPORTED_MODULE_10__core__["f" /* Logger */],
            __WEBPACK_IMPORTED_MODULE_10__core__["i" /* Settings */],
            __WEBPACK_IMPORTED_MODULE_10__core__["j" /* Speech */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_android_full_screen__["a" /* AndroidFullScreen */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_insomnia__["a" /* Insomnia */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_10__core__["k" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LogLevel */
/* unused harmony export LogRecord */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (LogLevel = {}));
;
var LogRecord = /** @class */ (function () {
    function LogRecord() {
    }
    return LogRecord;
}());

;
var Logger = /** @class */ (function () {
    function Logger() {
        this.level = LogLevel.INFO;
        this.limit = 50; // TODO: config
        // TODO: Observable?
        this.records = new Array();
    }
    Logger.prototype.isDebugEnabled = function () {
        return this.level === LogLevel.DEBUG;
    };
    Logger.prototype.setDebugEnabled = function (value) {
        this.level = value ? LogLevel.DEBUG : LogLevel.INFO;
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log(LogLevel.DEBUG, args);
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log(LogLevel.INFO, args);
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log(LogLevel.WARNING, args);
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log(LogLevel.ERROR, args);
    };
    Logger.prototype.clear = function () {
        this.records.length = 0;
    };
    Logger.prototype.log = function (level, args) {
        if (level >= this.level) {
            console.log.apply(console, args);
            while (this.records.length >= this.limit) {
                this.records.shift();
            }
            this.records.push({ level: level, time: Date.now(), args: args });
        }
    };
    Logger = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], Logger);
    return Logger;
}());

//# sourceMappingURL=logger.js.map

/***/ })

},[398]);
//# sourceMappingURL=main.js.map