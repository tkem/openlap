import { Component, Input } from '@angular/core';

@Component({
  selector: '[stripe]',
  styleUrls: ['stripe.component.scss'],
  templateUrl: 'stripe.component.html'
})
export class StripeComponent {
  @Input() stripe: string;
}
