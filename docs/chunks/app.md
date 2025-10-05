# API Documentation

## Overview
This document provides an overview of the API, detailing its framework, available endpoints, business logic services, and core data structures. It serves as a guide for developers integrating with or maintaining this API.

## Framework
This API is built with **NestJS**, a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Endpoints
The following table lists all available API routes, their HTTP methods, and a brief description of their purpose and parameters.

### AppController
Base Path: `/`

| Method | Path | Description | Parameters |
| :----- | :--- | :---------- | :--------- |
| `GET` | `/` | Retrieves a simple welcome message from the API. | None |

### ProductsController
Base Path: `/products`

| Method | Path | Description | Parameters |
| :----- | :--- | :---------- | :--------- |
| `POST` | `/products` | Creates a new product. | `body`: `CreateProductDto` (required) - Product details to create. |
| `GET` | `/products` | Retrieves a list of all products. | None |
| `GET` | `/products/:id` | Retrieves a single product by its ID. | `param`: `id` (string, required) - The unique identifier of the product. |
| `PATCH` | `/products/:id` | Updates an existing product by its ID. | `param`: `id` (string, required) - The unique identifier of the product. <br> `body`: `UpdateProductDto` (required) - Partial product details to update. |
| `DELETE` | `/products/:id` | Deletes a product by its ID. | `param`: `id` (string, required) - The unique identifier of the product. |

### UsersController
Base Path: `/users`

| Method | Path | Description | Parameters |
| :----- | :--- | :---------- | :--------- |
| `POST` | `/users` | Creates a new user. | `body`: `CreateUserDto` (required) - User details to create. |
| `GET` | `/users` | Retrieves a list of all users. | `query`: `role` (string, optional) - Filters users by their role. |
| `GET` | `/users/:id` | Retrieves a single user by their ID. | `param`: `id` (string, required) - The unique identifier of the user. |
| `GET` | `/users/email/:email` | Retrieves a single user by their email address. | `param`: `email` (string, required) - The email address of the user. |
| `PATCH` | `/users/:id` | Updates an existing user by their ID. | `param`: `id` (string, required) - The unique identifier of the user. <br> `body`: `UpdateUserDto` (required) - Partial user details to update. |
| `PATCH` | `/users/:id/deactivate` | Deactivates a user account by their ID. | `param`: `id` (string, required) - The unique identifier of the user. |
| `PATCH` | `/users/:id/activate` | Activates a user account by their ID. | `param`: `id` (string, required) - The unique identifier of the user. |
| `DELETE` | `/users/:id` | Deletes a user by their ID. | `param`: `id` (string, required) - The unique identifier of the user. |

## Services
Services encapsulate the business logic and are responsible for data manipulation and interactions with external resources.

### AppService
Handles basic application-level logic.

*   **`getHello()`**:
    *   **Description**: Returns a simple "Hello World!" message.
    *   **Parameters**: None
    *   **Returns**: `string`

## Types
This section documents the main data types (Data Transfer Objects - DTOs) used for request bodies and responses within the API. The detailed structure of these types is typically defined in corresponding DTO files.

*   **`CreateProductDto`**
    *   **Description**: Data structure for creating a new product.
    *   **Used in**: `POST /products`

*   **`UpdateProductDto`**
    *   **Description**: Data structure for updating an existing product. Allows for partial updates.
    *   **Used in**: `PATCH /products/:id`

*   **`CreateUserDto`**
    *   **Description**: Data structure for creating a new user.
    *   **Used in**: `POST /users`

*   **`UpdateUserDto`**
    *   **Description**: Data structure for updating an existing user. Allows for partial updates.
    *   **Used in**: `PATCH /users/:id`

*(Note: The detailed fields for each DTO are not provided in the current analysis data, but would typically be documented here.)*