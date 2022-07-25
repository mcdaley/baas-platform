//-----------------------------------------------------------------------------
// libs/baas-errors/src/tenant-id.middleware.ts
//-----------------------------------------------------------------------------
import { 
  Injectable, 
  NestMiddleware 
}                               from '@nestjs/common'
import { 
  Request, 
  Response, 
  NextFunction 
}                               from 'express'
import { BaaSErrors }           from './baas.errors'
import { InvalidTenantIdError } from './baas.exceptions'

/**
 * Middleware that checks if the 'Tenant-Id' is set in the request header. If it 
 * is set then added the "tenant_id" to the request's body. Otherwise, throw
 * an exception that a valid Tenant-Id is required.
 * 
 * @class TenantIdMiddleware
 */
@Injectable()
export class TenantIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(!req.headers.hasOwnProperty('tenant-id')) {
      throw new InvalidTenantIdError(
        BaaSErrors.headers.invalidTenantId, 
        `Tenant-Id is required in the request header`
      )
    }

    // Add the tenant id to the request body.
    req.body.tenant_id = req.headers['tenant-id']
    next()
  }
}