import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dot-matrix',
  styles: ['svg { fill: currentColor; height: 1em; }'],
  templateUrl: 'dot-matrix.component.html',
})
export class DotMatrixComponent implements OnChanges {

  @Input() cols: number;

  @Input() rows: number;

  xoffsets: number[];

  yoffsets: number[];

  radius = 0.4;

  ngOnChanges(_: any) {
    this.xoffsets = [];
    this.yoffsets = [];
    for (let x = 0; x < this.cols; ++x) {
      this.xoffsets.push(x + 0.5);
    }
    for (let y = 0; y < this.rows; ++y) {
      this.yoffsets.push(y + 0.5);
    }
  }
}
