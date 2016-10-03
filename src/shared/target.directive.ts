import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'a[target]',
})
export class TargetDirective {

  @Input() target: string;

  @Input() href: string;

  @HostListener('click') onClick() {
    window.open(this.href, this.target);
    return false;
  }
}
