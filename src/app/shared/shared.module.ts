import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { CheckerboardComponent } from './checkerboard.component';
import { TargetDirective } from './target.directive';
import { TimePipe } from './time.pipe';
import { NumberComponent } from './number.component';

@NgModule({
  declarations: [
    CheckerboardComponent,
    NumberComponent,
    TargetDirective,
    TimePipe
  ],
  exports: [
    CheckerboardComponent,
    NumberComponent,
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
