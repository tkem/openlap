import {Component, Input} from '@angular/core';

@Component({
    selector: 'gauge',
    template: `
    <span [style.width]="100 * (value - min) / (max - min) + '%'"></span>
    <span></span>
    `,
    host: {
    } 
})
export class Gauge {
    @Input() min: number = 0;
    @Input() max: number = 1.0;
    @Input() value: number;
}
