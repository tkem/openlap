import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Driver } from '../app-settings';

@Component({
    templateUrl: 'color.component.html',
    standalone: false
})
export class ColorComponent implements OnInit {
  
  readonly placeholder = 'Driver {{number}}';

  readonly colors = [
    ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#c0c0c0', '#ffffff'],
    ['#c02040', '#408080', '#4080c0', '#ff8020', '#ff8080', '#20ffc0', '#404040', '#000000'],
  ];

  @Input() driver: Driver;
  @Input() id: number;
  color: string;

  constructor(private mc: ModalController) {
  }

  ngOnInit() {
    this.color = this.driver?.color || '#000000';
  }
 
  update(component, event) {
    const value = ('0' + event.detail.value.toString(16)).slice(-2);
    switch (component) {
    case 'r':
      this.color = this.color.substring(0, 1) + value + this.color.substring(3);
      break;
    case 'g':
      this.color = this.color.substring(0, 3) + value + this.color.substring(5);
      break;
    case 'b':
      this.color = this.color.substring(0, 5) + value + this.color.substring(7);
      break;
    }
  }

  setColor(color) {
    this.color = color;
  }

  get r() {
    return this.color ? Number.parseInt(this.color.substring(1, 3), 16) : 0;
  }

  get g() {
    return this.color ? Number.parseInt(this.color.substring(3, 5), 16) : 0;
  }

  get b() {
    return this.color ? Number.parseInt(this.color.substring(5, 7), 16) : 0;
  }

  onSubmit(color) {
    this.mc.dismiss(color);
  }

  onCancel() {
    this.mc.dismiss();
  }
}
