import { Component, Input } from '@angular/core';

@Component({
  selector: '[stripe]',
  styles: [`
           :host {
             overflow: hidden;
             position: relative;
             z-index: 0;
           }
           .stripe-inner {
             position: absolute;
             height: 100%;
             width: 100%;
             top: 0;
             left: 0;
             -webkit-transform: skew(-30deg);
             transform: skew(-30deg);
             -webkit-transform-origin: top right;
             transform-origin: top right;
             border-right: 0.3em solid;
             background: #999;
             z-index: -1;
           }`
          ],
  templateUrl: 'stripe.component.html'
})
export class StripeComponent {
  @Input() stripe: string;
}
