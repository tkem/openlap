import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

import {ControlUnit} from '../../providers/cu';
import {Drivers} from '../../providers/drivers';

@Component({
  template: `
    <ion-content>
      <ion-list>
        <ion-item *ngFor="let id of '12345678'.split(''); let i = index">
          <ion-label>#{{id}}</ion-label>
          <ion-input [(ngModel)]="drivers.itemAt(i).name" type="text"></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
    `
})
class NamePage {
  constructor(private drivers: Drivers) {}
}

@Component({
  template: `
    <ion-content>
      <ion-list>
        <ion-item *ngFor="let id of '12345678'.split(''); let i = index">
          <ion-label>#{{id}}</ion-label>
          <ion-select [(ngModel)]="drivers.itemAt(i).color">
            <ion-option value="red">Red</ion-option>
            <ion-option value="blue">Blue</ion-option>
            <ion-option value="green">Green</ion-option>
            <ion-option value="yellow">Yellow</ion-option>
            <ion-option value="white">White</ion-option>
            <ion-option value="gray">Gray</ion-option>
            <ion-option value="silver">Silver</ion-option>
            <ion-option value="gold">Gold</ion-option>
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
class ColorPage {
  constructor(private drivers: Drivers) {}
}

@Component({
  template: `
    <ion-content>
      <ion-list>
        <ion-item *ngFor="let model of models">
          <ion-range min="0" max="15" snaps="true" [(ngModel)]="model.value" (ionChange)="onChange(model.id)">
              <ion-label range-left>#{{model.id + 1}}</ion-label>
          </ion-range>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
class RangePage {
  // TODO: initial values, improve mapping (simple array not sufficient?)
  models = [
    { id: 0, value: 8},
    { id: 1, value: 8},
    { id: 2, value: 8},
    { id: 3, value: 8},
    { id: 4, value: 8},
    { id: 5, value: 8}
  ];

  private subject = new Subject<number>();
  
  constructor(private cu: ControlUnit, private navParams: NavParams) {
    // TODO: distinctUntilChanged, etc.
    this.subject.debounceTime(400).subscribe(id => {
      console.log('Update ' + this.navParams.data + ':' + id + ': ' + this.models[id]);
      switch (this.navParams.data) {
      case 'speed':
        this.cu.setSpeed(id, this.models[id].value);
        break;
      case 'brake':
        this.cu.setBrake(id, this.models[id].value);
        break;
      case 'fuel':
        this.cu.setFuel(id, this.models[id].value);
        break;    
      }
    });
  }

  onChange(id) {
    this.subject.next(id);
  }
}

@Component({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {

  nameRoot = NamePage;
  colorRoot = ColorPage;
  speedRoot = RangePage;
  brakeRoot = RangePage;
  fuelRoot = RangePage;

  constructor(public nav: NavController) {}
}
