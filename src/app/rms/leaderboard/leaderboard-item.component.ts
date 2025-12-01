import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LeaderboardItem } from './leaderboard.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'leaderboard-item',
    styleUrls: ['leaderboard.component.scss'],
    templateUrl: 'leaderboard-item.component.html',
    standalone: false
})
export class LeaderboardItemComponent {
  @Input() fields: string[];
  @Input() item: LeaderboardItem;
  @Input() ranked: LeaderboardItem[];
  @Input() best: number[];

  abs(n: number) {
    return n < 0 ? -n : n;
  }
}
