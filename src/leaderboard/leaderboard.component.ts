import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// FIXME: @Input() with interface not working in Ionic 2 RC1?
export class LeaderboardItem {
  id: number;
  driver: { name: string, code: string, color: string };
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'leaderboard',
  templateUrl: 'leaderboard.component.html'
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
