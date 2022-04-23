# BaaS Platform

The baas-platform repo contains a set of services and libraries to implement a Banking as a Service (BaaS) platform. 

## Architecture
The BaaS Platform consists of a set of microservices that communicate via http below is a high-level diagram of the application architecture. Currently, the microservices talk to a __core-bank-simulator__ that is used to simulate responses from the Core Banking Engine.

![BaaS Architecture Diagram](./doc/img/baas-architecture-v2.drawio.svg)

## BaaS Services
The BaaS platform is built using microservices to handle all of the core functionality of the platform and provides a flexible architecture that is highly reliable, scaleable, and fast.

### Customer Service
The baas-customer-service manages a client's customers and provide clients the ability to provide clients access to checking and savings accounts, debit cards, and money movement. The customer service will communicate with a KYC vendor to verify the customer's identity and to meet AML and OFAC regulations.

### Account Service
The baas-account-service defines all of the Rest APIS for creating and managing checking and savings accounts for a client's registered customers.

[BaaS Account Service](./apps/baas-account-service/README.md)

### Debit Card Service
The baas-debit-card-service provides clients the ability to offer their customers debit cards with their checking and savings accounts. The baas-debit-card-service will integrate with an issuer processor such as Marqueta or Visa to issue and manage customers debit cards.

### Core Simulator Service
The core-simulator-service is a simple application that simulates the responses expected from the __Core Banking Engine__ so that I can defined and build out the expected workflows in the BaaS platform for customers, accounts, debit cards, etc.

## Planned BaaS Services
The following services are planned to be built as part of the mvp.

### Authentication Service
### Business Service
### Move Money Orchestration Service
### ACH Service
### Bill Payment Service
### P2P Service
### Credit Card Service
### Loan Service

## BaaS Libraries
The BaaS Libraries implement functionality that is common across the BaaS microservices such as logging and error handling. 

### Logging
The baas-logger library provides a common logging framework for all of the microservices that can be quickly configured for each microservice.

### BaaS Errors
The baas-errors library provides a common set of exceptions for all of the microservices and provides a way to quickly add and update the exception hierarchy.

### BaaS Interfaces
The baas-interface defines all of the interfaces for the Rest APIs and the request and response objects. Having common interfaces makes it easy to define API requests and responses for inter-microservice API calls. For example, when the baas-account-service calls the baas-customer-service and knows the response will be in the format of the __Customer Interface__.


