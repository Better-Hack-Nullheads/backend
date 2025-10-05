# API Documentation

## Overview
This API provides functionalities for managing customer service interactions, documents, and LLM responses. It allows for CRUD operations on customer service records and LLM responses, as well as retrieval of document information based on various criteria.

## Framework
This API is built with **NestJS**.

## Endpoints
Below is a list of all available API routes, their HTTP methods, and expected parameters.

### AppController
*   **GET /**
    *   **Description**: Returns a simple "Hello World" message.
    *   **Parameters**: None

### CustomerserviceController
*   **POST /customerservice**
    *   **Description**: Creates a new customer service record.
    *   **Parameters**:
        *   `body`: `CreateCustomerserviceDto` (Required) - Data for creating a new customer service entry.
*   **GET /customerservice**
    *   **Description**: Retrieves all customer service records.
    *   **Parameters**: None
*   **GET /customerservice/:id**
    *   **Description**: Retrieves a single customer service record by its ID.
    *   **Parameters**:
        *   `id`: `string` (Required, Path Parameter) - The ID of the customer service record.
*   **PATCH /customerservice/:id**
    *   **Description**: Updates an existing customer service record by its ID.
    *   **Parameters**:
        *   `id`: `string` (Required, Path Parameter) - The ID of the customer service record to update.
        *   `body`: `UpdateCustomerserviceDto` (Required) - Data for updating the customer service entry.
*   **DELETE /customerservice/:id**
    *   **Description**: Deletes a customer service record by its ID.
    *   **Parameters**:
        *   `id`: `string` (Required, Path Parameter) - The ID of the customer service record to delete.

### DocumentController
*   **