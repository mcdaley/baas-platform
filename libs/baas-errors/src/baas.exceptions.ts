//-----------------------------------------------------------------------------
// libs/baas-errors/src/baas.exceptions.ts
//-----------------------------------------------------------------------------
import {
  HttpException,
}                       from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { IBaaSError }   from './baas.errors'

/**
 * @interface IBaaSErrorOptions
 */
 export interface IBaaSErrorOptions {
  cause:      Error | undefined,
}

/**
 * @class BaaSException
 * 
 * Example exception that extends the HttpException to prove that I can build 
 * an exception hierarchy and also log the exceptions.
 */
export class BaaSException extends HttpException {
  id:         string
  code:       number
  name:       string
  timestamp:  string
  path:       string | undefined
  details:    any[]
  cause:      Error | undefined

  constructor(baasError: IBaaSError, message: string) {
    super(message, baasError.httpStatus)

    this.id         = uuidv4()
    this.code       = baasError.code
    this.name       = baasError.name
    this.timestamp  = new Date().toISOString(),
    this.path       = 'path' in baasError ? baasError.path : undefined
    this.details    = []                          // Array of multiple errors
    this.cause      = baasError.cause             // Stack trace if exists
  }

  toString() {
    return `BaaSException, code=${this.code}, message=${this.message}, status=${this.getStatus()}`
  }
}

export class InvalidIdempotencyKeyError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

export class InvalidTenantIdError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

export class InvalidCustomerIdError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

export class BadRequestError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

export class InvalidRegistrationError extends BaaSException {
  constructor(baasError: IBaaSError, message: string){
    super(baasError, message)
  }
}

export class InternalError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

export class NotFoundError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

export class InactiveCustomerError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

export class InactiveAccountError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

export class BaaSAxiosError extends BaaSException {
  constructor(baasError: IBaaSError, message: string) {
    super(baasError, message)
  }
}

