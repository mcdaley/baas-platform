# BaaS Account Microservice Development Guide
The BaaS Account Microservice provides Rest APIs to create and manage direct deposit accounts (DDA). This guide provides a high-level overview of the lifecycle of a DDA and details that workflows for creating, managing, and closing a DDA. 

## Account Overview
After a client creates a DDA for a customer then account status is set to ```open``` and debits and credits can be applied to the account as long as the account has the necessary funds. In the case of reported or suspected fraud the DDA can be blocked. A blocked account limits debits and/or credits until the suspected fraud is corrected and the account can be unblocked. A customer can close an account and once the account is closed it cannot be reopened. Below is that state diagram for a DDA:

![Account State Diagram](./img/baas-account.sequence-Account-States.drawio.svg)

## POST /v1/accounts
After the client creates a customer using the __BaaS Customer Microservice__ then the client can create a DDA for the customer by calling the ```POST /v1/accounts```. The following sequence diagram shows the events that occur to create a DDA. 

![Baas Create Account](./img/baas-account.sequence-Create-Account.drawio.svg)

The main success scenario for creating a DDA is:

### Client Sends Create Account Request
The client sends  a `POST /v1/accounts` request that contains a customer Id and the type of account that the customer wants to open. In the MVP only ```checking``` and ```savings``` accounts are supported.

### API Gateway Validates Request
The API Gateway validates the jwt token to verify that the client is authenticated. After the request is validated the API Gateway sends the request to the __Accounts Microservice__

### Risk Check 
The __Accounts Microservice__ sends a __risk check__ request to __Risk and Fraud Management__ to verify it is not a fraudulent request. The message to the __Risk and Fraud Management__ system will contain the mobile device information of the customer that includes the device type, IP address, latitude and longitude,...

### Validate Request
After the __Risk and Fraud Management__ returns __OK__ then the __Accounts Microservice__ validates the request which includes validating the request body and header.

### Validate Participants/Customers
The request to create a DDA is required to define one or more customers that will be the account holder or authorized to use the account. The __Accounts Microservice__ calls the __Customers Microservice__ to verify that the customers/participants exist and are active customers of that particular client.

### Core Bank Engine Creates Account
After the participants are verified the __Accounts Microservice__ sends a request to the __Core Bank Engine__ to create the account. The __Core Bank Engine__ creates the account and returns the account details to the __Accounts Microservice__.

### Return New Account Details to Client
The __Accounts Microservice__ then returns the new account details to the the client.

## GET /v1/accounts
Fetch a list of all a customer's accounts.

## GET /v1/accounts/:accountId
Fetch the details for a specific account.

## PATCH /v1/accounts/:accountId
Update the account. The client is only able to update the account nickname and ?

## DELETE /v1/accounts/:accountId
Close the account. Once the account has been closed it cannot be reopened.

## Account Participants
Accounts are created by customers and the csutomers are referred to as participants. The account participant APIs are used to manage an account's customers. A participant/customer can be either the account holder, authorized to use the account, or an account't beneficiary. An account must have at least one customer that is the account holder. The account participants APIs can add a participant to an account, fetch a list of account participants, and remove a participant from an account.

### POST /v1/accounts/:accountId/participants
The ```POST /v1/accounts/:accountId/participants``` API is called to add a participant to an account. Below is a sequence diagram that shows the events that occur when a participant is added to an account.

![Add Account Participant Flow](./img/baas-account.sequence-Add-Participant.drawio.svg)

The steps for adding a participant are:

#### Client Sends Add Participant Request
The client sends  a `POST /v1/accounts/:accountId/participants` request that contains a participant to add to the Account. The participant consists of a customer id and the account role.

#### API Gateway Validates Request
The API Gateway validates the jwt token to verify that the client is authenticated. After the request is validated the API Gateway sends the request to the __Accounts Microservice__

#### Validate Participant/Customer
The request to create a participant is required to define a customer. The __Accounts Microservice__ calls the __Customers Microservice__ to verify that the customers/participants exist and are active customers of that particular client.

#### Core Bank Engine Adds Participamt
After the participants are verified the __Accounts Microservice__ sends a request to the __Core Bank Engine__ to add the participant to the Account. The __Core Bank Engine__ adds the participant to the Account and returns the participant to the __Accounts Microservice__.

#### Return New Account Participant to the Client
The __Accounts Microservice__ returns the new participant to the client.

### GET /v1/accounts/:accountId/participants
The ```GET /v1/accounts/:accountId/participants``` fetches a list of all the Account participants and their roles and returns it to the client.

### DELETE /v1/accounts/:accountId/participants/:participantCustomerId`
The ```DELETE /v1/accounts/:accountId/participants/:participantcustomerId``` removes the participant from the account. The participant will not be able to be removed if:

- The account only has one participant
- The participant to remove is the only Holder for the account

__NOTE:__ Final logic will depend on how the __Core Bank Engine__ manages account participants.

## Block Account
The block account APIs are used to block usage of the account in case of reported fraud or for other possible reasons. Once the issue is resolved then the customer's account can be unblocked. The block Account APIs are used to block and account, fetch a list of all the blocks placed on an account, and to remove a block on an account. The following sections provide more details about each API.

### POST /v1/accounts/:accountId/blocks
The ```POST /v1/accounts/:accountId/blocks``` API request adds a block to the specified account. The block can be set to block credits, block debits, block checks, or block all transactions. When an account is block the status of the account is changed to ```blocked```. The following sequence diagram shows the flow for blocking an account.

![Block Account Sequence Diagram](./img/baas-account.sequence-Block-Account.drawio.svg)

The steps for blocking an account are:

#### Client Sends Block Account Request
The client sends  a `POST /v1/accounts/:accountId/blocks` request that contains a the type of block and the reason to the account.

#### API Gateway Validates Request
The API Gateway validates the jwt token to verify that the client is authenticated. After the request is validated the API Gateway sends the request to the __Accounts Microservice__

#### Run Risk Check
The __Account Microservice__ calls the __Risk Engine__ to verify it is OK for the client/customer to block the account and the __Risk Engine__ returns ```OK```.

#### Core Bank Engine Blocks the Account
The __Accounts Microservice__ sends a request to the __Core Bank Engine__ to block the account. The __Core Bank Engine__ blocks the account and returns the block details to the __Accounts Microservice__.

#### Return Account Block Details to the Client
The __Accounts Microservice__ returns the account block details to the client.

### GET /v1/accounts/:accountId/blocks
The ```GET /v1/accounts/:accountId/blocks``` fetches a list of all the account blocks ever added to an account and sends it to the client.

### DELETE /v1/accounts/:accountId/blocks/:accountBlockId
The ```DELETE /v1/accounts/:accountId/blocks/:accountBlockId``` updates the active account block and sets the status of the account block to ```canceled``` and it updates the account status from ```blocked``` to ```open```.