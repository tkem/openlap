import {Page} from 'ionic-angular';
import {EventEmitter} from '@angular/core';
import {ControlUnit, Drivers} from '../../providers';
import {Gauge, Startlight, Stripe} from '../../components.ts';
import {Car} from '../../models/car';

@Page({
  directives: [Gauge, Startlight, Stripe],
  templateUrl: 'build/pages/practice/practice.html',
})
export class PracticePage {
  cars = {};

  items = new EventEmitter<Car[]>();

  private lap = 0;

  private subscription: any;

  constructor(private cu: ControlUnit, private drivers: Drivers) {}

  onPageLoaded() {
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
    // TODO: ranking for practice mode, update positions
    let items = Object.keys(this.cars).map(id => this.cars[id]);
    items.sort((lhs, rhs) => (rhs.laps - lhs.laps) || (lhs.time - rhs.time));
    this.items.emit(items);
  }

  private inPit(id: string, mask: number) {
    let n = id.charCodeAt(0) - 0x31;
    let v = mask & (1 << n);
    return v != 0;
  }
}
