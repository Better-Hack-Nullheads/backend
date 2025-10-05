This documentation provides a comprehensive guide to the **Users API Module**, detailing its purpose, available endpoints, data models, and practical usage examples. This module is designed to manage user accounts within the system.

---

# Users API Module Documentation

## 1. Module Overview

The **Users API Module** is responsible for managing user-related data and operations within the application. It provides a set of RESTful endpoints to create, retrieve, and manage user profiles.

### Business Context and Use Cases

This module is fundamental for any application that requires user authentication, personalization, or tracking.
Typical use cases include:

*   **User Registration:** Allowing new users to create accounts.
*   **User Profile Management:** Retrieving individual user details for display or editing.
*   **User Directory/Administration:** Fetching a list of all registered users for administrative purposes or internal tools.
*   **Integration with other modules:** Providing user data to other parts of the system (e.g., orders, posts, comments).

### Key Features and Capabilities

*   **User Creation:** Register new user accounts with essential profile information.
*   **User Retrieval:** Fetch a list of all registered users or retrieve a specific user by their unique ID.
*   **Data Consistency:** Ensures user data adheres to defined schemas and validation rules.

---

## 2. Endpoint Documentation

All endpoints are prefixed with `/users`. Assume a base URL like `https://api.example.com/v1`.

### 2.1. Get All Users

Retrieves a list of all registered users in the system.

*   **Endpoint:** `GET /users`
*   **Summary:** Get all users
*   **Description:** Returns an array of `User` objects.
*   **Tags:** `users`

#### Parameters

None.

#### Responses

*   **`200 OK`**:
    *   **Description:** List of users.
    *   **Content Type:** `application/json`
    *   **Schema:** `Array` of `User` objects.

#### Request Example

```http
GET /users HTTP/1.1
Host: api.example.com/v1
```

#### Response Example (200 OK)

```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "firstName": "Alice",
    "lastName": "Smith",
    "email": "alice.smith@example.com"
  },
  {
    "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
    "firstName": "Bob",
    "lastName": "Johnson",
    "email": "bob.johnson@example.com"
  }
]
```

---

### 2.2. Create a New User

Registers a new user account in the system.

*   **Endpoint:** `POST /users`
*   **Summary:** Create a new user
*   **Description:** Creates a new user based on the provided `CreateUserDto` payload.
*   **Tags:** `users`

#### Parameters

*   **Request Body:** `CreateUserDto`
    *   **Content Type:** `application/json`
    *   **Description:** The user details to create.

#### Responses

*   **`201 Created`**:
    *   **Description:** User created successfully.
    *   **Content Type:** `application/json`
    *   **Schema:** The newly created `User` object.
*   **`400 Bad Request`**:
    *   **Description:** Invalid input provided (e.g., missing required fields, invalid email format).
    *   **Content Type:** `application/json`
    *   **Example Body:**
        ```json
        {
          "statusCode": 400,
          "message": [
            "email must be an email",
            "firstName should not be empty"
          ],
          "error": "Bad Request"
        }
        ```

#### Request Example

```http
POST /users HTTP/1.1
Host: api.example.com/v1
Content-Type: application/json

{
  "firstName": "Charlie",
  "lastName": "Brown",
  "email": "charlie.brown@example.com"
}
```

#### Response Example (201 Created)

```json
{
  "id": "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
  "firstName": "Charlie",
  "lastName": "Brown",
  "email": "charlie.brown@example.com"
}
```

---

### 2.3. Get User by ID

Retrieves a single user's details by their unique identifier.

*   **Endpoint:** `GET /users/{id}`
*   **Summary:** Get user by ID
*   **Description:** Returns a single `User` object matching the provided ID.
*   **Tags:** `users`

#### Parameters

*   **`id`** (Path Parameter)
    *   **Type:** `string`
    *   **Description:** The unique identifier of the user.
    *   **Required:** Yes

#### Responses

*   **`200 OK`**:
    *   **Description:** User found.
    *   **Content Type:** `application/json`
    *   **Schema:** A `User` object.
