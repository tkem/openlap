import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { CheckerboardComponent } from './checkerboard.component';
import { DotMatrixComponent } from './dot-matrix.component';
import { GaugeComponent } from './gauge.component';
import { SlantComponent } from './slant.component';
import { StartlightComponent } from './startlight.component';
import { TargetDirective } from './target.directive';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    CheckerboardComponent,
    DotMatrixComponent,
    GaugeComponent,
    SlantComponent,
    StartlightComponent,
    TargetDirective,
    TimePipe
  ],
  exports: [
    CheckerboardComponent,
    DotMatrixComponent,
    GaugeComponent,
    SlantComponent,
    StartlightComponent,
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
