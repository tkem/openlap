import { Observable } from 'rxjs';

import { Peripheral } from '../carrera';

export abstract class Backend {

    abstract scan(): Observable<Peripheral>;
}
