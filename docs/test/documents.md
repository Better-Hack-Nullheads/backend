# API Documentation

## Overview
This API provides a comprehensive set of functionalities for managing various aspects of a backend system. It includes modules for handling customer service interactions, retrieving and managing documents, and processing responses from Large Language Models (LLMs). The API supports standard CRUD operations for several entities and offers specific endpoints for document-related queries.

## Framework
This API is built with **NestJS**.

## Endpoints

### AppController
- `GET /`
  - **Description**: Returns a simple greeting, typically used for basic API health checks.
  - **Handler**: `getHello`
  - **Parameters**: None

### CustomerserviceController
- `POST /customerservice`
  - **Description**: Creates a new customer service record.
  - **Handler**: `create`
  - **Parameters**:
    - `body`: `CreateCustomerserviceDto` (required) - Data for creating the customer service record.
- `GET /customerservice`
  - **Description**: Retrieves a list of all customer service records.
  - **Handler**: `findAll`
  - **Parameters**: None
- `GET /customerservice/:id`
  - **Description**: Retrieves a single customer service record by its unique identifier.
  - **Handler**: `findOne`
  - **Parameters**:
    - `id`: `string` (path, required) - The ID of the customer service record.
- `PATCH /customerservice/:id`
  - **Description**: Updates an existing customer service record identified by its ID.
  - **Handler**: `update`
  - **Parameters**:
    - `id`: `string` (path, required) - The ID of the customer service record to update.
    - `body`: `UpdateCustomerserviceDto` (required) - Data for updating the customer service record.
- `DELETE /customerservice/:id`
  - **Description**: Deletes a customer service record by its unique identifier.
  - **Handler**: `remove`
  - **Parameters**:
    - `id`: `string` (path, required) - The ID of the customer service record to delete.

### DocumentController
- `GET /documents/latest`
  - **Description**: Retrieves the most recent documents, with an optional limit.
  - **Handler**: `getLatestDocuments`
  - **Parameters**:
    - `limit`: `string` (query, optional) - Specifies the maximum number of latest documents to return.
- `GET /documents/run/:runId`
  - **Description**: Retrieves all documents associated with a specific run ID.
  - **Handler**: `getDocumentsByRunId`
  - **Parameters**:
    - `runId`: `string` (path, required) - The identifier for the document run.
- `GET /documents/count`
  - **Description**: Returns the total number of documents available in the system.
  - **Handler**: `getDocumentCount`
  - **Parameters**: None

### LlmResponseController
- `POST /llm-response`
  - **Description**: Creates a new LLM response record.
  - **Handler**: `create`
  - **Parameters**:
    - `body`: `CreateLlmResponseDto` (required) - Data for creating the LLM response.
- `GET /llm-response`
  - **Description**: Retrieves a list of all LLM response records.
  - **Handler**: `findAll`
  - **Parameters**: None
- `GET /llm-response/:id`
  - **Description**: Retrieves a single LLM response record by its unique identifier.
  - **Handler**: `findOne`
  - **Parameters**:
    - `id`: `string` (path, required) - The ID of the LLM response record.
- `PATCH /llm-response/:id`
  - **Description**: Updates an existing LLM response record identified by its ID.
  - **Handler**: `update`
  - **Parameters**:
    - `id`: `string` (path, required) - The ID of the LLM response record to update.
    - `body`: `UpdateLlmResponseDto` (required) - Data for updating the LLM response.
- `DELETE /llm-response/:id`
  - **Description**: Deletes an LLM response record by its unique identifier.
  - **Handler**: `remove`
  - **Parameters**:
    - `id`: `string` (path, required) - The ID of the LLM response record to delete.

## Services

### AppService
- **`getHello()`**:
  - **Description**: Provides a basic "Hello World!" message to confirm API operational status.
  - **Returns**: `string`

### CustomerserviceService
- **`create(createCustomerserviceDto: CreateCustomerserviceDto)`**:
  - **Description**: Handles the business logic for creating a new customer service entry.
  - **Parameters**:
    - `createCustomerserviceDto`: `CreateCustomerserviceDto` - Data for the new record.
  - **Returns**: `void`
- **`findAll()`**:
  - **Description**: Fetches all customer service records from the data store.
  - **Parameters**: None
  - **Returns**: `void`
- **`findOne(id: number)`**:
  - **Description**: Retrieves a specific customer service record by its ID.