import { NgModule } from '@angular/core';

import { StripeDirective } from './stripe.directive';
import { TargetDirective } from './target.directive';
import { TimePipe } from './time.pipe';
import { Toast } from './toast.service';

@NgModule({
  declarations: [
    StripeDirective,
    TargetDirective,
    TimePipe
  ],
  exports: [
    StripeDirective,
    TargetDirective,
    TimePipe
  ],
  imports: [
  ],
  providers: [
    Toast
  ]
})
export class SharedModule {}
