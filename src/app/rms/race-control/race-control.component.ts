import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';

import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { ControlUnit, ControlUnitButton } from '../../carrera';
import { I18nToastService, LoggingService } from '../../services';

const STATE_MESSAGES = {
  'connected': 'Connected to {{device}}',
  'connecting': 'Connecting to {{device}}',
  'disconnected': 'Disconnected from {{device}}'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'race-control',
  styleUrls: ['race-control.component.scss'],
  templateUrl: 'race-control.component.html',
})
export class RaceControlComponent implements OnDestroy {

  private controlUnit: ControlUnit;

  private subscription = new Subscription();

  lights: Observable<number>;
  blink: Observable<boolean>;
  keys: Promise<boolean>;

  @Input()
  set cu(cu: ControlUnit) {
    this.subscription.unsubscribe();
    if (cu) {
      // TODO: share this?
      const start = cu.getStart().pipe(distinctUntilChanged());
      const state = cu.getState().pipe(distinctUntilChanged());
      this.subscription = state.subscribe(state => this.showConnectionToast(state, cu.peripheral.name));
      this.lights = start.pipe(
        map(value => (value == 1 ? 5 : value > 1 && value < 7 ? value - 1 : 0))
      );
      this.blink = combineLatest(start, state).pipe(
        map(([value, state]) => (value >= 8 || state !== 'connected'))
      );
      this.keys = cu.getVersion().then(version => (version >= '5331'));
    } else {
      this.subscription = new Subscription();
      this.lights = of(0);
      this.blink = of(false);
      this.keys = Promise.resolve(false);
    }
    this.controlUnit = cu;
  }

  get cu(): ControlUnit { 
    return this.controlUnit; 
  }

  @Input() yellowFlag: boolean;

  @Output() onYellowFlag = new EventEmitter();

  constructor(private toast: I18nToastService, private logger: LoggingService) {}
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  togglePaceCar() {
    if (this.cu) {
      this.cu.trigger(ControlUnitButton.PACE_CAR);
    }
  }

  toggleStart() {
    if (this.cu) {
      this.cu.trigger(ControlUnitButton.START);
    }
  }

  private showConnectionToast(state: string, device: string) {
    const message = STATE_MESSAGES[state] || 'Connecting to {{device}}';
    this.toast.showShortCenter(message, {device: device}).catch(error => {
      this.logger.error('Error showing toast', error);
    });
  }
}
