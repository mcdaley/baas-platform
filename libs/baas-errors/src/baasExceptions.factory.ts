//-----------------------------------------------------------------------------
// libs/baas-errors/src/baasExceptions.factory.ts
//-----------------------------------------------------------------------------
import { HttpException }  from "@nestjs/common"

import { BaaSErrors }     from "./baas.errors"
import {
  IBaaSError,
  BaaSAxiosError,
  BaaSException,
  InternalError,
}                         from './baas.exceptions'

/**
 * @class BaasExceptionFactory
 */
 export class BaaSExceptionFactory {
  static create(error: any, resource: string = `resource`): BaaSException {
    if(error instanceof BaaSException) {
      return error
    }
    else if(error instanceof HttpException) {
      console.log(`[DEBUG] Received HttpException, error= `, error)
      return new InternalError(BaaSErrors[resource].unknownError, "NEED TO DEBUG THIS ONE - I SHOULD NOT GET HERE")
    }
    else if(error.hasOwnProperty('isAxiosError') && error.isAxiosError) {
      // Axios Error
      let baasErrorType: IBaaSError

      if(error.response) {
        // Request was made and server responded with a Http Status code
        const httpStatus = error.response.status
        switch(httpStatus) {
          case 400:
            baasErrorType = BaaSErrors[resource].badRequest
            break
          case 401:
            baasErrorType = BaaSErrors[resource].unauthorized
            break
          case 403:
            baasErrorType = BaaSErrors[resource].forbidden
          case 404:
            baasErrorType = BaaSErrors[resource].notFound
            break
          case 500:
            baasErrorType = BaaSErrors[resource].internalError
            break
          default:
            baasErrorType = BaaSErrors[resource].unknown
        }

        return new BaaSAxiosError(baasErrorType, error.message)
      }
      else if(error.request) {
        // Request was made, but no response was received.
        return new BaaSAxiosError(BaaSErrors[resource].internalError, error.message)
      }
      else {
        // Unknown error was triggered
        return new BaaSAxiosError(BaaSErrors[resource].unknownError, error.message)
      }
    }
    else if(error instanceof Error) {
      // JavaScript Error
      return new BaaSException(BaaSErrors[resource].unknownError, error.message)
    }
    else {
      // Unknown Error
      return new BaaSException(BaaSErrors[resource].unknownError, `Undefined Error`)
    }
  }
}
