import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gauge',
  // FIXME: empty inline-box not shown in Firefox?
  styles: ['span { display: inline-block; background-clip: content-box; min-height: 0.75em; width: 100%; }'],
  templateUrl: 'gauge.component.html'
})
export class GaugeComponent {

  style: {[key: string]: string} = {};

   _min: number = 0;
   _max: number = 1.0;
   _value: number;

    @Input() set min(value: number) { this._min = value; this.calcStyle(); } 

    @Input() set max(value: number) { this._max = value; this.calcStyle(); } 

    @Input() set value(v: number) { this._value = v; this.calcStyle(); } 

    calcStyle() {

      let p = (this._value - this._min) / (this._max - this._min);

      let r = (Math.trunc(255 * (p > 0.5 ? 1.0 - 2.0 * (p - 0.5) : 1.0))).toString(16);
      let g = (Math.trunc(255 * (p > 0.5 ? 1.0 : 2.0 * p))).toString(16);
      
      r = r.length == 2 ? r : '0' + r;
      g = g.length == 2 ? g : '0' + g;
      
      this.style['padding-right'] = 100 * (this._max - this._value) / (this._max - this._min) + '%';
      this.style['background-color'] = '#' + r + g + '00';
    }
}
