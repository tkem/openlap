import {Injectable} from '@angular/core';

export interface Driver {
    id: string;
    name: string;
    color: string;
}

export abstract class Drivers {
    abstract itemAt(key: string | number): Driver;
}

class DefaultDriver implements Driver {

    private _id: string;

    private _name: string;

    private _color: string;

    constructor(id: string, name: string, color: string) {
        this._id = id;
        this._name = name;
        this._color = color;
    }

    get id() {
        return this._id;
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
        new DefaultDriver('1', 'Driver #1', 'blue'),
        new DefaultDriver('2', 'Driver #2', 'red'),
        new DefaultDriver('3', 'Driver #3', 'yellow'),
        new DefaultDriver('4', 'Driver #4', 'green'),
        new DefaultDriver('5', 'Driver #5', 'white'),
        new DefaultDriver('6', 'Driver #6', 'gray'),
        new DefaultDriver('7', 'Autonomous Car', 'silver'),
        new DefaultDriver('8', 'Pace Car', 'gold'),
    ];

    itemAt(key: number | string) {
        if (typeof key === 'string') {
            return this.drivers[parseInt(key) - 1];
        } else {
            return this.drivers[key];
        }
    }
}
