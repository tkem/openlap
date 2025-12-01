import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Session } from './session';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'race-title',
    templateUrl: 'race-title.component.html',
    standalone: false
})
export class RaceTitleComponent {

  @Input() mode: 'practice' | 'qualifying' | 'race';

  @Input() laps: {count: number, total: number};

  @Input() time: number;

  @Input() finished: boolean;

  constructor() {}
}
