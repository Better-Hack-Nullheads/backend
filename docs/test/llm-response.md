# API Documentation

## Overview
This API provides a comprehensive set of functionalities for managing LLM (Large Language Model) responses, customer service interactions, and document retrieval. It supports CRUD operations for LLM responses and customer service records, as well as specialized endpoints for querying document data.

## Framework
This API is built with **NestJS**.

## Endpoints
The following endpoints are available:

### General
*   **GET `/`**
    *   **Description**: Basic health check or welcome message endpoint.
    *   **Handler**: `AppController.getHello`
    *   **Parameters**: None

### LLM Responses
*   **POST `/llm-response`**
    *   **Description**: Creates a new LLM response record.
    *   **Handler**: `LlmResponseController.create`
    *   **Parameters**:
        *   `@Body() dto`: `CreateLlmResponseDto` (Required) - Data for creating the LLM response.
*   **GET `/llm-response`**
    *   **Description**: Retrieves a list of all LLM responses.
    *   **Handler**: `LlmResponseController.findAll`
    *   **Parameters**: None
*   **GET `/llm-response/:id`**
    *   **Description**: Retrieves a single LLM response by its ID.
    *   **Handler**: `LlmResponseController.findOne`
    *   **Parameters**:
        *   `@Param('id') id`: `string` (Required) - The unique identifier of the LLM response.
*   **PATCH `/llm-response/:id`**
    *   **Description**: Updates an existing LLM response by its ID.
    *   **Handler**: `LlmResponseController.update`
    *   **Parameters**:
        *   `@Param('id') id`: `string` (Required) - The unique identifier of the LLM response.
        *   `@Body() dto`: `UpdateLlmResponseDto` (Required) - Data for updating the LLM response.
*   **DELETE `/llm-response/:id`**
    *   **Description**: Deletes an LLM response by its ID.
    *   **Handler**: `LlmResponseController.remove`
    *   **Parameters**:
        *   `@Param('id') id`: `string` (Required) - The unique identifier of the LLM response.

### Customer Service
*   **POST `/customerservice`**
    *   **Description**: Creates a new customer service record.
    *   **Handler**: `CustomerserviceController.create`
    *   **Parameters**:
        *   `@Body() createCustomerserviceDto`: `CreateCustomerserviceDto` (Required) - Data for creating the customer service record.
*   **GET `/customerservice`**
    *   **Description**: Retrieves a list of all customer service records.
    *   **Handler**: `CustomerserviceController.findAll`
    *   **Parameters**: None
*   **GET `/customerservice/:id`**
    *   **Description**: Retrieves a single customer service record by its ID.
    *   **Handler**: `CustomerserviceController.findOne`
    *   **Parameters**:
        *   `@Param('id') id`: `string` (Required) - The unique identifier of the customer service record.
*   **PATCH `/customerservice/:id`**
    *   **Description**: Updates an existing customer service record by its ID.
    *   **Handler**: `CustomerserviceController.update`
    *   **Parameters**:
        *   `@Param('id') id`: `string` (Required) - The unique identifier of the customer service record.
        *   `@Body() updateCustomerserviceDto`: `UpdateCustomerserviceDto` (Required) - Data for updating the customer service record.
*   **DELETE `/customerservice/:id`**
    *   **Description**: Deletes a customer service record by its ID.
    *   **Handler**: `CustomerserviceController.remove`
    *   **Parameters**:
        *   `@Param('id') id`: `string` (Required) - The unique identifier of the customer service record.

### Documents
*   **GET `/documents/latest`**
    *   **Description**: Retrieves the most recent documents, optionally limited by count.
    *   **Handler**: `DocumentController.getLatestDocuments`
    *   **Parameters**:
        *   `@Query('limit') limit`: `string` (Optional) - The maximum number of latest documents to retrieve.
*   **GET `/documents/run/:runId`**
    *   **Description**: Retrieves documents associated with a specific run ID.
    *   **Handler**: `DocumentController.getDocumentsByRunId`
    *   **Parameters**:
        *   `@Param('runId') runId`: `string` (Required) - The ID of the run to filter documents by.
*   **GET `/documents/count`**
    *   **Description**: Retrieves the total count of documents.
    *   **Handler**: `DocumentController.getDocumentCount`
    *   **Parameters**: None

## Services
Services encapsulate the business logic and interact with data sources.

### `AppService`
*   **Description**: Provides core application-level functionalities.
    *   `getHello()`: Returns a simple "Hello World!" or similar greeting string.

### `CustomerserviceService`
*   **Description**: Manages operations related to customer service records.
    *   `create(createCustomerserviceDto: CreateCustomerserviceDto)`: Creates a new customer service record.
    *   `findAll()`: Retrieves all customer service records.
    *   `findOne(id: number)`: Retrieves a single customer service record by its ID.
    *   `update(id: number, updateCustomerserviceDto: UpdateCustomerserviceDto)`: Updates an existing customer service record.
    *   `remove(id: number)`: Deletes a customer service record.

### `DocumentService`
*   **Description**: Handles data access and business logic for documents.
    *   `getLatestDocuments(limit: number)`: Retrieves the latest documents, with an optional limit. Returns `Promise<Documentation[]>`.
    *   `getDocumentsByRunId(runId: string)`: Retrieves documents filtered by a specific run ID. Returns `Promise<Documentation[]>`.
    *   `getDocumentCount()`: Returns the total number of documents. Returns `Promise<number>`.

### `LlmResponseService`
*   **Description**: Manages CRUD operations for LLM responses.
    *   `create(dto: CreateLlmResponseDto)`: Creates a new LLM response. Returns `Promise<LlmResponse>`.
    *   `findAll()`: Retrieves all LLM responses. Returns `Promise<LlmResponse[]>`.
    *   `findOne(id: string)`: Retrieves a single LLM response by ID. Returns `Promise<LlmResponse>`.
    *   `update(id: string, dto: UpdateLlmResponseDto)`: Updates an existing LLM response. Returns `Promise<LlmResponse>`.
    *   `remove(id: string)`: Deletes an LLM response. Returns `Promise<{ deleted: boolean }>`.

## Types
This section describes the main data structures (DTOs and Schemas) used within the API.

### Data Transfer Objects (DTOs)
These objects define the structure of data expected in request bodies for create and update operations.

*   **`CreateLlmResponseDto`**
    *   **Description**: Data structure for creating a new LLM response. (Specific properties not detailed in analysis)
*   **`UpdateLlmResponseDto`**
    *   **Description**: Data structure for updating an existing LLM response. (Specific properties not detailed in analysis)
*   **`CreateCustomerserviceDto`**
    *   **Description**: Data structure for creating a new customer service record. (Specific properties not detailed in analysis)
*   **`UpdateCustomerserviceDto`**
    *   **Description**: Data structure for updating an existing customer service record. (Specific properties not detailed in analysis)

### Database Schema Types
These types represent the structure of documents stored in the database.

*   **`DocumentationDocument`**
    *   **Description**: Represents a document in the `documents` collection. This is likely a Mongoose Document type or similar. (Specific properties not detailed in analysis)
*   **`LlmResponseDocument`**
    *   **Description**: Represents an LLM response document in the `llm-responses` collection. This is likely a Mongoose Document type or similar. (Specific properties not detailed in analysis)