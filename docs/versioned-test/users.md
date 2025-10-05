This document provides comprehensive technical documentation for the **Users API Module**. It outlines the module's purpose, capabilities, detailed endpoint specifications, request/response examples, and data models.

---

# Users API Module Documentation

## Module Overview

The Users API module is a core component responsible for managing user accounts and profiles within the system. It provides a robust interface for creating, retrieving, and potentially updating or deleting user information, serving as the foundation for user authentication, personalization, and administrative features.

### Business Context and Use Cases
This module is essential for any application that requires user interaction. Typical use cases include:
*   **User Registration:** Allowing new users to sign up for the service.
*   **User Profile Management:** Enabling users or administrators to view individual user details.
*   **User Directory:** Providing a list of all registered users for administrative purposes or internal system integrations.
*   **Authentication & Authorization Systems:** Serving as the data source for user identities.

### Key Features and Capabilities
*   **User Creation:** Register new user accounts with essential profile information.
*   **User Retrieval (All):** Fetch a comprehensive list of all registered users.
*   **User Retrieval (By ID):** Obtain detailed information for a specific user using their unique identifier.

---

## Endpoint Documentation

This section details each API endpoint within the Users module, including its purpose, parameters, expected responses, and practical code examples.

### 1. Get All Users

Retrieves a list of all registered user accounts.

*   **Summary:** Get all users
*   **HTTP Method:** `GET`
*   **Path:** `/users`
*   **Description:** This endpoint returns an array containing all user objects currently stored in the system.

#### Parameters
None.

#### Responses

*   **`200 OK`**
    *   **Description:** A list of user objects.
    *   **Content Type:** `application/json`
    *   **Schema:** `Array<User>`
    *   **Example Payload:**
        ```json
        [
          {
            "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "jane.doe@example.com"
          },
          {
            "id": "f1e2d3c4-b5a6-0987-6543-210fedcba987",
            "firstName": "John",
            "lastName": "Smith",
            "email": "john.smith@example.com"
          }
        ]
        ```

#### Code Examples

**cURL**
```bash
curl -X GET "http://localhost:3000/users" \
     -H "Accept: application/json"
```

**TypeScript/JavaScript (Fetch API)**
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();
    console.log('All Users:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Example usage:
getAllUsers();
```

---

### 2. Create a New User

Registers a new user account in the system.

*   **Summary:** Create a new user
*   **HTTP Method:** `POST`
*   **Path:** `/users`
*   **Description:** This endpoint allows for the creation of a new user record. The request body must contain the necessary user details as defined by the `CreateUserDto` data model.

#### Parameters
None (request body is used).

#### Request Body

*   **Content Type:** `application/json`
*   **Schema:** `CreateUserDto`
*   **Example Payload:**
    ```json
    {
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice.johnson@example.com"
    }
    ```

#### Responses

*   **`201 Created`**
    *   **Description:** The newly created user object, including its assigned ID.
    *   **Content Type:** `application/json`
    *   **Schema:** `User`
    *   **Example Payload:**
        ```json
        {
          "id": "c1d2e3f4-a5b6-7890-1122-334455667788",
          "firstName": "Alice",
          "lastName": "Johnson",
          "email": "alice.johnson@example.com"
        }
        ```

*   **`400 Bad Request`**
    *   **Description:** If the request body is invalid (e.g., missing required fields, invalid email format).
    *   **Example Payload:**
        ```json
        {
          "statusCode": 400,
          "message": [
            "email must be an email"
          ],
          "error": "Bad Request"
        }
        ```

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

**TypeScript/JavaScript (Fetch API)**
```typescript
async function createUser(userData: { firstName: string; lastName: string; email: string }) {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(errorData)}`);
    }

    const newUser = await response.json();
    console.log('New User Created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Example usage:
createUser({
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice.johnson@example.com"
});
```

---

### 3. Get User by ID

Retrieves details for a specific user using their unique identifier.

*   **Summary:** Get user by ID
*   **HTTP Method:** `GET`
*   **Path:** `/users/{id}`
*   **Description:** This endpoint fetches the detailed profile of a single user identified by their unique `id`.

#### Parameters

| Name | Type     | Required | Description                                  |
| :--- | :------- | :------- | :------------------------------------------- |
| `id` | `string` | Yes      | The unique identifier of the user to retrieve. |

#### Responses

*   **`200 OK`**
    *   **Description:** The user object corresponding to the provided ID.
    *   **Content Type:** `application/json`
    *   **Schema:** `User`
    *   **Example Payload:**
        ```json
        {
          "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
          "firstName": "Jane",
          "lastName": "Doe",
          "email": "jane.doe@example.com"
        }
        ```

*   **`404 Not Found`**
    *   **Description:** If no user with the specified `id` exists.
    *   **Example Payload:**
        ```json
        {
          "statusCode": 404,
          "message": "User with ID 'non-existent-id' not found",
          "error": "Not Found"
        }
        ```

#### Code Examples

**cURL**
```bash
curl -X GET "http://localhost:3000/users/a1b2c3d4-e5f6-7890-1234-567890abcdef" \
     -H "Accept: application/json"
```

**TypeScript/JavaScript (Fetch API)**
```typescript
async function getUserById(userId: string) {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.status === 404) {
      console.warn(`User with ID ${userId} not found.`);
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const user = await response.json();
    console.log(`User ${userId}:`, user);
    return user;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
  }
}

// Example usage:
getUserById("a1b2c3d4-e5f6-7890-1234-567890abcdef");
getUserById("non-existent-id"); // To demonstrate 404 handling
```

---

## Data Models

This section defines the data structures used by the Users API module.

### User

Represents a registered user within the system.

*   **Description:** The complete profile of a user, including their unique identifier.
*   **Type:** `object`

#### Type Definition (TypeScript)
```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
```

#### Schema and Validation Rules

| Property  | Type     | Required | Description                     | Validation Rules                               |
| :-------- | :------- | :------- | :------------------------------ | :--------------------------------------------- |
| `id`      | `string` | Yes      | The unique identifier for the user. | Auto-generated, typically a UUID.            |
| `firstName` | `string` | Yes      | The user's first name.          | Must be a non-empty string.                    |
| `lastName`  | `string` | Yes      | The user's last name.           | Must be a non-empty string.                    |
| `email`     | `string` | Yes      | The user's email address.       | Must be a valid email format (e.g., `user@domain.com`). |

#### Example Payload
```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com"
}
```

---

### CreateUserDto

Data transfer object used for creating a new user. It contains all necessary fields for user registration, excluding the system-generated `id`.

*   **Description:** The data structure for providing user details when creating a new user.
*   **Type:** `object`

#### Type Definition (TypeScript)
```typescript
interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
}
```

#### Schema and Validation Rules

| Property  | Type     | Required | Description                     | Validation Rules                               |
| :-------- | :------- | :------- | :------------------------------ | :--------------------------------------------- |
| `firstName` | `string` | Yes      | The user's first name.          | Must be a non-empty string.                    |
| `lastName`  | `string` | Yes      | The user's last name.           | Must be a non-empty string.                    |
| `email`     | `string` | Yes      | The user's email address.       | Must be a valid email format (e.g., `user@domain.com`). |

#### Example Payload
```json
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice.johnson@example.com"
}
```