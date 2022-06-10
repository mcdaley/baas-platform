//-----------------------------------------------------------------------------
// .jest/set-env-vars.ts
//-----------------------------------------------------------------------------

// Set the jest node environment
process.env.NODE_ENV                        = 'test'

// Set jest environment for baas-customer-service
process.env.CUSTOMER_APP_NAME               = 'baas-customer-service-test'
process.env.CUSTOMER_LOG_LEVEL              = 'debug'
process.env.CUSTOMER_PORT                   = '4002'
process.env.CUSTOMER_JWT_SECRET             = 'ihaveasecret'
process.env.CUSTOMER_JWT_EXPIRES_IN         = '3600'
process.env.BANK_SIMULATOR_URL              = 'http://localhost:5001'
process.env.BANK_SIMULATOR_CUSTOMERS_URL    = 'http://localhost:5001/core/api/v1/customers'

// Set jest environment for baas-account-service
process.env.ACCOUNT_APP_NAME                = 'baas-account-service-dev'
process.env.ACCOUNT_PORT                    = '3101'
process.env.ACCOUNT_LOG_LEVEL               = 'debug'
process.env.ACCOUNT_JWT_SECRET              = 'luckyD@#1asya92348'
process.env.ACCOUNT_JWT_EXPIRES_IN          = '3600'
process.env.ACCOUNT_URL                     = 'http://localhost:5001/'
process.env.BANK_SIMULATOR_ACCOUNTS_URL     = 'http://localhost:5001/core/api/v1/accounts'

// Set jest environment for baas-debit-card-service
process.env.DEBIT_CARD_APP_NAME             = 'baas-debit-card-service-dev'
process.env.DEBIT_CARD_PORT                 = '3200'
process.env.DEBIT_CARD_LOG_LEVEL            = 'debug'
process.env.DEBIT_CARD_JWT_SECRET           = 'luckyD@#1asya92348'
process.env.DEBIT_CARD_JWT_EXPIRES_IN       = '3600'
process.env.DEBIT_CARD_URL                  = 'http://localhost:3200/v1/debit-cards'
process.env.BANK_SIMULATOR_DEBIT_CARDS_URL  = 'http://localhost:5001/core/api/v1/debit-cards'

// Set jest environment for marqeta-adapter
process.env.MARQETA_ADAPTER_APP_NAME        = 'marqeta-adapter-test'
process.env.MARQETA_ADAPTER_PORT            = '6200'
process.env.MARQETA_ADAPTER_LOG_LEVEL       = 'debug'
process.env.MARQETA_USERNAME                = 'app-username-token'
process.env.MARQETA_PASSWORD                = 'app-password-token'
process.env.MARQETA_BASE_URL                = 'https://sandbox-api.marqeta.com/v3/'
