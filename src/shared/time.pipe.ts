import { Injectable, Pipe, PipeTransform } from '@angular/core';

function formatHMS(t: number, digits = false) {
  let h = Math.floor(t / 3600000);
  let m = Math.floor((t - h * 3600000) / 60000);
  let s = (t - h * 3600000 - m * 60000) / 1000;
  if (digits) {
    return [h, ':', (m < 10 ? '0' : ''), m, ':', (s < 10 ? '0' : ''), s.toFixed(3)].join('');
  } else {
    return [h, ':', (m < 10 ? '0' : ''), m, ':', (s < 10 ? '0' : ''), Math.floor(s)].join('');
  }
}

function formatMS(t: number, digits = false) {
  let m = Math.floor(t / 60000);
  let s = (t - m * 60000) / 1000;
  if (digits) {
    return [m, ':', (s < 10 ? '0' : ''), s.toFixed(3)].join('');
  } else {
    return [m, ':', (s < 10 ? '0' : ''), Math.floor(s)].join('');
  }
}

const TIME_FORMATS = {
  'h:mm:ss': t => formatHMS(t),
  'm:ss': t => formatMS(t),
  's': t => Math.floor(t / 1000).toString(),
  'h:mm:ss.sss': t => formatHMS(t, true),
  'm:ss.sss': t => formatMS(t, true),
  's.sss': t => (t / 1000).toFixed(3),
  '+h:mm:ss': t => '+' + formatHMS(t),
  '+m:ss': t => '+' + formatMS(t),
  '+s': t => '+' + Math.floor(t / 1000).toString(),
  '+h:mm:ss.sss': t => '+' + formatHMS(t, true),
  '+m:ss.sss': t => '+' + formatMS(t, true),
  '+s.sss': t => '+' + (t / 1000).toFixed(3)

};

@Pipe({name: 'time', pure: true})
@Injectable()
export class TimePipe implements PipeTransform {
  transform(value: number, pattern: string = 'h:mm:ss'): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return null;
    } else if (pattern in TIME_FORMATS) {
      return TIME_FORMATS[pattern](value >= 0 ? value : 0);
    } else {
      return pattern;
    }
  }
}
