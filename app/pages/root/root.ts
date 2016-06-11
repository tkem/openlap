import { Component, Input } from '@angular/core';

import { ControlUnit, RaceControl } from '../../providers';

import { ColWidth, FuelGauge, Startlight, Stripe } from '../../components';
import { TimePipe } from '../../pipes';

@Component({
  directives: [ColWidth, FuelGauge, Startlight, Stripe],
  pipes: [TimePipe],
  templateUrl: 'build/pages/root/root.html',
})
export class RootPage {
  @Input() items;

  constructor(public cu: ControlUnit, public rc: RaceControl) {}
}
