import {Page, NavController, NavParams} from 'ionic-angular';
import {ControlUnit} from '../../providers/cu';
import {Drivers} from '../../providers/drivers';

@Page({
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

@Page({
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

@Page({
  template: `
    <ion-content>
      <ion-list>
        <ion-item *ngFor="let id of '123456'.split('')">
          <ion-label>#{{id}}</ion-label>
          <ion-select [(ngModel)]="model[id]" (change)="change(id)">
            <ion-option value="0">0</ion-option>
            <ion-option value="1">1</ion-option>
            <ion-option value="2">2</ion-option>
            <ion-option value="3">3</ion-option>
            <ion-option value="4">4</ion-option>
            <ion-option value="5">5</ion-option>
            <ion-option value="6">6</ion-option>
            <ion-option value="7">7</ion-option>
            <ion-option value="8">8</ion-option>
            <ion-option value="9">9</ion-option>
            <ion-option value="10">10</ion-option>
            <ion-option value="11">11</ion-option>
            <ion-option value="12">12</ion-option>
            <ion-option value="13">13</ion-option>
            <ion-option value="14">14</ion-option>
            <ion-option value="15">15</ion-option>
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
class RangePage {
  model = {'1': 8, '2': 8, '3': 8, '4': 8, '5': 8, '6': 8};

  constructor(navParams: NavParams) {
    console.log("---> Passed params", navParams.data);
  }

  change(id) {
    console.log('---> Change #' + id + ': ' + this.model[id]);
  }
}

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
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
