import { Component, EventEmitter } from '@angular/core';
import {ControlUnit, Drivers} from '../../providers';
import {ColWidth, FuelGauge, Startlight, Stripe, TimePipe, IsSetPipe} from '../../components';
import {Car} from '../../models/car';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Component({
  directives: [ColWidth, FuelGauge, Startlight, Stripe],
  pipes: [TimePipe, IsSetPipe],
  templateUrl: 'build/pages/qualifying/qualifying.html',
})
export class QualifyingPage {
  cars = {};

  items = new EventEmitter<Car[]>();

  private lap = 0;

  private subscription: any;

  constructor(private cu: ControlUnit, private drivers: Drivers) {}

  ionViewLoaded() {
    // TODO: use settings
    this.cu.start.take(1).toPromise().then(value => {
      if (value !== 1) {
        this.cu.toggleStart();
      }
    });
    this.subscription = this.cu.time.subscribe(event => this.update(event));
    this.cu.clearPosition();
    this.cu.setMask(0);
    this.cu.reset();
  }

  ionViewDidUnload() {
    this.subscription.unsubscribe();
  }

  private getCar(id: number) {
    if (!(id in this.cars)) {
      this.cars[id] = new Car(id);
    }
    return this.cars[id];
  }

  private update(event: any) {
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
    // TODO: only if changed? how to prevent pos. tower default behavior?
    items.forEach((item, index) => this.cu.setPosition(item.id, index + 1));
    this.items.emit(items);
  }
}
