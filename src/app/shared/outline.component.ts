import { Component, Input } from '@angular/core';

@Component({
  selector: 'outline',
  styleUrls: ['outline.component.scss'],
  templateUrl: 'outline.component.html'
})
export class OutlineComponent {
  @Input() color: string;
}
