<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# APi Rest with Nest Js implement hexagonal architecture

## Introduction

This API has been developed in Nest Js using a hexagonal architecture, aimed at maintaining a clear separation of responsibilities and facilitating maintenance and scalability of the application.

## Project Architecture

### Infrastructure Layer

The infrastructure layer is divided into two parts with specific responsibilities: Primary and Secondary.

**Primary:**

- Responsible for implementing the entry points for external requests to our application.
- These access points consume the different use cases implemented in the application layer.
- This part of the application manages elements such as routes (in the case of a REST API), where routes are built with their dependencies, performing their respective initializations and injections.

**Secondary:**

- Responsible for implementing all repositories or adapters that consume external resources to our application, such as databases and third-party libraries.

### Application Layer

- Responsible for implementing specific use cases of the application.
- Orchestrates the different domain services to encapsulate business logic towards the infrastructure layer.
- **Important:** Only the implementation of use cases should exist in this layer.

### Domain Layer

- The innermost layer of the application, defining its core.
- In this layer, ports (interfaces), domain services, DTOs (data transfer objects) responsible for transferring data between layers, entities, enums, errors, and validation objects are defined.

# Endpoints

### Seed Endpoint

- **Description:** Allows running the seed to load initial data into the database.
- **Method:** GET
- **Route:** `/seed`

## Technologies Used

- **Nest JS:** The programming language used to develop the API.
- **MongoDB:** NoSQL database used to store the application's information.
- **Redis:** Used for caching, improving the performance of frequent queries.

## Dependencies

- [Documentation of this rest Api in postman](https://www.postman.com/tyrcode/workspace/backend-for-front-end-go-nest-js)

## Scripts

### Running the Project

To run the project, use the following command:

```sh
npm run start
```

## Glossary

**Adapter:**
A component that enables the integration of the application with external systems or services, such as databases or third-party libraries, adapting the interface of these systems to the one used internally.

**DTO (Data Transfer Object):**
An object that transports data between different layers of the application. DTOs do not contain business logic nor are they coupled to any technology; they only store and transfer data.

**Enumeration (Enum):**
A data structure that defines a set of constant values under a specific name, used to represent a limited and predefined set of options.

**Entity:**
A domain object that has its own unique identity distinguishing it from other objects over time. It encapsulates data and behaviors related to that data, applying business rules over itself. Entities are responsible for ensuring the consistency and validity of their internal state through validation objects and internal validation processes. Besides validating their data, entities can contain business logic that allows them to interact with other entities and domain services, following the specific rules and policies of the domain. Entities are fundamental components in the domain layer and play a crucial role in implementing business rules and behaviors.

**Validation Object:**
An object that encapsulates data validation logic, ensuring that data meets certain criteria before being processed by the application.

**Dependency Injection:**
A design pattern where an object receives its dependencies from external sources rather than creating them internally, promoting inversion of control and facilitating code testing and maintenance.

**Port:**
An interface that defines a set of operations that can be performed by external components to interact with the business logic of the application, allowing the separation of implementation concerns.

**Repository:**
A design pattern that provides an abstraction over the data access layer, allowing storage, retrieval, and data management operations to be performed in a way decoupled from business logic.

**Domain Service:**
A component that encapsulates business logic not belonging to any particular entity. Domain services are used to implement operations involving multiple entities or that cannot be clearly attributed to a single entity. They provide methods that perform specific domain tasks and act as coordinators between entities and other domain objects. They are an essential part of the domain layer and help keep business logic centralized and organized, ensuring that domain rules are applied consistently throughout the application. Unlike application services, which focus on orchestrating and coordinating use cases, domain services are centered on pure business logic and its rules, without depending on infrastructure or implementation details.
