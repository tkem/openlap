import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

export enum LogLevel { DEBUG, INFO, WARNING, ERROR };

export class LogRecord {
    level: LogLevel;
    time: number;
    args: any[];
};

@Injectable()
export class Logger {

    limit = 50;  // TODO: config

    records = new Array<LogRecord>();

    constructor() { }

    // TODO: logError, logGroup, ... for ExceptionHandler!

    debug(...args: any[]) {
        this.log(LogLevel.DEBUG, args);
    }

    info(...args: any[]) {
        this.log(LogLevel.INFO, args);
    }

    warn(...args: any[]) {
        this.log(LogLevel.WARNING, args);
    }

    error(...args: any[]) {
        this.log(LogLevel.ERROR, args);
    }

    clear() {
        this.records.length = 0;
    }

    private log(level: LogLevel, args: any[]) {
        console.log.apply(console, args);
        while (this.records.length >= this.limit) {
            this.records.shift();
        }
        this.records.push({ level: level, time: Date.now(), args: args });
    }
}
