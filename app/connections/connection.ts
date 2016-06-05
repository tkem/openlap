import { Injectable } from '@angular/core';

import { Observable, Subscribable } from 'rxjs/Observable';

export interface Connection extends Subscribable<ArrayBuffer> {
  send(data: ArrayBuffer);
  close();
}

export interface Device {
  name: string;
  id: any;
}

export abstract class ConnectionProvider {
  abstract connect(device?: Device): Promise<Connection>;
}
