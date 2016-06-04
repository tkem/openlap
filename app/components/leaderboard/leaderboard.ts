import {Directive, ElementRef, Input, Pipe, PipeTransform} from '@angular/core';

@Directive({
  selector: 'col[width]',
})
export class ColWidth {
  @Input() set width(value: string | number) {
    this.el.nativeElement.style.width = typeof value === 'number' ? value + 'px' : value;
  }

  constructor(private el: ElementRef) {}
}

@Directive({
  selector: 'col[collapse]',
})
export class ColCollapse {
  @Input() set collapse(value: boolean) {
    this.el.nativeElement.style.visibility = value ? 'collapse' : 'visible';
  }

  constructor(private el: ElementRef) {}
}

@Pipe({name: 'time'})
export class TimePipe implements PipeTransform {
  transform(value: number, start = 0): string {
    let ms = value - start;
    let m = Math.floor(ms / 60000);
    let s = ((ms % 60000) / 1000);
    if (m) {
      return m.toString() + ':' + (s >= 10 ? '' : '0') + s.toFixed(3);
    } else {
      return s.toFixed(3);
    }
  }
}

@Pipe({name: 'isSet'})
export class IsSetPipe implements PipeTransform {
  transform(value: number, n: number): boolean {
    return (value & (1 << n)) != 0;
  }
}
