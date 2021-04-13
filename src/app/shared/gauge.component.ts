import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gauge',
  styleUrls: ['gauge.component.scss'],
  templateUrl: 'gauge.component.html'
})
export class GaugeComponent {

    @Input() min: number = 0;

    @Input() max: number = 1.0;

    @Input() value: number;
}
