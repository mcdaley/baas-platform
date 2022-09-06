//---------------------------------------------------------------------------------------
// libs/baas-async-local-storage/src/request-id/request-id-async-local-storage.module.ts
//---------------------------------------------------------------------------------------
import { DynamicModule }                from '@nestjs/common'
import { AsyncLocalStorage }            from 'async_hooks'

import { RequestIdAsyncLocalStorage }   from './request-id-async-local-storage.service'

interface AsyncLocalStorageModuleOptions {
  isGlobal?:                  boolean
  asyncLocalStorageInstance?: AsyncLocalStorage<any>
}

/**
 * @class RequestIdAsyncLocalStorageModule
 */
export class RequestIdAsyncLocalStorageModule {
  static forRoot(options?: AsyncLocalStorageModuleOptions): DynamicModule {
    const isGlobal                  = options?.isGlobal ?? true
    const asyncLocalStorageInstance = options?.asyncLocalStorageInstance ?? new AsyncLocalStorage()

    return {
      module:     RequestIdAsyncLocalStorageModule,
      global:     isGlobal,
      providers:  [
        {
          provide:  RequestIdAsyncLocalStorage,
          useValue: new RequestIdAsyncLocalStorage(asyncLocalStorageInstance),
        }
      ],
      exports:    [
        RequestIdAsyncLocalStorage,
      ]
    }
  }
}
