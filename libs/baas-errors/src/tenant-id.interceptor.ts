//-----------------------------------------------------------------------------
// libs/baas-errors/src/tenant-id.interceptor.ts
//-----------------------------------------------------------------------------
import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler, 
}                       from '@nestjs/common'
import { 
  map, 
  Observable ,
  tap,
}                       from 'rxjs'

/**
 * 
 */
@Injectable()
export class TenantIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      let request = context.switchToHttp().getRequest()
      if(request.headers.hasOwnProperty('tenant-id')) {
        request.body.tenant_id = request.headers['tenant-id']
      }
      console.log(`[DEBUG] Added tenant_id to request.body= `, request.body)

      return next.handle().pipe(
        //* tap( ()     => console.log(`[DEBUG] ${Date.now()} ms`) ),
        map( (data) => data.tenant_id = request.headers['tenant-id'] )
      )
      //* return next.handle().pipe(
      //*   map((flow) => {
      //*     flow.name = 'changeing response body';
      //*     return flow;
      //*   })
      //* )
  }
}