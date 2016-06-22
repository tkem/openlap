import {Component} from '@angular/core';

import { FuelGauge } from '../fuel-gauge/fuel-gauge';
import { Stripe } from '../stripe/stripe';
import { TimePipe } from '../../pipes';

@Component({
  selector: 'leaderboard',
  directives: [FuelGauge, Stripe],
  pipes: [TimePipe],
  template: '<ng-content></ng-content>'
})
export class Leaderboard {
  // TODO
}
