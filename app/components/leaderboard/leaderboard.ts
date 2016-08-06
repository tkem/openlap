import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';

import { ControlUnit, RaceControl } from '../../providers';

import { ChequeredFlag } from '../chequered-flag/chequered-flag';
import { FuelGauge } from '../fuel-gauge/fuel-gauge';
import { Stripe } from '../stripe/stripe';
import { TimePipe } from '../../pipes';

@Component({
  selector: 'leaderboard tbody > tr[practice]',
  directives: [ChequeredFlag, FuelGauge, Stripe],
  pipes: [TimePipe],
  templateUrl: 'build/components/leaderboard/practice.html'
})
class PracticeRow {
  @Input() item: any;
  @Input() index: number;
  @Input() items: any[];
  @Input() bestlap: number;
  @Optional() @Input() fuel: number;
}

@Component({
  selector: 'leaderboard tbody > tr[qualifying]',
  directives: [ChequeredFlag, FuelGauge, Stripe],
  pipes: [TimePipe],
  templateUrl: 'build/components/leaderboard/qualifying.html'
})
class QualifyingRow {
  @Input() item: any;
  @Input() index: number;
  @Input() items: any[];
  @Input() bestlap: number;
  @Optional() @Input() fuel: number;
}

@Component({
  selector: 'leaderboard tbody > tr[race]',
  directives: [ChequeredFlag, FuelGauge, Stripe],
  pipes: [TimePipe],
  templateUrl: 'build/components/leaderboard/race.html'
})
class RaceRow {
  @Input() item: any;
  @Input() index: number;
  @Input() items: any[];
  @Input() bestlap: number;
  @Optional() @Input() fuel: number;
}

@Component({
  selector: 'leaderboard',
  directives: [PracticeRow, QualifyingRow, RaceRow],
  templateUrl: 'build/components/leaderboard/leaderboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Leaderboard {
  @Input() fuel: number[];
  @Input() pitlane: boolean;
  @Input() ranking: any[];
  @Input() mode: 'practice' | 'qualifying' | 'race';
  @Input() bestlap: number;
}
