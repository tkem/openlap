import {Directive, Input} from '@angular/core';

@Directive({
  selector: 'stripe',
  host: {
    '[style.border-color]': 'color'
  } 
})
export class Stripe {
  @Input() color: string;
}
