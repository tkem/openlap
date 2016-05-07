import {Modal, NavController, Page, ViewController} from 'ionic-angular';
import {EventEmitter} from '@angular/core';
import {ControlUnit, Drivers} from '../../providers';
import {Gauge, Startlight, Stripe} from '../../components.ts';
import {Car} from '../../models/car';

@Page({
  template: `
    <ion-content padding>
    <h1>Qualifying Settings</h1>
    <ion-list>
    <ion-item>
    <ion-label>Laps</ion-label>
    <ion-input [(ngModel)]="laps" type="number" min="0"></ion-input>
    </ion-item>
    <ion-item>
    <ion-label>Time (min)</ion-label>
    <ion-input [(ngModel)]="time" type="number" min="0"></ion-input>
    </ion-item>
    </ion-list>
    <button (click)="close()">OK</button>
    </ion-content>
    `
})
class Settings {

  laps = 5;
  time = 0;

  constructor(private view: ViewController) {}

  close() {
    this.view.dismiss(this);
  }
}

@Page({
  directives: [Gauge, Startlight, Stripe],
  templateUrl: 'build/pages/qualifying/qualifying.html',
})
export class QualifyingPage {
  cars = {};

  items = new EventEmitter<Car[]>();

  private lap = 0;

  private subscription: any;

  constructor(private cu: ControlUnit, private drivers: Drivers, private nav: NavController) {}

  onPageLoaded() {
    // TODO: use settings
    setTimeout(() => {
      let modal = Modal.create(Settings);
      modal.onDismiss(data => console.log(data));
      this.nav.present(modal);
    }, 100);
    //this.nav.present(Modal.create(Settings));  // wont work w/o timeout
    this.subscription = this.cu.lap.subscribe(event => this.onTime(event));
    this.cu.clearPosition();
    this.cu.reset();
  }

  onPageDidUnload() {
    this.subscription.unsubscribe();
  }

  private getCar(id: number) {
    if (!(id in this.cars)) {
      this.cars[id] = new Car(id);
    }
    return this.cars[id];
  }

  private start() {
    this.cu.start();
  }

  private onTime(event: any) {
    let car = this.getCar(event.id);
    if (car.time) {
      car.laptime = event.time - car.time;
      if (++car.laps > this.lap) {
        this.lap = car.laps;
        this.cu.setLap(this.lap);
      }
    }
    if (!car.bestlap || car.laptime < car.bestlap) {
      car.bestlap = car.laptime;
    }
    car.time = event.time;

    let items = Object.keys(this.cars).map(id => this.cars[id]);
    items.sort((lhs, rhs) => (lhs.bestlap || Infinity) - (rhs.bestlap || Infinity));
    this.items.emit(items);
  }

  private inPit(id: string, mask: number) {
    let n = id.charCodeAt(0) - 0x31;
    let v = mask & (1 << n);
    return v != 0;
  }
}
