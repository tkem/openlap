import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { IonInput, IonToggle, NavParams, ModalController } from '@ionic/angular';

import { Driver } from '../app-settings';

@Component({
  templateUrl: 'color.component.html'
})
export class ColorComponent {
  
  readonly placeholder = 'Driver {{number}}';

  readonly colors = [
    ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#c0c0c0', '#ffffff'],
    ['#c02040', '#408080', '#4080c0', '#ff8020', '#ff8080', '#20ffc0', '#404040', '#000000'],
  ];

  driver: Driver;
  id: number;
  color: string;

  constructor(params: NavParams, private mc: ModalController) {
    this.driver = params.get("driver")
    this.id = params.get("id");
    this.color = this.driver.color;
  }
 
  update(component, event) {
    console.log("update", component, event);
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
    console.log(this.color);
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
