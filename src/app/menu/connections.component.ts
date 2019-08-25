import { Component, Inject, Input } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Observable, empty, from } from 'rxjs';
import { catchError, mergeMap, scan, take } from 'rxjs/operators';

import { AppSettings } from '../app-settings';
import { Backend } from '../backend';
import { Peripheral } from '../carrera';
import { I18nToastService, LoggingService } from '../services';

@Component({
  selector: 'connections',
  templateUrl: 'connections.component.html'
})
export class ConnectionsComponent {

  @Input() selected: Peripheral;

  peripherals: Observable<Peripheral[]>;

  constructor(@Inject(Backend) private backends: Backend[],
    private logger: LoggingService,
    private platform: Platform,
    private settings: AppSettings,
    private toast: I18nToastService)
  {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      const scans = this.backends.map(backend => backend.scan().pipe(
        catchError(e => {
          this.logger.error('Scan error:', e);
          this.toast.showLongCenter(e.toString()); // TODO: key with param?
          return empty();
        })
      ));

      this.peripherals = from(scans).pipe(
        mergeMap(val => val),
        scan((result, value) => { 
          return result.concat(value);
        }, [])
      );
    });
  }

  onSelect(peripheral: Peripheral) {
    this.settings.getConnection().pipe(take(1)).subscribe((connection) => {
      this.settings.setConnection(Object.assign({}, connection, {
        type: peripheral.type,
        name: peripheral.name,
        address: peripheral.address
      }));
    });
  }
}
