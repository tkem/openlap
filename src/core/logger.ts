import { Injectable } from '@angular/core';

export enum LogLevel { DEBUG, INFO, WARNING, ERROR };

export class LogRecord {
  level: LogLevel;  // TODO: as string?
  time: number;
  args: any[];
};

@Injectable()
export class Logger {

  private level = LogLevel.INFO;

  private limit = 50;  // TODO: config

  // TODO: Observable?
  records = new Array<LogRecord>();

  isDebugEnabled() {
    return this.level === LogLevel.DEBUG;
  }

  setDebugEnabled(value: boolean) {
    this.level = value ? LogLevel.DEBUG : LogLevel.INFO;
  }

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
    if (level >= this.level) {
      console.log.apply(console, args);
      while (this.records.length >= this.limit) {
        this.records.shift();
      }
      this.records.push({ level: level, time: Date.now(), args: args });
    }
  }
}
