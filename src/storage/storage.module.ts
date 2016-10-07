import { ModuleWithProviders, NgModule } from '@angular/core';

import { Storage, StorageConfig } from './storage';

@NgModule({
  providers: [
    Storage
  ]
})
export class StorageModule {
  static forRoot(config: StorageConfig): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: [
        { provide: StorageConfig, useValue: config }
      ]
    }
  }
}
