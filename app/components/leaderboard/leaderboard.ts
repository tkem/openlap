import {Directive, ElementRef, Input} from '@angular/core';

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
