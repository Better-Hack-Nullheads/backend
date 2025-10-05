# API Documentation

## Overview
This API provides a comprehensive backend for managing various aspects including customer service interactions, document retrieval, and LLM (Large Language Model) responses. It offers functionalities to create, read, update, and delete customer service records, retrieve documents based on specific criteria, and manage LLM-generated content.

## Framework
This API is built with **NestJS**.

## Endpoints

### AppController
*   **GET /**
    *   Description: Retrieves a simple "Hello World" message.

### CustomerserviceController
*   **POST /customerservice**
    *   Description: Creates a new customer service record.
    *   Parameters:
        *   `body`: `CreateCustomerserviceDto` (required) - Data for creating the customer service record.
*   **GET /customerservice**
    *   Description: Retrieves all customer service records.
*   **GET /customerservice/:id**
    *   Description: Retrieves a single customer service record by its ID.
    *   Parameters:
        *   `param`: `id` (string, required) - The ID of the customer service record.
*   **PATCH /customerservice/:id**
    *   Description: Updates an existing customer service record by its ID.
    *   Parameters:
        *   `param`: `id` (string, required) - The ID of the customer service record to update.
        *   `body`: `UpdateCustomerserviceDto` (required) - Data for updating the customer service record.
*   **DELETE /customerservice/:id**
    *   Description: Deletes a customer service record by its ID.
    *   Parameters:
        *   `param`: `id` (string, required) - The ID of the customer service record to delete.

### DocumentController
*   **GET /documents/latest**
    *   Description: Retrieves the latest documents.
    *   Parameters:
        *   `query`: `limit` (string, optional) - The maximum number of latest documents to retrieve.
*   **GET /documents/run/:runId**
    *   Description: Retrieves documents associated with a specific run ID.
    *   Parameters:
        *   `param`: `runId` (string, required) - The ID of the run to retrieve documents for.
*   **GET /documents/count**
    *   Description: Retrieves the total count of documents.

### LlmResponseController
*   **POST /llm-response**
    *   Description: Creates a new LLM response record.
    *   Parameters:
        *   `body`: `CreateLlmResponseDto` (required) - Data for creating the LLM response.
*   **GET /llm-response**
    *   Description: Retrieves all LLM response records.
*   **GET /llm-response/:id**
    *   Description: Retrieves a single LLM response record by its ID.
    *   Parameters:
        *   `param`: `id` (string, required) - The ID of the LLM response record.
*   **PATCH /llm-response/:id**
    *   Description: Updates an existing LLM response record by its ID.
    *   Parameters:
        *   `param`: `id` (string, required) - The ID of the LLM response record to update.
        *   `body`: `UpdateLlmResponseDto` (required) - Data for updating the LLM response.
*   **DELETE /llm-response/:id**
    *   Description: Deletes an LLM response record by its ID.
    *   Parameters:
        *   `param`: `id` (string, required) - The ID of the LLM response record to delete.

## Services
This section describes the core business logic services.

### AppService
*   `getHello()`: Returns a simple "Hello World" string.

### CustomerserviceService
*   `create(createCustomerserviceDto: CreateCustomerserviceDto)`: Creates a new customer service record.
*   `findAll()`: Retrieves all customer service records.
*   `findOne(id: number)`: Retrieves a single customer service record by its ID.
*   `update(id: number, updateCustomerserviceDto: UpdateCustomerserviceDto)`: Updates an existing customer service record.
*   `remove(id: number)`: Deletes a customer service record.

### DocumentService
*   `getLatestDocuments(limit: number)`: Retrieves a specified number of the latest documents.
    *   Returns: `Promise<Documentation[]>`
*   `getDocumentsByRunId(runId: string)`: Retrieves documents associated with a given run ID.
    *   Returns: `Promise<Documentation[]>`
*   `getDocumentCount()`: Retrieves the total count of documents.
    *   Returns: `Promise<number>`

### LlmResponseService
*   `create(dto: CreateLlmResponseDto)`: Creates a new LLM response.
    *   Returns: `Promise<LlmResponse>`
*   `findAll()`: Retrieves all LLM responses.
    *   Returns: `Promise<LlmResponse[]>`
*   `findOne(id: string)`: Retrieves a single LLM response by its ID.
    *   Returns: `Promise<LlmResponse>`
*   `update(id: string, dto: UpdateLlmResponseDto)`: Updates an existing LLM response.
    *   Returns: `Promise<LlmResponse>`
*   `remove(id: string)`: Deletes an LLM response.
    *   Returns: `Promise<{ deleted: boolean }>`

## Types
This section documents the main data structures (DTOs and Schemas) used within the API. The detailed properties for some types are not available in the provided analysis but their purpose is inferred.

*   `CreateCustomerserviceDto`: Data Transfer Object for creating a new customer service record.
*   `UpdateCustomerserviceDto`: Data Transfer Object for updating an existing customer service record.
*   `CreateLlmResponseDto`: Data Transfer Object for creating a new LLM response.
*   `UpdateLlmResponseDto`: Data Transfer Object for updating an existing LLM response.
*   `DocumentationDocument`: Schema/interface representing a document. (Properties not detailed in analysis)
*   `LlmResponseDocument`: Schema/interface representing an LLM response. (Properties not detailed in analysis)