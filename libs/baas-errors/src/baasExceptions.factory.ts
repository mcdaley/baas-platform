//-----------------------------------------------------------------------------
// libs/baas-errors/src/baasExceptions.factory.ts
//-----------------------------------------------------------------------------
import { HttpException }  from "@nestjs/common"
import { TypeORMError }   from "typeorm"

import { 
  IBaaSError, 
  BaaSErrors,
  BaaSErrorLabel, 
}                         from "./baas.errors"
import {
  BaaSAxiosError,
  BaaSException,
  BaaSTypeOrmError,
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
 * API. In JavaScript the type of error thrown is unknown, so it is necessary
 * to figure out the type of the error and convert it to the base
 * BaaSException class.
 * 
 * @function  createBaaSException
 * @param     unknown:  error 
 * @param     string:   resource 
 * @returns   BaaSException
 */
export function createBaaSException(
  error:    any,
  resource: BaaSErrorLabel = BaaSErrorLabel.Unknown) : BaaSException 
{
  if(isBaaSException(error))        return <BaaSException>error
  if(isAxiosError(error))           return buildBaaSAxiosException(error, resource)
  if(isTypeORMException(error))      return buildBaaSTypeORMException(error, resource)
  if(isJavaScriptException(error))  return buildBaaSJavaScriptException(error, resource)
  if(isHttpException(error))        return buildBaaSHttpException(error, resource)
  
  return new BaaSException(error, `Unknown Error`)
}  

/**
 * If the error is a BaaSException return true otherwise return false. A
 * BaaSException error is thrown when there is a custom application error, for
 * example when there is an invalid "Tenant-Id" in a request header.
 * 
 * @function isBaaSException 
 */
function isBaaSException(error: any) : boolean {
  return error instanceof BaaSException ? true : false
}

/**
 * If the error is an AxiosError return true otherwise return false. An
 * AxiosError is thrown when there was an error in the HTTP calls to 
 * another service using the axios module.
 * 
 * @function isAxiosError
 */
function isAxiosError(error: any) : boolean {
  if (error.hasOwnProperty('isAxiosError') && error.isAxiosError) {
    return true
  }
  return false
}

/**
 * Parse the AxiosError and create an instance of BaaSAxiosError. The
 * isAxiosError() function must be called before calling this function
 * to ensure that the "error" parameter is an AxiosError.
 * 
 * @function buildBaaSAxiosException
 */
function buildBaaSAxiosException(error: any, resource: BaaSErrorLabel) : BaaSAxiosError {
  let baasErrorType : IBaaSError

  if(error.response) {
    //
    // Request was made and server responded with a Http Status code
    //
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
    //
    // Request was made, but no response was received.
    //
    return new BaaSAxiosError(BaaSErrors[resource].internalError, error.message)
  }
  else {
    // Unknown error was triggered
    return new BaaSAxiosError(BaaSErrors[resource].unknownError, error.message)
  }
}

/**
 * If the error occurred in the SQLite DB then return true, otherwise return false.
 * 
 * @function isTypeORMException
 */
function isTypeORMException(error) : boolean {
  return error instanceof TypeORMError ? true : false
}    

/**
 * Parse the TypeORMError and return a BaaSException.
 * 
 * @function buildBaaSTypeORMException
 */
function buildBaaSTypeORMException(error: any, resource: BaaSErrorLabel) : BaaSException {
  return new BaaSTypeOrmError(BaaSErrors[resource].typeOrmError, error.message)
}

/**
 * If the error is a JavaScript error then return true otherwise return false.
 * A JavaScript error is thrown when a runtime error occurs.
 * 
 * @function isJavaScriptException
 */
function isJavaScriptException(error: any) : boolean {
  return error instanceof Error ? true : false
}

/**
 * Build the BaaSException from the JavaScript Error object using the
 * error message and the resource where the exception was thrown.
 * 
 * @function buildBaaSJavaScriptException
 */
function buildBaaSJavaScriptException(error: any, resource: string) : BaaSException {
  return new BaaSException(BaaSErrors[resource].unknownError, error.message)
}

/**
 * If the error is a Nestjs HttpException then return true, otherwise return false.
 * There should never be ab HttpException because the BaaSException class extends
 * the Nestjs HttpException.
 * 
 * @function isHttpException
 */
function isHttpException(error: any) : boolean {
  return error instanceof HttpException ? true : false
}

/**
 * Return an internal error because the code should never get here and I 
 * need to do more research about error handling.
 * 
 * @function buildBaaSHttpException
 */
function buildBaaSHttpException(error: any, resource: string) : BaaSException {
  return new InternalError(
    BaaSErrors[resource].unknownError, 
    "NEED TO DEBUG THIS ONE - I SHOULD NOT GET HERE"
  )
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
