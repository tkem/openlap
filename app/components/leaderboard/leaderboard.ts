import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';

import { ChequeredFlag } from '../chequered-flag/chequered-flag';
import { FuelGauge } from '../fuel-gauge/fuel-gauge';
import { Stripe } from '../stripe/stripe';
import { TimePipe } from '../../pipes';

export interface LeaderboardItem {
  driver: any;
  color: string;
  time: number;
  laps: number;
  lastLap: number;
  bestLap: number;
  fuel?: number;
  pits?: number;
  pit?: boolean;
  finished?: boolean
}

@Component({
  selector: 'leaderboard thead tr[head]',
  templateUrl: 'build/components/leaderboard/leaderboard-head.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class LeaderboardHeadComponent {
  @Input() fields: string[];
}

@Component({
  selector: 'leaderboard tbody tr[item]',
  directives: [ChequeredFlag, FuelGauge, Stripe],
  pipes: [TimePipe],
  templateUrl: 'build/components/leaderboard/leaderboard-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class LeaderboardItemComponent {
  @Input() fields: string[];
  @Input() item: LeaderboardItem;
  @Input() index: number;
  @Input() items: LeaderboardItem[];
  @Input() bestlap: number;
}

@Component({
  selector: 'leaderboard',
  directives: [LeaderboardHeadComponent, LeaderboardItemComponent],
  templateUrl: 'build/components/leaderboard/leaderboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Leaderboard {

  private _items: LeaderboardItem[];

  public bestlap: number;

  @Input() fields: string[];

  @Input() set items(items: LeaderboardItem[]) {
    this._items = items;
    // TBD: NaN if *any* item has no bestLap set
    this.bestlap = Math.min(...(items || []).map(item => item.bestLap));
  }

  get items() {
    return this._items;
  }
}
