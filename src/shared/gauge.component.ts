import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gauge',
  // FIXME: empty inline-box not shown in Firefox?
  styles: ['span { display: inline-block; background-clip: content-box; min-height: 0.75em; width: 100%; }'],
  templateUrl: 'gauge.component.html'
})
export class GaugeComponent {

    @Input() min: number = 0;

    @Input() max: number = 1.0;

    @Input() value: number;
}
