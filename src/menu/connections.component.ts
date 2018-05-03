import { Component, Inject, Input } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Observable } from 'rxjs';

import { Backend } from '../backend';
import { Peripheral } from '../carrera';
import { Settings } from '../core';

@Component({
  selector: 'app-connections',
  templateUrl: 'connections.component.html'
})
export class ConnectionsComponent {

  @Input() selected: Peripheral;

  peripherals: Observable<Peripheral[]>;

  constructor(@Inject(Backend) private backends: Backend[], private settings: Settings, private platform: Platform) 
  {
  }

  ngOnInit() {
    this.platform.ready().then(readySource => {
      this.peripherals = Observable.from(this.backends.map(backend => backend.scan())).mergeAll().scan(
        (result, value) => result.concat(value), []
      );
    });
  }

  onSelect(peripheral: Peripheral) {
    this.settings.getConnection().take(1).subscribe((connection) => {
      this.settings.setConnection(Object.assign({}, connection, {
        type: peripheral.type,
        name: peripheral.name,
        address: peripheral.address
      }));
    });
  }
}
