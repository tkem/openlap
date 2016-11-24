import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'startlight',
  styles: [`
  @keyframes startlight-blink {
    from {
      background: radial-gradient(circle at 60% 60%, gray 0%, black 95%, gray 100%);
    }
    to {
      background: radial-gradient(circle at 60% 60%, red 0%, #330000 95%, red 100%);
    }
  }
  div {
    display: inline-block;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    background: radial-gradient(circle at 60% 60%, gray 0%, black 95%, gray 100%);
  }
  div.active {
    background: radial-gradient(circle at 60% 60%, red 0%, #330000 95%, red 100%);
  }
  div.blink {
    animation-name: startlight-blink;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  `],
  templateUrl: 'startlight.component.html'
})
export class StartlightComponent {
  @Input() active: boolean;
  @Input() blink: boolean = false;
}
