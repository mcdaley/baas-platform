//-----------------------------------------------------------------------------
// libs/baas-errors/src/tenant-id.decorator.ts
//-----------------------------------------------------------------------------
import { 
  createParamDecorator,
  ExecutionContext,
}                               from '@nestjs/common'

import { BaaSErrors }           from './baas.errors'
import { 
  InvalidTenantIdError, 
}                               from './baas.exceptions'

/**
 * @function isValidTenantId
 */
const isValidTenantId = (tenantId: string) : boolean => {
  return tenantId.length < 36 ? true : false 
}

/**
 * Custom decorator to extract the Tenant-Id from the request header amd
 * to return it. If the tenant-id is not valid then it throws a Bad
 * Request exception.
 */
export const TenantId = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request     = ctx.switchToHttp().getRequest()
  const { headers } = request

  const tenantId = headers['tenant-id']
  if(!tenantId) {
    throw new InvalidTenantIdError(
      BaaSErrors.headers.invalidTenantId, 
      `Tenant-Id is required`
    )
  }
  
  if(!isValidTenantId(tenantId)) {
    throw new InvalidTenantIdError(
      BaaSErrors.headers.invalidTenantId,
      `Invalid Tenant-Id = [${tenantId}]`
    )
  }

  return tenantId
})