//-----------------------------------------------------------------------------
// lib/baas-errors/src/request-headers.decorator.ts
//-----------------------------------------------------------------------------
import { 
  createParamDecorator, 
  ExecutionContext,
}                               from '@nestjs/common'
import { AxiosRequestHeaders } from 'axios'
import { 
  validate as uuidValidate,
}                               from 'uuid'

import { BaaSErrors }           from './baas.errors'
import { 
  InvalidCustomerIdError, 
  InvalidIdempotencyKeyError, 
  InvalidTenantIdError, 
}                               from './baas.exceptions'

/**
 * @interface BaaSRequestHeaders
 */
export interface IBaaSRequestHeaders extends AxiosRequestHeaders {
  'Customer-Id'?:      string,
  'IdempotencyoKey'?:  string,
  'Tenant-Id'?:        string,
  'Request-Id'?:       string,
}

/**
 * Validate the 'Customer-Id', 'Tenant-Id', and 'Idempotency-Key' headers
 * and return the required header values. If a header is not valid then 
 * throw an appropriate error.
 * 
 * @function createParamDecorator
 */
export const BaaSRequestHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) : IBaaSRequestHeaders => 
{
  const request        : Request             = ctx.switchToHttp().getRequest()
  let   requestHeaders : IBaaSRequestHeaders = {}

  try {
    if(isCustomerIdRequired(request)) {
      const customerId             = getCustomerId(request)
      requestHeaders['Customer-Id'] = customerId
    }

    if(isTenantIdRequired(request)) {
      const tenantId              = getTenantId(request)
      requestHeaders['Tenant-Id']  = tenantId
    }

    if(isIdempotencyKeyRequired(request)) {
      const idempotencyKey             = getIdempotencyKey(request)
      requestHeaders['Idempotency-Key'] = idempotencyKey
    }

    if(hasRequestId(request)) {
      const requestId              = getRequestId(request)
      requestHeaders['Request-Id'] = requestId
    }

    return requestHeaders
  }
  catch(error) {
    throw(error)
  }
})

/**
 * @function isValidUUID
 * @param    {string} uuid
 * @returns  {boolean} - Returns true if string is a valid UUID else returns false
 */
 const isValidUUID = (uuid: string) : boolean => {
  return uuidValidate(uuid)
}

/**
 * The 'Customer-Id' is not required for "customer" API requests. Otherwise,
 * it is required for all API requests.
 * 
 * @function isCustomerIdRequired
 */
 const isCustomerIdRequired = (request: Request): boolean => {
  if(request.url.match(/customer/ig)) {
    return false
  }
  return true
}

/**
 * If the 'Customer-Id' header is required then fetch it from the header
 * and return it.
 * 
 * @param getCustomerId
 */
const getCustomerId = (request: Request) : string => {
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
}

/**
 * The 'Tenant-Id' is required for all API requests. 
 * 
 * @function isTenantIdRequired
 */
const isTenantIdRequired = (request: Request): boolean => {
  return true
}

/**
 * If the 'Tenant-Id' header is required then fetch it from the header
 * and return it. If it is not found or if it is invalid then throw an
 * InvalidTenantIdError.
 * 
 * @param getTenantId
 */
 const getTenantId = (request: Request) : string => {
  const { headers } = request

  const tenantId  = headers['tenant-id']
  if(!tenantId) {
    throw new InvalidTenantIdError(
      BaaSErrors.headers.invalidTenantId, 
      `Tenant-Id is required`
    )
  }

  /////////////////////////////////////////////////////////////////////////////
  // TODO: 09/06/2022
  // Need to defined the rules for a valid tenant id.
  /////////////////////////////////////////////////////////////////////////////
  //* if(!isValidUUID(tenantId)) {
  //*   throw new InvalidTenantIdError(
  //*     BaaSErrors.headers.invalidTenantId, 
  //*     `Invalid Tenant-Id=[${tenantId}]`
  //*   )
  //* }

  return tenantId
}


/**
 * The 'Idempotency-Key' is required for all POST and PATCH requests. Otherwise,
 * return false.
 * 
 * @function isIdempotencyKeyRequired
 */
const isIdempotencyKeyRequired = (request: Request): boolean => {
  if(request.method.match(/POST/i) || request.method.match(/PATCH/i)) {
    return true
  }
  return false
}

/**
 * If the 'Idempotency-Key' header is required then fetch it from the header
 * and return it. If the 'Idempotency-Key' does not exist or is invalid
 * then throw an exception.
 * 
 * @param getIdempotencyKey
 */
 const getIdempotencyKey = (request: Request) : string => {
  const { headers } = request

  const idempotencyKey  = headers['idempotency-key']
  if(!idempotencyKey) {
    throw new InvalidIdempotencyKeyError(
      BaaSErrors.headers.invalidIdempotencyKey, 
      `Idempotency-Key is required`
    )
  }

  if(!isValidUUID(idempotencyKey)) {
    throw new InvalidIdempotencyKeyError(
      BaaSErrors.headers.invalidIdempotencyKey, 
      `Invalid Idempotency-Key=[${idempotencyKey}]`
    )
  }

  return idempotencyKey
}

/**
 * Verify the 'Request-Id' is in the request header.
 * 
 * @function hasRequestId
 */
const hasRequestId = (request: Request) : boolean => {
  const { headers } = request

  return headers.hasOwnProperty('request-id') ? true : false
}

/**
 * Add the Request-Id to all outgoing HTTP requests, so that we can trace
 * errors across microservices.
 * 
 * @function getRequestId
 */
const getRequestId = (request: Request): string => {
  const  { headers } = request
  return headers['request-id']
}