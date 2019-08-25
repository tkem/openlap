import { Component, Input } from '@angular/core';

@Component({
  selector: 'number',
  styleUrls: ['number.component.scss'],
  templateUrl: 'number.component.html'
})
export class NumberComponent {
  @Input() color: string;
}
