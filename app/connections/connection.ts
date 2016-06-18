import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

export interface Connection extends Observable<ArrayBuffer> {

  write(data: ArrayBuffer): Promise<void>;
  
  close(): Promise<void>;
}

export interface Device {
  name: string;
  id: any;
}

export abstract class ConnectionProvider {
  abstract connect(device?: Device): Promise<Connection>;
}
