import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'a[target]',
})
export class TargetDirective {
  private el: HTMLElement;

  @Input() target: string;

  @Input() href: string;

  @HostListener('click') onClick() {
    window.open(this.href, this.target);
    return false;
  }
}
