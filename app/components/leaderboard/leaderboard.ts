import { Component, Input } from '@angular/core';

import { ControlUnit, RaceControl } from '../../providers';

import { FuelGauge } from '../fuel-gauge/fuel-gauge';
import { Stripe } from '../stripe/stripe';
import { TimePipe } from '../../pipes';

@Component({
  selector: 'leaderboard',
  directives: [FuelGauge, Stripe],
  pipes: [TimePipe],
  templateUrl: 'build/components/leaderboard/leaderboard.html'
})
export class Leaderboard {
  @Input() fuel: number[];
  @Input() pitlane: boolean;
  @Input() rc: RaceControl;
}
