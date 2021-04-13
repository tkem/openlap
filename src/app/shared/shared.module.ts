import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { CheckerboardComponent } from './checkerboard.component';
import { GaugeComponent } from './gauge.component';
import { NumberComponent } from './number.component';
import { StripeComponent } from './stripe.component';
import { TargetDirective } from './target.directive';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    CheckerboardComponent,
    GaugeComponent,
    NumberComponent,
    StripeComponent,
    TargetDirective,
    TimePipe
  ],
  exports: [
    CheckerboardComponent,
    GaugeComponent,
    NumberComponent,
    StripeComponent,
    TargetDirective,
    TimePipe,
    TranslateModule
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule {}
