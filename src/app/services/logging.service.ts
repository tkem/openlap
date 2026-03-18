import { Injectable } from '@angular/core';

export enum LogLevel { DEBUG, INFO, WARNING, ERROR };

export class LogRecord {
  level: LogLevel;  // TODO: as string?
  time: number;
  args: any[];
};

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private level = LogLevel.INFO;

  private limit = 50;  // TODO: config

  private buffer: LogRecord[] = [];
  private head = 0;
  private size = 0;

  get records(): LogRecord[] {
    if (this.size <= this.head) {
      return this.buffer.slice(this.head - this.size, this.head);
    }
    return [...this.buffer.slice(this.head + this.limit - this.size), ...this.buffer.slice(0, this.head)];
  }

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
    this.buffer = [];
    this.head = 0;
    this.size = 0;
  }

  private log(level: LogLevel, args: any[]) {
    if (level >= this.level) {
      console.log.apply(console, args);
      this.buffer[this.head] = { level: level, time: Date.now(), args: args };
      this.head = (this.head + 1) % this.limit;
      if (this.size < this.limit) {
        this.size++;
      }
    }
  }
}
