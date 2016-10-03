import { Component } from '@angular/core';

@Component({
  selector: 'chequered-flag',
  template: `
    <svg viewBox="0 0 7 5">
      <path d="M0,0V5H1V0zM2,0V5H3V0zM4,0V5H5V0zM6,0V5H7V0zM0,1H7V2H0zM0,3H7V4H0z" fill="#fff" fill-rule="evenodd"/>
    </svg>
  `
})
export class ChequeredFlagComponent {
}
