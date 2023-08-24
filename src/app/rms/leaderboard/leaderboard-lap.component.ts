import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LeaderboardItem } from './leaderboard.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'leaderboard-lap',
  styleUrls: ['leaderboard.component.scss'],
  templateUrl: 'leaderboard-lap.component.html'
})
export class LeaderboardLapComponent {
  @Input() lap: number;
  @Input() item: LeaderboardItem;
  @Input() times: number[];
  @Input() best: number[];
  @Input() intlap: number;
  @Input() fields: string[];
}
