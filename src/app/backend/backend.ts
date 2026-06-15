import { Observable } from 'rxjs';

import { Peripheral } from '../carrera';

export abstract class Backend {

    abstract type: string;

    abstract scan(): Observable<Peripheral>;
}
