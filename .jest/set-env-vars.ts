//-----------------------------------------------------------------------------
// .jest/set-env-vars.ts
//-----------------------------------------------------------------------------

// Set the node environment
process.env.NODE_ENV                      = 'test'

// Set environment for baas-customer-service
process.env.CUSTOMER_APP_NAME             = 'baas-customer-service-test'
process.env.CUSTOMER_LOG_LEVEL            = 'debug'
process.env.CUSTOMER_PORT                 = '4002'
process.env.CUSTOMER_JWT_SECRET           = 'ihaveasecret'
process.env.CUSTOMER_JWT_EXPIRES_IN       = '3600'
process.env.BANK_SIMULATOR_URL            = 'http://localhost:5001'
process.env.BANK_SIMULATOR_CUSTOMERS_URL  = 'http://localhost:5001/v1/core-customers'

// Set environment for baas-account-service
process.env.ACCOUNT_APP_NAME              = 'baas-account-service-dev'
process.env.ACCOUNT_PORT                  = '3101'
process.env.ACCOUNT_LOG_LEVEL             = 'debug'
process.env.ACCOUNT_JWT_SECRET            = 'luckyD@#1asya92348'
process.env.ACCOUNT_JWT_EXPIRES_IN        = '3600'
process.env.ACCOUNT_URL                   = 'http://localhost:5001/'
process.env.BANK_SIMULATOR_ACCOUNTS_URL   = 'http://localhost:5001/v1/core-accounts'
