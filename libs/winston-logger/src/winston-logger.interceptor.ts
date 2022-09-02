//-----------------------------------------------------------------------------
// libs/winston-logger/src/logger.inteceptor.ts
//-----------------------------------------------------------------------------
import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler 
}                                 from '@nestjs/common'
import { Observable }             from 'rxjs'
import { tap }                    from 'rxjs/operators'

import { WinstonLoggerService }   from './winston-logger.service'

/**
 * Automatically log all incoming requests and outgoing responses.
 * 
 * @class LoggerInterceptor
 */
@Injectable()
export class WinstonLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLoggerService) {}

  /**
   * Log the requests, responses and time to process the response.
   * 
   * @method intercept
   */
   public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const startTime = Date.now()
    const req       = context.switchToHttp().getRequest()
    const { method, url, body, headers, params } = req

    // Log the request
    this.logger.log({
      message: `${method} ${url}`,
      request: {
        method:  method,
        url:     url,
        params:  params,
        headers: headers,
        body:    body,
      }
    })

    ///////////////////////////////////////////////////////////////////////////
    // TODO: 08/31/2022
    //  1.) Check out how request is logged when there is an authorization
    //      guard on the controller. If the request/respons is not logged 
    //      then can look at migrating to Interceptor to Middleware and 
    //      listening for the ".close" or ".finish" event. The problem may 
    //      occurr because guards are triggered after middleware, but before
    //      interceptors. See:
    //      
    //      - https://stackoverflow.com/questions/55093055/logging-request-response-in-nest-js
    //      - https://stackoverflow.com/questions/58970970/nestjs-log-response-data-object
    //      - https://github.com/julien-sarazin/nest-playground/issues/1
    // 
    //  2.) Remove the "data" from the response and log it in the service.
    ///////////////////////////////////////////////////////////////////////////

    // Log the response w/ response time.
    const res            = context.switchToHttp().getResponse()
    const { statusCode } = res

    return next.handle().pipe(
      tap({
        next: (body: any): void => {
          const responseTime = `${Date.now() - startTime} ms`
          
          this.logger.log({
            message:      `${statusCode} - ${method} ${url} - ${responseTime}`,
            httpStatus:   statusCode,
            responseTime: responseTime,
            response:   {
              body,
            }
          })
        },
        error: (err: Error): void => {
          this.logger.error({
            method:       method,
            url:          url,
            label:        err.name,
            message:      err.message,
            responseTime: `${Date.now() - startTime} ms`,
            stack:        err.stack,
          })
        }
      })
    )
  }
}