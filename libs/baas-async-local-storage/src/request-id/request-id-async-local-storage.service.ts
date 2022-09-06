//---------------------------------------------------------------------------------------
// libs/baas-async-local-storage/src/request-id/request-id-async-local-storage.service.ts
//---------------------------------------------------------------------------------------
import { AsyncLocalStorage } from "async_hooks"

/**
 * @class RequestIdAsyncLocalStorage
 */
export class RequestIdAsyncLocalStorage {
  constructor(readonly asyncLocalStorage: AsyncLocalStorage<string>) {}

  /**
   * @method getRequestIdStore
   */
  public getRequestIdStore(): string | undefined {
    const requestId = this.asyncLocalStorage.getStore()

    if(requestId === undefined) {
      this.unregister()
      return undefined
    }
    return requestId
  }

  /**
   * @method set
   */
  public set(requestId: string): boolean {
    try {
      this.asyncLocalStorage.enterWith(requestId)
      return true
    }
    catch(err) {
      return false
    }
  }

  /**
   * @method registerCallback
   */
  public registerCallback = (requestId: string, callback) => {
    this.asyncLocalStorage.run(requestId, callback)
  }

  /**
   * @method unregister
   */
  public unregister() : void {
    /**
     * All subsequent calls to asyncLocalStorage.getStore() will return
     * undefined until the asyncLocalStorage.enterWith() is callled.
     */
    this.asyncLocalStorage.disable()
  }
}
