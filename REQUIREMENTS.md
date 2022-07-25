# BaaS Platform Requirements

## Overview
I have bare bones BaaS platform with customer, accounts, debit-cards, and core bank simulator and the next step is to start productionizing the microservices.

## Core Service Features
Look at building the __core service features__ to standardize and add best practices for all of the microservices.

### Request Headers
Add the required headers for all of the APIs and verify that they are working, some of the required headers are:

- TenantId
- CustomerId
- IdempotencyKey

Need to write nestjs "interceptors?" to standardize the processing of the headers and err handling.

### Request Body
Cleanup all of the interfaces and define data types:
- Numbers
- Date strings: gracefull handle JSON date strings and store in DB as dates.

### Responses
Add response return types for all controllers and services.
  
### Application Configuration
Standardize on the naming and numbering for the different environment and application services. Currently, the numbering is a hodge podge.

### Query Parameters
Query params, especially for findAll

### Errors
The error handling has a good starting framwework, but it needs work to productionize it:
- Standardize error fields for development and production
  * Add API message that provides users w/ a simple message
- Fix bug w/ using the __resource__ name for organizing error definitions
- Standardize error numbering so that it is consistent
- Remove if-else or switch logic when adding new errors
- Support SQLITE errors
- Support TypeScript/JavaScript errors
- Add failsafe error
- Store the filename and directory in the error object.

### Logging
The majority of the logging for Rest APIs are for Http Request and Responses, so I can create wrapper methods in the WinstonLoggerService for loggin:

- Add TraceId to the requests from article
  
- Http Requests, i.e., POST, GET, PATCH, PUT, and DELETE. I can create a wrapper object that      
  standardize the 

- Http Responses for CRUD operations
  
- Error messages
  
- Messages

- Format the logger as a JSON object.
  
- Fix bug where only one '%s' gets parsed in log message.

### Http
Look at ways of making the Http requests more resilient by:

- Build a Nestjs module using Netflix library to handle retries

- Use Nestjs reactive module for better processing of request/responses

### Testing
- Make the test directory a library, so I can reference it as '@test'