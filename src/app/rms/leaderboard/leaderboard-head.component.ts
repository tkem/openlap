import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'leaderboard-head',
  styleUrls: ['leaderboard.component.scss'],
  templateUrl: 'leaderboard-head.component.html'
})
export class LeaderboardHeadComponent {
  @Input() fields: string[];
}
