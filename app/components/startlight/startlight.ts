import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'startlight',
  directives: [NgClass],
  template: `
    <div [ngClass]="{active: value >= 1 && value < 7, blink: value >= 8}"></div>
    <div [ngClass]="{active: value == 1 || value >= 3 && value < 7, blink: value >= 8}"></div>
    <div [ngClass]="{active: value == 1 || value >= 4 && value < 7, blink: value >= 8}"></div>
    <div [ngClass]="{active: value == 1 || value >= 5 && value < 7, blink: value >= 8}"></div>
    <div [ngClass]="{active: value == 1 || value >= 6 && value < 7, blink: value >= 8}"></div>
  `
})
export class Startlight {
  @Input() value: number;
}
