# Core Bank Simulator
The Core Bank Simulator will handle requests from the Baas Microservices and generate the proper response.

## To Do
- [x] Core bank simulator framework (i.e. Logging, ConfigService, Server)
- [ ] Customer APIs (w/ FakerJS)
- [ ] Load fake initialization data from a file
- [ ] Account APIs
- [ ] Debit Card APIs
- [ ] Fake Ledger


export function createBaaSException(error: any, resource: string = `resource`) : BaaSException {
  if(error instanceof BaaSException) {
    return error
  }
  else if(error.hasOwnProperty('isAxiosError') && error.isAxiosError) {
    // Axios Error
    let baasErrorType: IBaaSError

    if(error.response) {
      // Request was made and server responded with a Http Status code
      const httpStatus = error.response.status
      switch(httpStatus) {
        case 404:
          baasErrorType = BaaSErrors[resource.toLowerCase()].notFound
      }
      return new BaaSAxiosError(baasErrorType, error.message)
    }
  }
}
