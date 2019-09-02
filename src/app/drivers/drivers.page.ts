import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { AppSettings, Driver } from '../app-settings';
import { LoggingService, SpeechService } from '../services';

@Component({
  templateUrl: 'drivers.page.html'
})
export class DriversPage implements OnDestroy, OnInit {

  drivers: Driver[];

  readonly placeholder = 'Driver {{number}}';

  constructor(private logger: LoggingService, private settings: AppSettings, private speech: SpeechService, private translate: TranslateService) {}

  ngOnInit() {
    this.settings.getDrivers().pipe(take(1)).toPromise().then(drivers => {
      this.drivers = drivers;
    }).catch(error => {
      this.logger.error('Error getting drivers', error);
    });
  }

  ngOnDestroy() {
    this.settings.setDrivers(this.drivers).catch(error => {
      this.logger.error('Error setting drivers', error);
    });
  }

  getCode(name: string, id: number) {
    let chars = name.replace(/\W/g, '').toUpperCase();  // TODO: proper Unicode support
    let codes = this.drivers.filter((_, index) => index !== id).map(obj => obj.code);
    for (let n = 2; n < chars.length; ++n) {
      let s = chars.substr(0, 2) + chars.substr(n, 1);
      if (codes.indexOf(s) === -1) {
        return s;
      }
    }
    return undefined;
  }

  reorderItems(event: any) {
    let colors = this.drivers.map(driver => driver.color);
    let element = this.drivers[event.detail.from];
    this.drivers.splice(event.detail.from, 1);
    this.drivers.splice(event.detail.to, 0, element);
    colors.forEach((color, index) => {
      this.drivers[index].color = color;
    });
    event.detail.complete();
  }

  speak(id: number) {
    this.getDriverName(id).then(name => {
      this.speech.speak(name);
    })
  }

  private getDriverName(id) {
    if (this.drivers[id] && this.drivers[id].name) {
      return Promise.resolve(this.drivers[id].name);
    } else {
      return this.translate.get(this.placeholder, {number: id + 1}).toPromise();
    }
  }

}
