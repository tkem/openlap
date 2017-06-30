import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { CheckerboardComponent } from './checkerboard.component';
import { CuVersionPipe } from './cu-version.pipe';
import { DotMatrixComponent } from './dot-matrix.component';
import { GaugeComponent } from './gauge.component';
import { StartlightComponent } from './startlight.component';
import { StripeComponent } from './stripe.component';
import { TargetDirective } from './target.directive';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    CheckerboardComponent,
    CuVersionPipe,
    DotMatrixComponent,
    GaugeComponent,
    StartlightComponent,
    StripeComponent,
    TargetDirective,
    TimePipe
  ],
  exports: [
    CheckerboardComponent,
    CuVersionPipe,
    DotMatrixComponent,
    GaugeComponent,
    StartlightComponent,
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
