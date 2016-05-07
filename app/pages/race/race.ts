import {Page, NavController, NavParams} from 'ionic-angular';
import {ChangeDetectorRef, Input, NgZone} from 'angular2/core';
import {ControlUnit} from '../../providers/cu';

const Colors = ['red', 'blue', 'yellow', 'green', 'gray', 'black', 'silver', 'gold'];

class Car {
  constructor(id) {
    this.name = '#' + id;
    this.color = Colors[parseInt(id) - 1];
  }

  name: string;
  color: string;
  time: number = null;
  laps: number = -1;
  laptime: number = null;
  bestlap: number = null;
  pitstops: number = 0;
  fuel: number = 15;
  pit: boolean = false;
}

@Page({
  templateUrl: 'build/pages/race/race.html'
})
export class RacePage {
  cars = {};

  items: Array<Car> = [];

  constructor(private cu: ControlUnit, private nav: NavController, navParams: NavParams, zone: NgZone) {
    cu.lap.subscribe(lap => {
      let car = this.getCar(lap.id);
      zone.run(() => {
        if (car.time) {
          car.laptime = lap.time - car.time;
        }
        if (!car.bestlap || car.laptime < car.bestlap) {
          car.bestlap = car.laptime;
        }
        car.time = lap.time;
        car.laps++;
        this.items.sort((lhs, rhs) => (rhs.laps - lhs.laps) || (lhs.time - rhs.time));
      });
      if (this.items.length) {
        cu.setLap(this.items[0].laps);
      }
    });
    cu.status.subscribe(status => {
      zone.run(() => {
        for (var id in this.cars) {
          let car = this.cars[id];
          let index = parseInt(id) - 1;
          let pit = (status.pit & (1 << index)) !== 0;
          if (pit && !car.pit) {
            car.pitstops++;
          }
          car.fuel = status.fuel[index];
          car.pit = pit;
        }
      });
    });
  }
  
  start() {
    this.cu.start();  
  }
  
  private getCar(id: number) {
    if (!(id in this.cars)) {
      this.items.push(this.cars[id] = new Car(id));
    }
    return this.cars[id];
  }
}
