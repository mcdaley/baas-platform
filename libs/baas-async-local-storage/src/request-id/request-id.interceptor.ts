//-----------------------------------------------------------------------------
// lib/baas-async-local-storage/src/request-id/request-id.interceptor.ts
//-----------------------------------------------------------------------------
import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler 
}                                     from '@nestjs/common'
import { Observable }                 from 'rxjs'
import { tap }                        from 'rxjs/operators'

import { RequestIdAsyncLocalStorage } from './request-id-async-local-storage.service'

import { uuid }                       from '@app/baas-utils'

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  constructor(private readonly requestIdAsyncLocalStorage: RequestIdAsyncLocalStorage) {}

  /**
   * Intercept the request and if the 'Request-Id' header is set then store it in 
   * the AsyncLocalStorage. If the 'Request-Id' is not set in the header then 
   * generate a unique 'Request-Id' and add it to the request header and store it
   * in the AsyncLocalStorage.
   * 
   * Finally, for all responses add the 'Request-Id' to the response header so that 
   * clients can use it to help debug issues.
   * 
   * @method intercept
   */
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Set the requestId for the incoming request
    let   requestId: string
    const req:       Request = context.switchToHttp().getRequest<Request>()
    
    if(req.headers.hasOwnProperty('request-id')) {
      requestId = req.headers['request-id']
    }
    else {
      requestId                 = uuid()
      req.headers['request-id'] = requestId
    }
    
    // Set the requestId in the async local storage
    this.requestIdAsyncLocalStorage.set(requestId)

    // Set the requestId in the response header
    return next.handle().pipe(
      tap( () => {
        const res = context.switchToHttp().getResponse()
        res.header('Request-Id', requestId)
      })
    )
  }  
}