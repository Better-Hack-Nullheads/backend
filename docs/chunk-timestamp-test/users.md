This documentation provides a comprehensive guide for interacting with the **Users API Module**. It covers the module's purpose, available endpoints, data models, and practical code examples for integration.

---

# Users API Module Documentation

## Table of Contents

1.  [Module Overview](#module-overview)
2.  [Endpoints](#endpoints)
    *   [`GET /users`](#get-users)
    *   [`POST /users`](#post-users)
    *   [`GET /users/{id}`](#get-usersid)
3.  [Data Models](#data-models)
    *   [`User`](#user-model)
    *   [`CreateUserDto`](#createuserdto-model)
4.  [Error Handling](#error-handling)
5.  [Integration Patterns](#integration-patterns)

---

## 1. Module Overview

The **Users API Module** is dedicated to managing user accounts within the system. It provides core functionalities for creating, retrieving, and listing user records.

**Business Context and Use Cases:**
This module is fundamental for any application requiring user management. Typical use cases include:
*   **User Registration:** Allowing new users to sign up for the service.
*   **Profile Management:** Retrieving and potentially updating user profile information.
*   **Directory Services:** Listing all active users for administrative or internal purposes.
*   **Authentication & Authorization:** Providing user details necessary for identity verification and access control.

**Key Features and Capabilities:**
*   **Retrieve All Users:** Fetch a complete list of registered users.
*   **Create New Users:** Register new user accounts with essential details.
*   **Retrieve User by ID:** Access specific user profiles using their unique identifier.

---

## 2. Endpoints

This section details each available endpoint, including its purpose, parameters, expected responses, and examples.

### `GET /users`

Retrieves a list of all registered users in the system.

*   **Summary:** Get all users
*   **Method:** `GET`
*   **Path:** `/users`
*   **Description:** This endpoint fetches an array of all user objects currently stored in the database.
*   **Tags:** `users`

#### Parameters

None.

#### Responses

*   **`200 OK`**: A list of `User` objects.

    ```json
    [
      {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
      },
      {
        "id": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@example.com"
      }
    ]
    ```

#### Code Examples

**cURL**

```bash
curl -X GET "http://localhost:3000/users" \
     -H "Accept: application/json"
```

**TypeScript/JavaScript (using `fetch`)**

```typescript
async function getAllUsers() {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    console.log('All Users:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Example usage:
// getAllUsers();
```

---

### `POST /users`

Creates a new user account.

*   **Summary:** Create a new user
*   **Method:** `POST`
*   **Path:** `/users`
*   **Description:** This endpoint allows for the creation of a new user by providing their first name, last name, and email.
*   **Tags:** `users`

#### Parameters

*   **Request Body (`application/json`)**: `CreateUserDto`

    | Name        | Type     | Required | Description                                     |
    | :---------- | :------- | :------- | :---------------------------------------------- |
    | `firstName` | `string` | Yes      | The first name of the user.                     |
    | `lastName`  | `string` | Yes      | The last name of the user.                      |
    | `email`     | `string` | Yes      | The email address of the user (must be unique). |

    **Example Request Body:**

    ```json
    {
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice.johnson@example.com"
    }
    ```

#### Responses

*   **`201 Created`**: The newly created `User` object.

    ```json
    {
      "id": "e6f5d4c3-b2a1-0987-6543-210fedcba987",
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice.johnson@example.com"
    }
    ```

*   **`400 Bad Request`**: If the request body is invalid (e.g., missing required fields, invalid email format).
*   **`409 Conflict`**: If a user with the provided email address already exists.

#### Code Examples

**cURL**

```bash
curl -X POST "http://localhost:3000/users" \
     -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     -d '{
           "firstName": "Alice",
           "lastName": "Johnson",
           "email": "alice.johnson@example.com"
         }'
```

**TypeScript/JavaScript (using `fetch`)**

```typescript
async function createUser(firstName: string, lastName: string, email: string) {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
    }

    const newUser = await response.json();
    console.log('New User Created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Example usage:
// createUser('Alice', 'Johnson', 'alice.johnson@example.com');
```

---

### `GET /users/{id}`

Retrieves the details of a single user by their unique ID.

*   **Summary:** Get user by ID
*   **Method:** `GET`
*   **Path:** `/users/{id}`
*   **Description:** This endpoint retrieves a specific user's information using their unique identifier.
*   **Tags:** `users`

#### Parameters

*   **Path Parameter**:

    | Name | Type     | Required | Description                               |
    | :--- | :------- | :------- | :---------------------------------------- |
    | `id` | `string` | Yes      | The unique identifier (UUID) of the user. |

#### Responses

*   **`200 OK`**: The `User` object matching the provided ID.

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
    ```

*   **`404 Not Found`**: If no user with the specified `id` exists.
*   **`400 Bad Request`**: If the `id` format is invalid (e.g., not a valid UUID).

#### Code Examples

**cURL**

```bash
curl -X GET "http://localhost:3000/users/a1b2c3d4-e5f6-7890-1234-567890abcdef" \
     -H "Accept: application/json"
```

**TypeScript/JavaScript (using `fetch`)**

```typescript
async function getUserById(userId: string) {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`User with ID ${userId} not found.`);
        return null; // Or throw a specific error
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    console.log(`User ${userId}:`, user);
    return user;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
}

// Example usage:
// getUserById('a1b2c3d4-e5f6-7890-1234-567890abcdef');
```

---

## 3. Data Models

This section defines the data structures (schemas) used by the Users API Module.

### `User` Model

Represents a user account in the system. This is the standard output format for user data.

*   **Type:** `object`
*   **Description:** The complete user profile with a unique identifier.

#### Properties

| Name        | Type     | Required | Description                                     | Validation Rules                                   |
| :---------- | :------- | :------- | :---------------------------------------------- | :------------------------------------------------- |
| `id`        | `string` | Yes      | The unique identifier (UUID) for the user.      | Must be a valid UUID.                              |
| `firstName` | `string` | Yes      | The user's first name.                          | Must be a non-empty string.                        |
| `lastName`  | `string` | Yes      | The user's last name.                           | Must be a non-empty string.                        |
| `email`     | `string` | Yes      | The user's email address.                       | Must be a valid email format and globally unique.  |

#### TypeScript Interface

```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
```

#### Example Payload

```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

---

### `CreateUserDto` Model

Represents the data transfer object used when creating a new user. It omits the