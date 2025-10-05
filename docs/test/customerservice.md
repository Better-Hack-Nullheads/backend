# API Documentation for Backend Services

## Overview
This API provides a suite of backend services for managing customer service interactions, handling documents, and processing responses from Large Language Models (LLMs). It offers a RESTful interface to create, retrieve, update, and delete resources across these domains.

## Framework
This API is built with **NestJS**.

## Endpoints
The following endpoints are available:

### Customer Service
*   **POST** `/customerservice`
    *   **Description**: Creates a new customer service entry.
    *   **Parameters**:
        *   `createCustomerserviceDto` (Type: `CreateCustomerserviceDto`, Source: Body, Required)
*   **GET** `/customerservice`
    *   **Description**: Retrieves all customer service entries.
    *   **Parameters**: None
*   **GET** `/customerservice/:id`
    *   **Description**: Retrieves a single customer service entry by ID.
    *   **Parameters**:
        *   `id` (Type: `string`, Source: Path, Required)
*   **PATCH** `/customerservice/:id`
    *   **Description**: Updates an existing customer service entry by ID.
    *   **Parameters**:
        *   `id` (Type: `string`, Source: Path, Required)
        *   `updateCustomerserviceDto` (Type: `UpdateCustomerserviceDto`, Source: Body, Required)
*   **DELETE** `/customerservice/:id`
    *   **Description**: Deletes a customer service entry by ID.
    *   **Parameters**:
        *   `id` (Type: `string`, Source: Path, Required)

### Documents
*   **GET** `/documents/latest`
    *   **Description**: Retrieves the latest documents.
    *   **Parameters**:
        *   `limit` (Type: `string`, Source: Query, Optional) - Maximum number of documents to retrieve.
*   **GET** `/documents/run/:runId`
    *   **Description**: Retrieves documents associated with a specific run ID.
    *   **Parameters**:
        *   `runId` (Type: `string`, Source: Path, Required)
*   **GET** `/documents/count`
    *   **Description**: Gets the total count of documents.
    *   **Parameters**: None

### LLM Responses
*   **POST** `/llm-response`
    *   **Description**: Creates a new LLM response entry.
    *   **Parameters**:
        *   `dto` (Type: `CreateLlmResponseDto`, Source: Body, Required)
*   **GET** `/llm-response`
    *   **Description**: Retrieves all LLM response entries.
    *   **Parameters**: None
*   **GET** `/llm-response/:id`
    *   **Description**: Retrieves a single LLM response entry by ID.
    *   **Parameters**:
        *   `id` (Type: `string`, Source: Path, Required)
*   **PATCH** `/llm-response/:id`
    *   **Description**: Updates an existing LLM response entry by ID.
    *   **Parameters**:
        *   `id` (Type: `string`, Source: Path, Required)
        *   `dto` (Type: `UpdateLlmResponseDto`, Source: Body, Required)
*   **DELETE** `/llm-response/:id`
    *   **Description**: Deletes an LLM response entry by ID.
    *   **Parameters**:
        *   `id` (Type: `string`, Source: Path, Required)

### General
*   **GET** `/`
    *   **Description**: Returns a simple "Hello World" message.
    *   **Parameters**: None

## Services
The core business logic is encapsulated in the following services:

### `AppService`
Provides basic application-level functionalities.
*   `getHello()`
    *   **Description**: Returns a greeting string.
    *   **Parameters**: None
    *   **Returns**: `string`

### `CustomerserviceService`
Manages the lifecycle of customer service entries.
*   `create(createCustomerserviceDto: CreateCustomerserviceDto)`
    *   **Description**: Creates a new customer service record.
    *   **Parameters**: `createCustomerserviceDto` (Type: `CreateCustomerserviceDto`, Required)
    *   **Returns**: `void`
*   `findAll()`
    *   **Description**: Retrieves all customer service records.
    *   **Parameters**: None
    *   **Returns**: `void`
*   `findOne(id: number)`
    *   **Description**: Retrieves a single customer service record by its ID.
    *   **Parameters**: `id` (Type: `number`, Required)
    *   **Returns**: `void`
