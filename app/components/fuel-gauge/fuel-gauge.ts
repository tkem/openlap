import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fuel-gauge',
  template: `
    <span [style.width]="100 * (value - min) / (max - min) + '%'"></span>
    <span></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuelGauge {
    @Input() min: number = 0;
    @Input() max: number = 1.0;
    @Input() value: number;
}
