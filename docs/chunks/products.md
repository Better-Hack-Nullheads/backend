# API Documentation

## Overview
This API provides a backend solution for managing products and users. It allows for creating, retrieving, updating, and deleting product and user data, as well as specific user management actions like activation/deactivation.

## Framework
This API is built with **NestJS**, a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Endpoints
Below is a list of all available API routes, their HTTP methods, and a brief description of their functionality.

### General
*   **`GET /`**
    *   Returns a simple "Hello World" message.

### Products
**Base Path: `/products`**

*   **`POST /products`**
    *   **Description**: Creates a new product.
    *   **Request Body**: `CreateProductDto`
    *   **Handler**: `ProductsController.create`

*   **`GET /products`**
    *   **Description**: Retrieves a list of all products.
    *   **Handler**: `ProductsController.findAll`

*   **`GET /products/:id`**
    *   **Description**: Retrieves a single product by its ID.
    *   **Path Parameters**:
        *   `id` (string): The unique identifier of the product.
    *   **Handler**: `ProductsController.findOne`

*   **`PATCH /products/:id`**
    *   **Description**: Updates an existing product by its ID.
    *   **Path Parameters**:
        *   `id` (string): The unique identifier of the product.
    *   **Request Body**: `UpdateProductDto`
    *   **Handler**: `ProductsController.update`

*   **`DELETE /products/:id`**
    *   **Description**: Deletes a product by its ID.
    *   **Path Parameters**:
        *   `id` (string): The unique identifier of the product.
    *   **Handler**: `ProductsController.remove`

### Users
**Base Path: `/users`**

*   **`POST /users`**
    *   **Description**: Creates a new user.
    *   **Request Body**: `CreateUserDto`
    *   **Handler**: `UsersController.create`

*   **`GET /users`**
    *   **Description**: Retrieves a list of all users. Can filter by role.
    *   **Query Parameters**:
        *   `role` (string, optional): Filter users by their role.
    *   **Handler**: `UsersController.findAll`

*   **`GET /users/:id`**
    *   **Description**: Retrieves a single user by their ID.
    *   **Path Parameters**:
        *   `id` (string): The unique identifier of the user.
    *   **Handler**: `UsersController.findOne`

*   **`GET /users/email/:email`**
    *   **Description**: Retrieves a single user by their email address.
    *   **Path Parameters**:
        *   `email` (string): The email address of the user.
    *   **Handler**: `UsersController.findByEmail`

*   **`PATCH /users/:id`**
    *   **Description**: Updates an existing user by their ID.
    *   **Path Parameters**:
        *   `id` (string): The unique identifier of the user.
    *   **Request Body**: `UpdateUserDto`
    *   **Handler**: `UsersController.update`

*   **`PATCH /users/:id/deactivate`**
    *   **Description**: Deactivates a user account by their ID.
    *   **Path Parameters**:
        *   `id` (string): The unique identifier of the user.
    *   **Handler**: `UsersController.deactivate`

*   **`PATCH /users/:id/activate`**
    *   **Description**: Activates a user account by their ID.
    *   **Path Parameters**:
        *   `id` (string): The unique identifier of the user.
    *   **Handler**: `UsersController.activate`

*   **`DELETE /users/:id`**
    *   **Description**: Deletes a user by their ID.
    *   **Path Parameters**:
        *   `id` (string): The unique identifier of the user.
    *   **Handler**: `UsersController.remove`

## Services
Services encapsulate the business logic and interact with data sources.

### `ProductsService`
Manages product-related operations.

*   **`create(createProductDto: CreateProductDto): Product`**
    *   Creates a new product record in the database.
*   **`findAll(): Product[]`**
    *   Retrieves all product records.
*   **`findOne(id: string): Product | undefined`**
    *   Finds a single product by its unique identifier. Returns `undefined` if not found.
*   **`update(id: string, updateProductDto: UpdateProductDto): Product | undefined`**
    *   Updates an existing product identified by `id` with the provided data. Returns the updated product or `undefined` if not found.
*   **`remove(id: string): boolean`**
    *   Deletes a product identified by `id`. Returns `true` if successful, `false` otherwise.

## Types
This section documents the main data structures (DTOs - Data Transfer Objects, and Entities) used across the API.

### `CreateProductDto`
Used for creating new product entries.
```typescript
interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  // ... other fields needed for product creation
}
```

### `UpdateProductDto`
Used for updating existing product entries. All fields are typically optional for partial updates.
```typescript
interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  // ... other updatable fields
}
```

### `Product`
Represents a product entity in the system.
```typescript
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  // ... other product-specific fields
}
```

### `CreateUserDto`
Used for creating new user entries.
```typescript
interface CreateUserDto {
  username: string;
  email: string;
  password?: string; // Password might be hashed before storage
  role: 'admin' | 'user' | 'guest';
  // ... other fields needed for user creation
}
```

### `UpdateUserDto`
Used for updating existing user entries. All fields are typically optional for partial updates.
```typescript
interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user' | 'guest';
  isActive?: boolean;
  // ... other updatable fields
}
```

### `User`
Represents a user entity in the system.
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // ... other user-specific fields
}
```