import {Injectable} from '@angular/core';

export interface Driver {
    name: string;
    color: string;
}

export abstract class Drivers {
    abstract itemAt(id: number): Driver;
}

class DefaultDriver implements Driver {

    private _name: string;

    private _color: string;

    constructor(name: string, color: string) {
        this._name = name;
        this._color = color;
    }

    get name() {
        return this._name;
    }

    set name(value: string) {
        console.log('Driver name set to "' + value + '"');
        this._name = value;
    }

    get color() {
        return this._color;
    }

    set color(value: string) {
        console.log('Driver color set to "' + value + '"');
        this._color = value;
    }
}

@Injectable()
export class DefaultDrivers extends Drivers {
    private drivers = [
        new DefaultDriver('Driver #1', 'blue'),
        new DefaultDriver('Driver #2', 'red'),
        new DefaultDriver('Driver #3', 'yellow'),
        new DefaultDriver('Driver #4', 'green'),
        new DefaultDriver('Driver #5', 'white'),
        new DefaultDriver('Driver #6', 'gray'),
        new DefaultDriver('Autonomous Car', 'silver'),
        new DefaultDriver('Pace Car', 'gold'),
    ];

    itemAt(id: number) {
      return this.drivers[id];
    }
}