*   **`404 Not Found`**:
    *   **Description:** User with the specified ID was not found.
    *   **Content Type:** `application/json`
    *   **Example Body:**
        ```json
        {
          "statusCode": 404,
          "message": "User with ID 'non-existent-id' not found",
          "error": "Not Found"
        }
        ```

#### Request Example

```http
GET /users/a1b2c3d4-e5f6-7890-1234-567890abcdef HTTP/1.1
Host: api.example.com/v1
```

#### Response Example (200 OK)

```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice.smith@example.com"
}
```

---

## 3. Code Examples

This section provides practical examples for interacting with the Users API using cURL and TypeScript/JavaScript.

### 3.1. cURL Examples

#### Get All Users

```bash
curl -X GET 'https://api.example.com/v1/users' \
  -H 'Accept: application/json'
```

#### Create a New User

```bash
curl -X POST 'https://api.example.com/v1/users' \
  -H 'Content-Type: application/json' \
  -d '{
        "firstName": "Charlie",
        "lastName": "Brown",
        "email": "charlie.brown@example.com"
      }'
```

#### Get User by ID

```bash
curl -X GET 'https://api.example.com/v1/users/a1b2c3d4-e5f6-7890-1234-567890abcdef' \
  -H 'Accept: application/json'
```

### 3.2. TypeScript/JavaScript Examples (using `fetch`)

```typescript
const BASE_URL = 'https://api.example.com/v1';

// ------------------------------------
// Get All Users
// ------------------------------------
async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    console.log('All Users:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// ------------------------------------
// Create a New User
// ------------------------------------
interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
}

async function createUser(userData: CreateUserDto) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const newUser = await response.json();
    console.log('New User Created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// ------------------------------------
// Get User by ID
// ------------------------------------
async function getUserById(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }
    const user = await response.json();
    console.log(`User with ID ${id}:`, user);
    return user;
  } catch (error) {
    console.error(`Error fetching user by ID ${id}:`, error);
  }
}

// Example Usage:
(async () => {
  console.log('--- Fetching all users ---');
  await getAllUsers();

  console.log('\n--- Creating a new user ---');
  const newUser = await createUser({
    firstName: 'Diana',
    lastName: 'Prince',
    email: 'diana.prince@example.com',
  });

  if (newUser) {
    console.log('\n--- Fetching the newly created user ---');
    await getUserById(newUser.id);
  }

  console.log('\n--- Attempting to fetch a non-existent user ---');
  await getUserById('non-existent-id');

  console.log('\n--- Attempting to create user with invalid data ---');
  await createUser({
    firstName: 'Invalid',
    lastName: '', // Missing required field
    email: 'not-an-email', // Invalid email format
  });
})();
```

### 3.3. Integration Patterns

Client applications typically integrate with the Users API by:

1.  **Direct API Calls:** Frontend applications (e.g., React, Angular, Vue.js) or mobile apps can directly call these endpoints to manage user data.
2.  **Backend-for-Frontend (BFF):** A dedicated backend service might aggregate or transform data from this API before serving it to the frontend, adding an extra layer of abstraction or security.
3.  **Microservices Communication:** Other backend microservices might call the Users API to retrieve or update user information as part of their business logic (e.g., an "Orders" service fetching customer details).
4.  **Error Handling:** Implement robust error handling on the client-side to gracefully manage API failures, such as network issues, invalid input (400 Bad Request), or resource not found (404 Not Found).

---

## 4. Data Models

This section defines the structure and validation rules for the data objects used within the Users API.

### 4.1. User Model

The `User` model represents a registered user in the system.

*   **Description:** Represents a user profile.
*   **Type:** `object`

#### TypeScript Interface

```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
```

#### JSON Schema

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier for the user."
    },
    "firstName": {
      "type": "string",
      "description": "The user's first name."
    },
    "lastName": {
      "type": "string",
      "description": "The user's last name."
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "The user's email address, must be a valid email format."
    }
  },
  "