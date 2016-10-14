import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// FIXME: @Input() with interface not working in Ionic 2 RC1?
export class LeaderboardItem {
  driver: any;
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
  templateUrl: 'leaderboard-head.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardHeadComponent {
  @Input() fields: string[];
}

@Component({
  selector: 'leaderboard tbody tr[item]',
  templateUrl: 'leaderboard-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardItemComponent {
  @Input() fields: string[];
  @Input() item: LeaderboardItem;
  @Input() index: number;
  @Input() items: LeaderboardItem[];
  @Input() bestlap: number;
}

@Component({
  selector: 'leaderboard',
  templateUrl: 'leaderboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent {

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
