import { Peripheral } from '../carrera';

import { Observable } from '../rxjs';

export abstract class Backend {

    abstract scan(): Observable<Peripheral>;
}
