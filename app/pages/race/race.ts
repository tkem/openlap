import {Modal, NavController, Page, ViewController} from 'ionic-angular';
import {EventEmitter} from '@angular/core';
import {ControlUnit, Drivers} from '../../providers';
import {ColWidth, Gauge, Startlight, Stripe, TimePipe, IsSetPipe} from '../../components.ts';
import {Car} from '../../models/car';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Page({
  templateUrl: 'build/pages/race/race-settings.html'
})
class RaceSettings {

  laps = 5;
  time = 0;
  auto = false;

  constructor(private view: ViewController) {
  }

  close() {
    this.view.dismiss(this);
  }
}

@Page({
  directives: [ColWidth, Gauge, Startlight, Stripe],
  pipes: [TimePipe, IsSetPipe],
  templateUrl: 'build/pages/race/race.html',
})
export class RacePage {
  cars = {};

  items = new EventEmitter<Car[]>();

  private lap = 0;
  private laps = 0;
  private mask = 0;

  private startTime: number;
  private currentTime: number;

  private subscription: any;

  constructor(private cu: ControlUnit, private drivers: Drivers, private nav: NavController) {}

  onPageLoaded() {
    // FIXME: overlay on race screen on first open
    let modal = Modal.create(RaceSettings);
    modal.onDismiss(settings => {
      this.laps = settings.laps;
      this.cu.start.take(1).toPromise().then(value => {
        if (value !== 1) {
          this.cu.toggleStart();
        }
      });
      this.subscription = this.cu.time.subscribe(event => this.update(event));
      this.cu.clearPosition();
      this.cu.setMask(0);
      this.cu.reset();
    });
    setTimeout(() => this.nav.present(modal));
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

  private update(event: any) {
    if (this.startTime === undefined) {
      this.startTime = event.time;
      this.currentTime = event.time;
    }
    let car = this.getCar(event.id);
    if (car.time) {
      car.laptime = event.time - car.time;
      if (++car.laps > this.lap) {
        this.lap = car.laps;
        this.cu.setLap(this.lap);
        this.currentTime = event.time;
      }
      if (car.laps == this.laps) {
        this.mask |= 1 << event.id;
        this.cu.setMask(this.mask);
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

  private gap(item: Car) {
    if (item.laps == this.lap) {
      return '+' + ((item.time - this.currentTime) / 1000).toFixed(3);
    } else{
      return '+' + (this.lap - item.laps) + ' laps';
    }
  }
}
