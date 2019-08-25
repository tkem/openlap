import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'yellow-flag',
  styleUrls: ['yellow-flag.component.scss'],
  templateUrl: 'yellow-flag.component.html',
})
export class YellowFlagComponent implements OnChanges {

  @Input() cols: number;

  @Input() rows: number;

  @Input() blink: boolean;
  
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
