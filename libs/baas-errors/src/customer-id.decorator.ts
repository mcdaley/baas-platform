//-----------------------------------------------------------------------------
// libs/baas-errors/src/customer-id.decorator.ts
//-----------------------------------------------------------------------------
import { 
  createParamDecorator, 
  ExecutionContext,
}                               from '@nestjs/common'
import { 
  validate as uuidValidate,
}                               from 'uuid'

import { BaaSErrors }           from './baas.errors'
import { 
  InvalidCustomerIdError, 
}                               from './baas.exceptions'

/**
 * @function isValidUUID
 * @param    {string} uuid
 * @returns  {boolean} - Returns true if string is a valid UUID else returns false
 */
const isValidUUID = (uuid: string) : boolean => {
  return uuidValidate(uuid)
}

/**
 * Custom decorator to extract the Customer-Id from the request header amd
 * to return it. If the customer id is not valid then it throws a Bad
 * Request exception.
 * 
 * Implementing the CustomerId decorator so that I can send a custom
 * error message to the caller.
 */
export const CustomerId = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request     = ctx.switchToHttp().getRequest()
  const { headers } = request

  const customerId  = headers['customer-id']
  if(!customerId) {
    throw new InvalidCustomerIdError(
      BaaSErrors.headers.invalidCustomerId, 
      `Customer-Id is required`
    )
  }

  if(!isValidUUID(customerId)) {
    throw new InvalidCustomerIdError(
      BaaSErrors.headers.invalidCustomerId, 
      `Invalid Customer-Id=[${customerId}]`
    )
  }

  return customerId
})