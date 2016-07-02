import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'startlight',
  directives: [NgClass],
  template: `
    <div [ngClass]="{active: count >= 1, blink: blink}"></div>
    <div [ngClass]="{active: count >= 2, blink: blink}"></div>
    <div [ngClass]="{active: count >= 3, blink: blink}"></div>
    <div [ngClass]="{active: count >= 4, blink: blink}"></div>
    <div [ngClass]="{active: count >= 5, blink: blink}"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Startlight {
  @Input() count: number;
  @Input() blink: boolean;
}
