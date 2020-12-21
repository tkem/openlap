import { Component, Inject, Input } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Observable, Subscription, empty, from } from 'rxjs';
import { catchError, filter, mergeMap, scan, take } from 'rxjs/operators';

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

  private demoControlUnit: false;

  private subscription = new Subscription();

  constructor(@Inject(Backend) private backends: Backend[],
    private logger: LoggingService,
    private platform: Platform,
    private settings: AppSettings,
    private toast: I18nToastService)
  {}

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
        mergeMap(value => value),
        filter(device => {
          return device.type != 'demo' || this.demoControlUnit;
        }),
        scan((result, device) => {
          return result.concat(device);
        }, [])
      );
    });
    this.subscription.add(this.settings.getConnection().subscribe(value => {
      this.demoControlUnit = value.demoControlUnit;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
