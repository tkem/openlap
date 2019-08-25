import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'startlight',
  styleUrls: ['startlight.component.scss'],
  templateUrl: 'startlight.component.html'
})
export class StartlightComponent {
  @Input() active: boolean;
  @Input() blink: boolean = false;
}
