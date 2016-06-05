import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';

@Injectable()
export class Plugins {

    private ready: Promise<any>;

    constructor(platform: Platform) {
        this.ready = platform.ready();
    }

    get(name: string) {
        return this.ready.then(() => {
            if (window['plugins'] && window['plugins'][name]) {
                return window['plugins'][name];
            } else if (navigator[name]) {
                return navigator[name];
            } else if (window[name]) {
                return window[name];
            } else {
                throw Error('Plugin "' + name + '" not found');
            }
        });
    }
}
