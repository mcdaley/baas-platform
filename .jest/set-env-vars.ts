//-----------------------------------------------------------------------------
// .jest/set-env-vars.ts
//-----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////////////////////
// TODO: 05/05/2022
// Check if loading the environment here works in the e2e tests. It doesn't
// use it in the unit tests.
///////////////////////////////////////////////////////////////////////////////
//* console.log(`[DEBUG]: Running set-env-vars.js`)
process.env.NODE_ENV                      = 'test'
process.env.CUSTOMER_APP_NAME             = 'baas-customer-service-test'
process.env.CUSTOMER_LOG_LEVEL            = 'debug'
process.env.CUSTOMER_PORT                 = '4002'
process.env.CUSTOMER_JWT_SECRET           = 'ihaveasecret'
process.env.CUSTOMER_JWT_EXPIRES_IN       = '3600'
process.env.BANK_SIMULATOR_URL            = 'http://localhost:5001'
process.env.BANK_SIMULATOR_CUSTOMERS_URL  = 'http://localhost:5001/v1/core-customers'
//* console.log(`process.env.CUSTOMER_APP_NAME= `, process.env.CUSTOMER_APP_NAME)
