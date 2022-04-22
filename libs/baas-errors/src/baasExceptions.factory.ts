//-----------------------------------------------------------------------------
// libs/baas-errors/src/baasExceptions.factory.ts
//-----------------------------------------------------------------------------
import { HttpException }  from "@nestjs/common"

import { 
  IBaaSError, 
  BaaSErrors, 
}                         from "./baas.errors"
import {
  BaaSAxiosError,
  BaaSException,
  InternalError,
}                         from './baas.exceptions'

///////////////////////////////////////////////////////////////////////////////
// TODO: 04/22/2020
// The static BaaSExceptionFactory.create method was causing the services to
// crash because it wasn't able to process the BaaSErrors object, so I moved
// to a standard function, createBaaSException.
//
// Tasks:
// - [] Add redundancy check of the "resource" parameter because I am assuming
//      that it the coder will not make an error when calling the method.
// - [] Look at redesigning the logic, so that it is more elegant and that
//      it is easier to add exception types, such as thrown DB exceptions.
///////////////////////////////////////////////////////////////////////////////

/**
 * Convert an error thrown by the application to a BaaSException, so that 
 * BaaS service can return a standard formatted error to the caller of the
 * API.
 * 
 * @function  createBaaSException
 * @param     any:    error 
 * @param     string: resource 
 * @returns   BaaSException
 */
export function createBaaSException(error: any, resource: string = `resource`) : BaaSException {
  if(error instanceof BaaSException) {
    return error
  }
  else if(error instanceof HttpException) {
    console.log(`[DEBUG] Received HttpException, error= `, error)
    return new InternalError(BaaSErrors[resource].unknownError, "NEED TO DEBUG THIS ONE - I SHOULD NOT GET HERE")
  }
  else if(error.hasOwnProperty('isAxiosError') && error.isAxiosError) {
    // Received an Axios Error
    let baasErrorType : IBaaSError
    let resourceName  : string = resource.toLowerCase()

    if(error.response) {
      // Request was made and server responded with a Http Status code
      const httpStatus = error.response.status
      switch(httpStatus) {
        case 400:
          baasErrorType = BaaSErrors[resourceName].badRequest
          break
        case 401:
          baasErrorType = BaaSErrors[resourceName].unauthorized
          break
        case 403:
          baasErrorType = BaaSErrors[resourceName].forbidden
        case 404:
          baasErrorType = BaaSErrors[resourceName].notFound
          break
        case 500:
          baasErrorType = BaaSErrors[resourceName].internalError
          break
        default:
          baasErrorType = BaaSErrors[resourceName].unknown
      }
      return new BaaSAxiosError(baasErrorType, error.message)
    }
    else if(error.request) {
      // Request was made, but no response was received.
      return new BaaSAxiosError(BaaSErrors[resourceName].internalError, error.message)
    }
    else {
      // Unknown error was triggered
      return new BaaSAxiosError(BaaSErrors[resourceName].unknownError, error.message)
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

/**
 * @class BaasExceptionFactory
 */
 export class BaaSExceptionFactory {
  public static create(error: any, resource: string = `resource`): BaaSException {
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
