import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { CheckerboardComponent } from './checkerboard.component';
import { GaugeComponent } from './gauge.component';
import { OutlineComponent } from './outline.component';
import { TargetDirective } from './target.directive';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    CheckerboardComponent,
    GaugeComponent,
    OutlineComponent,
    TargetDirective,
    TimePipe
  ],
  exports: [
    CheckerboardComponent,
    GaugeComponent,
    OutlineComponent,
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
