# API Documentation

## Overview
This document provides an overview of the backend API, including its framework, available endpoints, business logic services, and data structures. It covers functionalities for managing users and products.

## Framework
This API is built with **NestJS**.

## Endpoints
Below is a list of all available routes, their HTTP methods, and a brief description of their purpose.

### AppController
Base path: `/`
*   **GET `/`**
    *   Returns a simple "Hello World!" message.

### ProductsController
Base path: `/products`
*   **POST `/products`**
    *   Creates a new product.
    *   **Body**: `CreateProductDto`
*   **GET `/products`**
    *   Retrieves a list of all products.
*   **GET `/products/:id`**
    *   Retrieves a single product by its ID.
    *   **Path Parameter**: `id` (string) - The ID of the product.
*   **PATCH `/products/:id`**
    *   Updates an existing product by its ID.
    *   **Path Parameter**: `id` (string) - The ID of the product.
    *   **Body**: `UpdateProductDto`
*   **DELETE `/products/:id`**
    *   Deletes a product by its ID.
    *   **Path Parameter**: `id` (string) - The ID of the product.

### UsersController
Base path: `/users`
*   **POST `/users`**
    *   Creates a new user.
    *   **Body**: `CreateUserDto`
*   **GET `/users`**
    *   Retrieves a list of all users.
    *   **Query Parameter (Optional)**: `role` (string) - Filters users by a specific role.
*   **GET `/users/:id`**
    *   Retrieves a single user by their ID.
    *   **Path Parameter**: `id` (string) - The ID of the user.
*   **GET `/users/email/:email`**
    *   Retrieves a single user by their email address.
    *   **Path Parameter**: `email` (string) - The email of the user.
*   **PATCH `/users/:id`**
    *   Updates an existing user by their ID.
    *   **Path Parameter**: `id` (string) - The ID of the user.
    *   **Body**: `UpdateUserDto`
*   **PATCH `/users/:id/deactivate`**
    *   Deactivates a user account by their ID.
    *   **Path Parameter**: `id` (string) - The ID of the user.
*   **PATCH `/users/:id/activate`**
    *   Activates a user account by their ID.
    *   **Path Parameter**: `id` (string) - The ID of the user.
*   **DELETE `/users/:id`**
    *   Deletes a user by their ID.
    *   **Path Parameter**: `id` (string) - The ID of the user.

## Services
Services encapsulate the business logic and interact with data sources.

### UsersService
Handles all operations related to user management.
*   `create(createUserDto: CreateUserDto)`: Creates a new user. Returns `User`.
*   `findAll()`: Retrieves all users. Returns `User[]`.
*   `findOne(id: string)`: Finds a user by their ID. Returns `User | undefined`.
*   `findByEmail(email: string)`: Finds a user by their email. Returns `User | undefined`.
*   `findByRole(role: string)`: Finds users by a specific role. Returns `User[]`.
*   `update(id: string, updateUserDto: UpdateUserDto)`: Updates a user by ID. Returns `User | undefined`.
*   `remove(id: string)`: Deletes a user by ID. Returns `boolean`.
*   `deactivate(id: string)`: Deactivates a user by ID. Returns `User | undefined`.
*   `activate(id: string)`: Activates a user by ID. Returns `User | undefined`.

## Types
This section describes the main data transfer objects (DTOs) and entity structures used across the API.

*   **`User`**
    *   Represents a user entity in the system. (e.g., id, name, email, role, isActive, etc.)
*   **`Product`**
    *   Represents a product entity in the system. (e.g., id, name, description, price, stock, etc.)
*   **`CreateUserDto`**
    *   Data transfer object for creating a new user. Contains the necessary fields for user creation.
*   **`UpdateUserDto`**
    *   Data transfer object for updating an existing user. Contains the fields that can be modified for a user.
*   **`CreateProductDto`**
    *   Data transfer object for creating a new product. Contains the necessary fields for product creation.
*   **`UpdateProductDto`**
    *   Data transfer object for updating an existing product. Contains the fields that can be modified for a product.