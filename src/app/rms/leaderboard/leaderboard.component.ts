import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Subscription } from 'rxjs';

const FIELDS = [{
  // no fuel/pit lane
  practice: [
    'bestlap gap int lastlap laps status',
    'bestlap sector1 sector2 sector3 lastlap status'
  ],
  qualifying: [
    'bestlap gap int lastlap laps status',
    'bestlap sector1 sector2 sector3 lastlap status'
  ],
  race: [
    'time bestlap lastlap laps status',
    'time sector1 sector2 sector3 lastlap status',
  ]
}, {
  // with fuel/pit lane
  practice: [
    'bestlap gap int lastlap laps fuel status',
    'bestlap sector1 sector2 sector3 lastlap fuel status'
  ],
  qualifying: [
    'bestlap gap int lastlap laps fuel status',
    'bestlap sector1 sector2 sector3 lastlap fuel status'
  ],
  race: [
    'time bestlap lastlap laps pits fuel status',
    'time sector1 sector2 sector3 lastlap fuel status'
  ]
}];

export class LeaderboardItem {
  id: number;
  driver: { name: string, code: string, color: string };
  position: number;
  time: number;
  laps: number;
  last: number[];
  best: number[];
  fuel?: number;
  pit?: boolean;
  pits?: number;
  sector?: number;
  gridpos?: number;
  refuel?: boolean;
  finished?: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'leaderboard',
  styleUrls: ['leaderboard.component.scss'],
  templateUrl: 'leaderboard.component.html'
})
export class LeaderboardComponent implements OnDestroy {

  @Input() mode: 'practice' | 'qualifying' | 'race';

  @Input() sectors: boolean;

  @Input() pitlane: boolean;

  @Input() set items(items: LeaderboardItem[]) {
    this._items = items;
    if (items) {
      this.ranked = [...items];
      this.ranked.sort((lhs, rhs) => lhs.position - rhs.position);
      // TODO: move to rms?
      this.best = items.map(item => item.best).reduce((acc, times) => {
        times.forEach((time, index) => {
          if (time < (acc[index] || Infinity)) {
            acc[index] = time;
          }
        });
        return acc;
      }, []);
    } else {
      this.ranked = items;
      this.best = [];
    }
  }

  get items() {
    return this._items;
  }

  get fields() {
    const f = FIELDS[this.pitlane ? 1 : 0][this.mode][this.sectors ? 1 : 0];
    return ((this.platform.isPortrait() ? 'code' : 'number name') + ' ' + f).split(/\s+/);
  }

  public ranked: LeaderboardItem[];

  public best: number[];

  private _items: LeaderboardItem[];

  private subscription: Subscription;

  constructor(ref: ChangeDetectorRef, private platform: Platform) {
    this.subscription = platform.resize.subscribe(() => ref.markForCheck());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