*   `update(id: number, updateCustomerserviceDto: UpdateCustomerserviceDto)`
    *   **Description**: Updates an existing customer service record.
    *   **Parameters**: `id` (Type: `number`, Required), `updateCustomerserviceDto` (Type: `UpdateCustomerserviceDto`, Required)
    *   **Returns**: `void`
*   `remove(id: number)`
    *   **Description**: Deletes a customer service record by its ID.
    *   **Parameters**: `id` (Type: `number`, Required)
    *   **Returns**: `void`

### `DocumentService`
Handles operations related to documents.
*   `getLatestDocuments(limit: number)`
    *   **Description**: Fetches the most recent documents, optionally limited by count.
    *   **Parameters**: `limit` (Type: `number`, Required)
    *   **Returns**: `Promise<Documentation[]>`
*   `getDocumentsByRunId(runId: string)`
    *   **Description**: Retrieves all documents associated with a specific run identifier.
    *   **Parameters**: `runId` (Type: `string`, Required)
    *   **Returns**: `Promise<Documentation[]>`
*   `getDocumentCount()`
    *   **Description**: Returns the total number of documents.
    *   **Parameters**: None
    *   **Returns**: `Promise<number>`

### `LlmResponseService`
Manages the storage and retrieval of LLM responses.
*   `create(dto: CreateLlmResponseDto)`
    *   **Description**: Stores a new LLM response.
    *   **Parameters**: `dto` (Type: `CreateLlmResponseDto`, Required)
    *   **Returns**: `Promise<LlmResponse>`
*   `findAll()`
    *   **Description**: Retrieves all stored LLM responses.
    *   **Parameters**: None
    *   **Returns**: `Promise<LlmResponse[]>`
*   `findOne(id: string)`
    *   **Description**: Retrieves a single LLM response by its ID.
    *   **Parameters**: `id` (Type: `string`, Required)
    *   **Returns**: `Promise<LlmResponse>`
*   `update(id: string, dto: UpdateLlmResponseDto)`
    *   **Description**: Updates an existing LLM response record.
    *   **Parameters**: `id` (Type: `string`, Required), `dto` (Type: `UpdateLlmResponseDto`, Required)
    *   **Returns**: `Promise<LlmResponse>`
*   `remove(id: string)`
    *   **Description**: Deletes an LLM response record by its ID.
    *   **Parameters**: `id` (Type: `string`, Required)
    *   **Returns**: `Promise<{ deleted: boolean }>`

## Types
This section describes the data structures (DTOs and Schemas) used throughout the API.

*   `CreateCustomerserviceDto`
    *   **Description**: Data Transfer Object for creating a new customer service entry.
    *   **Properties**: (Structure not detailed in analysis data)
*   `UpdateCustomerserviceDto`
    *   **Description**: Data Transfer Object for updating an existing customer service entry.
    *   **Properties**: (Structure not detailed in analysis data)
*   `CreateLlmResponseDto`
    *   **Description**: Data Transfer Object for creating a new LLM response entry.
    *   **Properties**: (Structure not detailed in analysis data)
*   `UpdateLlmResponseDto`
    *   **Description**: Data Transfer Object for updating an existing LLM response entry.
    *   **Properties**: (Structure not detailed in analysis data)
*   `DocumentationDocument`
    *   **Description**: Represents a document entity, likely used for storage in a database.
    *   **Properties**: (Structure not detailed in analysis data)
*   `LlmResponseDocument`
    *   **Description**: Represents an LLM response entity, likely used for storage in a database.
    *   **Properties**: (Structure not detailed in analysis data)
*   `Documentation`
    *   **Description**: Represents a document. Used as return type in `DocumentService`.
    *   **Properties**: (Structure not detailed in analysis data, likely similar to `DocumentationDocument`)
*   `LlmResponse`
    *   **Description**: Represents an LLM response. Used as return type in `LlmResponseService`.
    *   **Properties**: (Structure not detailed in analysis data, likely similar to `LlmResponseDocument`)