
const Colors = ['red', 'blue', 'yellow', 'green', 'gray', 'black', 'silver', 'gold'];

export class Car {
  constructor(id) {
    this.id = id.toString();
    this.name = '#' + id;
    this.color = Colors[parseInt(id) - 1];
  }

  id: string;
  name: string;
  color: string;
  time: number = null;
  laps: number = 0;
  laptime: number = null;
  bestlap: number = null;
  pitstops: number = 0;
  fuel: number = 15;
  pit: boolean = false;
}
