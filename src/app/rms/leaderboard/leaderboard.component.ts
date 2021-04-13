import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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

const compare = {
  'position': (lhs: LeaderboardItem, rhs: LeaderboardItem) => {
    return lhs.position - rhs.position;
  },
  'number':  (lhs: LeaderboardItem, rhs: LeaderboardItem) => {
    return lhs.id - rhs.id;
  }
};

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
export class LeaderboardComponent {

  private _items: LeaderboardItem[];

  private _order: 'position' | 'number';

  public ordered: LeaderboardItem[];

  public best: number[];

  get fields() {
    const f = FIELDS[this.pitlane ? 1 : 0][this.mode][this.sectors ? 1 : 0];
    return ((this.compact ? 'code' : 'number name') + ' ' + f).split(/\s+/);
  }

  @Input() compact: boolean;

  @Input() mode: 'practice' | 'qualifying' | 'race';

  @Input() sectors: boolean;

  @Input() pitlane: boolean;

  @Input() set order(order: 'position' | 'number') {
    this._order = order;
    if (this.ordered) {
      this.ordered.sort(compare[order || 'position']);
    }
  }

  get order() {
    return this._order;
  }

  @Input() set items(items: LeaderboardItem[]) {
    this._items = items;
    if (items) {
      this.ordered = [...items];
      this.ordered.sort(compare[this.order || 'position']);
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
      this.ordered = items;
      this.best = [];
    }
  }

  get items() {
    return this._items;
  }
}
