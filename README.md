# BaaS Platform

## Overview
The __baas-platform__ repo is a side project to build a Banking as a Service (BaaS) platform/framework that theoretically allows fintechs to provide a set of financial services to their customers via a set of Rest APIs. Fintech customers will be able to create and manage checking and savings accounts, debit cards, and payments. 

The BaaS platform will consist of a set of microserves developed with [NestJS](https://nestjs.com) that provide an architecture that is highly reliable, scalable, and fast. I do not have access to a __Core Bank Engine__, so all of the services will connect to a __core-bank-simulator__ to simulate the API responses. Where possible, the BaaS microservices will connect to vendors that provide sandboxes for connecting to their APIs such as Marqeta for debit cards.

## BaaS Platform Software Architecture
The BaaS Platform consists of a set of microservices that communicate via Rest APIs, below is a high-level diagram of the application architecture. 

![BaaS Architecture Diagram](./doc/img/baas-architecture-v2.drawio.svg)

Currently, the microservices talk to a __core-bank-simulator__ that is used to simulate responses from the Core Banking Engine.

## Microservices
The following microservices have been developed or are currently being developed.

### Customers
The __baas-customers-service__ handles creating new customers and running the KYC (AML & OFAC) checks for the customers. After a customer is verified then the customer will be able to open an account. Currently, the __baas-customer-microservice__ provides APIs to create and manage customers, but the KYC flows have not been implmenented.

### [Accounts](./apps/baas-account-service/README.md)
The __baas-accounts-service__ provides APIs to create and manage checking and saving accounts for verified customers. See [BaaS Account Service](./apps/baas-account-service/README.md) for more details.

### Debit Cards
The __baas-debit-card-service__ provides APIs to create and manage debit cards for verified customers Eventually, the baas-debit-card-service will integrate with an issuer processor such as Marqeta or Visa.

### Core Simulator Service
The __core-simulator-service__ is an application that simulates the responses expected from the __Core Banking Engine__ so that it is possible to test and develop the BaaS platform microservices. It will be developed in parallel with each BaaS platform microservice.

### BaaS Libraries
The BaaS Libraries implement functionality that is common across the BaaS microservices such as logging and error handling. 

#### Logging
The baas-logger library provides a common logging framework for all of the microservices that can be quickly configured for each microservice.

#### BaaS Errors
The baas-errors library provides a common set of exceptions for all of the microservices and provides a way to quickly add and update the exception hierarchy.

#### BaaS Interfaces
The baas-interface defines all of the interfaces for the Rest APIs and the request and response objects. Having common interfaces makes it easy to define API requests and responses for inter-microservice API calls. For example, when the baas-account-service calls the baas-customer-service and knows the response will be in the format of the __Customer Interface__.

## Roadmap
Below is a high-level roadmap for the project that will be used for development.

### Product Service
The __baas-product-service__ will manage the financial products available to clients to implement in the BaaS platform, e.g., checking accounts, debit cards, ACH payments. 

### ACH Service
The __baas-ach-service__ will provide APIs to pull and push ACH transfers.

### Authentication
The __baas-platform__ is a B2B2C framework that allows Businesses to offer Customers financial services. The __baas-platform__ needs an authentication service that allows businesses (clients) of the BaaS Platform to sign up for the service and to start offering their customers the ability to sign up. 

A client will register for an account and receive an __API Key__ and a __Secret__ that the clients will use to sign into the system and it will receive a __JSON Web Token (jwt)__. The client will need to include the jwt in the header of every API request so that BaaS platform can authenticate the client request and parse out client information from the token.

#### Column Sandbox Authentication
The column sandbox authentication process is very simple and it doesn't involve creating a jwt?
- I signed up for an account by entering by name, company, email, and password.
- Next, I verified my email and logged back into the dashboard
- On the dashboard, I selected to generate an API-Key.
- I then pass the API-Key in the header of every API request.

### API Gateway

### Business Service
### Move Money Orchestration Service

### Bill Payment Service
### P2P Service
### Credit Card Service
### Loan Service


