import { Observable } from 'rxjs/Observable';

export interface Connection {
  subscribe(generatorOrNext?: any, error?: any, complete?: any) : any;

  send(data: ArrayBuffer);

  close();
}

export interface Device {
  name: string;
  id: any;
}

export abstract class Provider {
  abstract connect(device: Device): Observable<Connection>;
  abstract scan(): Observable<Device>;  
}
