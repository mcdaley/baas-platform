# BaaS Account Microservice

## Overiew
The BaaS Account Microservice provides a set of Rest APIs to create,
manage, and delete checking and savings accounts. 

The Account Microservice does not connect to a core banking engine,
but is designed to be a framework that can plug into a core banking
engine in the future. 

Currently, the APIs will connect to core-bank-simulator that provides 
the expected response. Since there isn't a core bank engine the request
and responses will be based on current BaaS providers API documentation.

For more details on the Baas Account Microservice, see the 
[BaaS Account Service Developer Guide](./doc/baas-account-service-developer-guide.md)

## Running
Before running the baas-account-simulator, the core-bank-simulator needs
to be running to handle the requests from the baas-account-simulator. To
start:

```bash
$ cd baas-platform
$ npm run start:dev core-bank-simulator
$ npm run start:dev baas-account-simulator
```

## Rest APIs
The account microservice implements the following CRUD API endpoints.

### POST /v1/accounts
Creates a new Account with a status of __open__ for a customer with status
of __active__.

### GET /v1/accounts
Fetches a list of Accounts for a specific customer.

### GET /v1/accounts/:accountId
Fetches a single customer Account and returns it in the response.

### PATCH /v1/accounts/:accountId
Updates attributes of a Account and returns the updated Account in
the response. Can update the account nickname, status, and reason for updating
the account status.

### DELETE /v1/accounts/:accountId
Deletes a Account from the app. In the future this should not delete 
a Account but should "lock" a Accounts account.

### Account Participant APIs

#### POST /v1/accounts/:accountId/participants
Add a participant to an account, where a participant is a Customer that
has permissions to use the Account.

#### GET /v1/accounts/:accountId/participants
Get the account participants.

#### DELETE /v1/accounts/:accountId/participants/:participantId
Remove an account participant.

### Account Block APIs

#### POST /v1/accounts/:accountId/blocks
Block an account from credits, debits, or all transactions.

#### GET /v1/accounts/:accountId/blocks
Fetch a list of all blocks placed on an account.

#### DELETE /v1/accounts/:accountId/blocks
Remove a block on an account.

## APIs To Build

### Account Statement APIs

#### GET /v1/accounts/:accountId/statements
Fetch a list of account statements which contains the start and ending
dates for the statements. User can pass in parameters to control the
list of returned statements.

#### GET /v1/accounts/:accountId/statements/:statementId
Fetch an account statement.

### Transaction APIs

### GET /v1/accounts/:accountId/transactions
Fetch a list of transactions for an account. The transaction list can
be filtered and sorted by date.

### GET /v1/accounts/:accountId/transactions/:transactionId
Fetch a specific transaction for an account.
