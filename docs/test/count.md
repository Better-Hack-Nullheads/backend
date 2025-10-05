# API Documentation

## Overview
This API provides a backend solution for managing customer service interactions, document processing, and LLM (Large Language Model) responses. It offers endpoints to create, retrieve, update, and delete customer service records, access document-related data (including latest documents and counts), and manage LLM responses.

## Framework
This API is built with **NestJS**.

## Endpoints

### AppController
*   **GET /**
    *   Retrieves a simple "Hello World" message.

### CustomerserviceController
*   **POST /customerservice**
    *   Creates a new customer service record.
    *   **Body**: `createCustomerserviceDto: CreateCustomerserviceDto`
*   **GET /customerservice**
    *   Retrieves all customer service records.
*   **GET /customerservice/:id**
    *   Retrieves a single customer service record by its ID.
    *   **Parameters**:
        *   `id` (`string`) - `@Param` (Required)
*   **PATCH /customerservice/:id**
    *   Updates an existing customer service record by its ID.
    *   **Parameters**:
        *   `id` (`string`) - `@Param` (Required)
    *   **Body**: `updateCustomerserviceDto: UpdateCustomerserviceDto`
*   **DELETE /customerservice/:id**
    *   Deletes a customer service record by its ID.
    *   **Parameters**:
        *   `id` (`string`) - `@Param` (Required)

### DocumentController
*   **GET /documents/latest**
    *   Retrieves the latest documents.
    *   **Parameters**:
        *   `limit` (`string`) - `@Query` (Optional) - Specifies the maximum number of documents to return.
*   **GET /documents/run/:runId**
    *   Retrieves documents associated with a specific run ID.
    *   **Parameters**:
        *   `runId` (`string`) - `@Param` (Required)
*   **GET /documents/count**
    *   Retrieves the total count of documents.

### LlmResponseController
*   **POST /llm-response**
    *   Creates a new LLM response record.
    *   **Body**: `dto: CreateLlmResponseDto`
*   **GET /llm-response**
    *   Retrieves all LLM response records.
*   **GET /llm-response/:id**
    *   Retrieves a single LLM response record by its ID.
    *   **Parameters**:
        *   `id` (`string`) - `@Param` (Required)
*   **PATCH /llm-response/:id**
    *   Updates an existing LLM response record by its ID.
    *   **Parameters**:
        *   `id` (`string`) - `@Param` (Required)
    *   **Body**: `dto: UpdateLlmResponseDto`
*   **DELETE /llm-response/:id**
    *   Deletes an LLM response record by its ID.
    *   **Parameters**:
        *   `id` (`string`) - `@Param` (Required)

## Services
This section describes the core business logic services.

### AppService
Handles basic application functionality.
*   `getHello(): string` - Returns a greeting message.

### CustomerserviceService
Manages the business logic for customer service records.
*   `create(createCustomerserviceDto: CreateCustomerserviceDto)` - Creates a new customer service record.
*   `findAll()` - Retrieves all customer service records.
*   `findOne(id: number)` - Retrieves a single customer service record by ID.
*   `update(id: number, updateCustomerserviceDto: UpdateCustomerserviceDto)` - Updates an existing customer service record.
*   `remove(id: number)` - Deletes a customer service record.

### DocumentService
Provides operations for managing and retrieving documents.
*   `getLatestDocuments(limit: number): Promise<Documentation[]>` - Fetches the most recent documents, with an optional limit.
*   `getDocumentsByRunId(runId: string): Promise<Documentation[]>` - Retrieves documents associated with a specific run identifier.
*   `getDocumentCount(): Promise<number>` - Returns the total number of documents.

### LlmResponseService
Manages the business logic for LLM response records.
*   `create(dto: CreateLlmResponseDto): Promise<LlmResponse>` - Creates a new LLM response.
*   `findAll(): Promise<LlmResponse[]>` - Retrieves all LLM responses.
*   `findOne(id: string): Promise<LlmResponse>` - Retrieves a single LLM response by ID.
*   `update(id: string, dto: UpdateLlmResponseDto): Promise<LlmResponse>` - Updates an existing LLM response.
*   `remove(id: string): Promise<{ deleted: boolean }>` - Deletes an LLM response.

## Types
This section documents the main data structures (DTOs and Schemas) used across the API.

### CreateCustomerserviceDto
Data Transfer Object for creating a new customer service record. (Properties not explicitly provided in analysis data)

### UpdateCustomerserviceDto
Data Transfer Object for updating an existing customer service record. (Properties not explicitly provided in analysis data)

### CreateLlmResponseDto
Data Transfer Object for creating a new LLM response record. (Properties not explicitly provided in analysis data)

### UpdateLlmResponseDto
Data Transfer Object for updating an existing LLM response record. (Properties not explicitly provided in analysis data)

### DocumentationDocument
Represents a document in the system. (Properties not explicitly provided in analysis data)

### LlmResponseDocument
Represents an LLM response record. (Properties not explicitly provided in analysis data)