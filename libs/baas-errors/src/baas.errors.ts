//-----------------------------------------------------------------------------
// libs/baas-errors/src/baas.errors.ts
//-----------------------------------------------------------------------------
import { HttpStatus } from '@nestjs/common'

/**
 * @interface IBaaSErrorsList
 */
export interface IBaaSErrorsList {
  [key: string] : IBaaSErrorResource
}

/**
 * @interface IBaaSErrorResource
 */
 export interface IBaaSErrorResource {
  [key: string]: IBaaSError
}

/**
 * @interface IBaaSError
 */
 export interface IBaaSError {
  httpStatus: number,
  code:       number,
  name:       string,
  path?:      string,
  cause?:     Error,
}

/**
 * @enum BaaSErrorLabel
 */
export enum BaaSErrorLabel {
  Headers   = 'headers',
  Request   = 'request',
  Customer  = 'customer',
  Account   = 'account',
  DebitCard = 'debitcard',
  Marqeta   = 'marqeta',
  Resource  = 'resource',
  Unknown   = 'unknown',
}


/**
 * Define all of the errors that can occur in the BaaS microservices. The 
 * errors are organized by the microservice/resource so that it is easy to
 * identify which microservice that the error occurred.
 * 
 * For each error define the httpStatus, integer code and name of the error.
 * The errors should be grouped by the resource or a common theme.
 * 
 * Note:
 * The keys need to match the BaaSErrorLabel enums defined above.
 */
export const BaaSErrors: IBaaSErrorsList = {
  headers: {
    invalidIdempotencyKey: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       1001,
      name:       `Invalid Idempotency-Key`,
    },
    invalidTenantId: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       1001,
      name:       `Invalid Tenant-Id`,
    },
    invalidCustomerId: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       1001,
      name:       `Invalid Customer-Id`,
    },
  },
  request: {
    badRequest: { 
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       1002,
      name:       'Bad Request',
    }
  },
  customer: {
    invalidRegistration: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       2001,
      name:       `Invalid Customer Registration`,
    },
    unauthorized: {
      httpStatus: HttpStatus.UNAUTHORIZED,
      code:       2002,
      name:       `Customer is Unauthorized`,
    },
    forbidden: {
      httpStatus: HttpStatus.FORBIDDEN,
      code:       2003,
      name:       `Customer is Forbidden`,
    },
    notFound: {
      httpStatus: HttpStatus.NOT_FOUND,
      code:       2004,
      name:       `Customer Not Found`,
    },
    internalError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       2010,
      name:       `Internal Customer Error`,
    },
    unknownError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       2011,
      name:       `Unknown Customer Error`,
    },
    typeOrmError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3012,
      name:       `Database Error`,
    }
  },
  account: {
    badRequest: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       3001,
      name:       `Bad Request`,
    },
    unauthorized: {
      httpStatus: HttpStatus.UNAUTHORIZED,
      code:       3002,
      name:       `Account is Unauthorized`,
    },
    forbidden: {
      httpStatus: HttpStatus.FORBIDDEN,
      code:       3003,
      name:       `Account is Forbidden`,
    },
    notFound: {
      httpStatus: HttpStatus.NOT_FOUND,
      code:       3004,
      name:       `Account Not Found`,
    },
    participantNotFound: {
      httpStatus: HttpStatus.NOT_FOUND,
      code:       3005,
      name:       `Account Participant Not Found`,
    },
    accountBlockNotFound: {
      httpStatus: HttpStatus.NOT_FOUND,
      code:       3006,
      name:       `Account Block Not Found`,
    },
    inactiveCustomer: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       3007,
      name:       `Customer is Not Active`,
    },
    internalError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3010,
      name:       `Internal Account Error`,
    },
    unknownError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3011,
      name:       `Unknown Account Error`,
    },
    typeOrmError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3012,
      name:       `Database Error`,
    }
  },
  debitcard: {
    unauthorized: {
      httpStatus: HttpStatus.UNAUTHORIZED,
      code:       3002,
      name:       `Debit Card is Unauthorized`,
    },
    forbidden: {
      httpStatus: HttpStatus.FORBIDDEN,
      code:       3003,
      name:       `Debit Card is Forbidden`,
    },
    notFound: {
      httpStatus: HttpStatus.NOT_FOUND,
      code:       3004,
      name:       `Debit Card Not Found`,
    },
    internalError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3005,
      name:       `Internal Debit Card Error`,
    },
    unknownError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3011,
      name:       `Unknown Debit Card Error`,
    },
    blockNotFound: {
      httpStatus: HttpStatus.NOT_FOUND,
      code:       3006,
      name:       `Debit Card Block Not Found`,
    },
    debitCardNotBlocked: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       3007,
      name:       `Debit Card Not Blocked`,
    },
    inactiveAccount: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       3008,
      name:       `Account is Not Active`,
    },
    inactiveCustomer: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       3009,
      name:       `Customer is Not Active`,
    },
    typeOrmError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3012,
      name:       `Database Error`,
    }
  },
  marqeta: {
    badRequest: {
      httpStatus: HttpStatus.BAD_REQUEST,
      code:       3001,
      name:       `Bad Request`,
    },
    unauthorized: {
      httpStatus: HttpStatus.UNAUTHORIZED,
      code:       3002,
      name:       `Unauthorized`,
    },
    forbidden: {
      httpStatus: HttpStatus.FORBIDDEN,
      code:       3003,
      name:       `Forbidden`,
    },
    notFound: {
      httpStatus: HttpStatus.NOT_FOUND,
      code:       3004,
      name:       `Resource Not Found`,
    },
    internalError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3010,
      name:       `Internal Resource Error`,
    },
    unknownError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3011,
      name:       `Unknown Resource Error`,
    },
  },
  resource: {
    unauthorized: {
      httpStatus: HttpStatus.UNAUTHORIZED,
      code:       3002,
      name:       `Unauthorized`,
    },
    forbidden: {
      httpStatus: HttpStatus.FORBIDDEN,
      code:       3003,
      name:       `Forbidden`,
    },
    notFound: {
      httpStatus: HttpStatus.NOT_FOUND,
      code:       3004,
      name:       `Resource Not Found`,
    },
    internalError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3010,
      name:       `Internal Resource Error`,
    },
    unknownError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3011,
      name:       `Unknown Resource Error`,
    },
    typeOrmError: {
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      code:       3012,
      name:       `Database Error`,
    }
  },
} // end of BaaSErrors
