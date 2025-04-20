# Assignment 6: User Authentication and Role-Based API

This is a **Node.js/Express.js** application implementing a user authentication system with role-based access control. The API supports user registration, login, profile management, and role updates, with security features like rate limiting, password hashing, and secure error handling.

---

## Features Implemented

### User Authentication

- Register users with `username`, `email`, `password`, and `role` (`user`, `moderator`, `admin`).
- Login with `username` and `password`, returning `JWT accessToken` (1-hour expiration) and `refreshToken` (7-day expiration).

### Role-Based Access Control

- **Public Route:** `/api/public` — Accessible to everyone.
- **Protected Route:** `/api/protected` — Requires authentication.
- **Moderator Route:** `/api/moderator` — Accessible to `moderator` and `admin` roles.
- **Admin Route:** `/api/admin` — Accessible to `admin` role only.
- **Profile Management:** `/api/profile` — Authenticated users can view and update their profile.
- **Role Update:** `/api/users/:id/role` — Admin-only endpoint to update a user's role.

### Security Features

- **Rate Limiting:** Limits `/api/register` and `/api/login` to 3 requests per 15 minutes per IP.
- **Hashed Passwords:** Passwords are hashed using `bcrypt` before storage.
- **Token Expiration:**
  - `accessToken`: 1 hour.
  - `refreshToken`: 7 days.

### Input Validation

- **Email format validation** using regex.
- **Password validation:** Minimum 8 characters, 1 number, 1 special character.
- **Role validation:** Must be `user`, `moderator`, or `admin`.

---

## Setup Instructions

### Installation

1. **Clone the Repository:**

```bash
git clone <repository-url>
cd Assignment6
```

2. **Install Dependencies:**
   Run:

```bash
npm install jsonwebtoken
npm install express
npm install bcryptjs
npm install dotenv
npm install dotenv
npm install express-rate-limit
```

3. **Set Up Environment Variables:**

Create a `.env` file:

```env
PORT=9090
JWT_SECRET = Mew
JWT_REFRESH_SECRET = MewMew
```

4. **Start the Server:**

```bash
node index.js
```

Server starts at: `http://localhost:9090`

---

## Testing Endpoints

Use Postman to test the API:

```
baseUrl = http://localhost:9090
```

### 1. `POST /api/register`

Registers a new user.

**Request:**

```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "Password123!",
  "role": "user"
}
```

**Response:**

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "$2b$10$i5Q5l4EUt/MU3rvh2qPnHubHbQ5rMHQdWHFhRLe4AWCV9vmnnZ8uO",
  "role": "user"
}
```

**Test Cases:**

- Invalid email or weak pasaword: `400 Bad Request` — `{ "error": "Recheck your email or password" }`
- Rate limit (after 5 requests): `429 Too Many Requests` — `{ "error": "Too many attempts, please try again later" }`

---

### 2. `POST /api/login`

Login to receive JWT tokens.

**Request:**

```json
{
  "username": "john_doe",
  "password": "Password123!"
}
```

**Response:**

```json
{ "accessToken": "...", "refreshToken": "..." }
```

---

### 3. `GET /api/public`

Accessible to everyone.

**Response:**

```json
{ "message": "This is a public route" }
```

---

### 4. `GET /api/protected`

Requires authentication.

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Response:**

```json
{ "message": "This is a protected route" }
```

---

### 5. `GET /api/moderator`

Accessible to `moderator` and `admin` roles.

**Headers:**

```
Authorization: Bearer {{moderatorToken}}
```

**Response:**

```json
{ "message": "This is a moderator route" }
```

---

### 6. `GET /api/admin`

Accessible to `admin` role only.

**Headers:**

```
Authorization: Bearer {{adminToken}}
```

**Response:**

```json
{ "message": "This is an admin route" }
```

---

### 7. `GET /api/profile`

View authenticated user profile.

**Headers:**

```
Authorization: Bearer {{userToken}}
```

**Response:**

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "<hashed>",
  "role": "user"
}
```

---

### 8. `PUT /api/profile`

Update email and/or password.

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{userToken}}
```

**Body:**

```json
{
  "id": 1,
  "email": "john.doe.new@example.com",
  "password": "NewPassword456@"
}
```

**Response:**

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john.doe.new@example.com",
  "password": "$2b$10$NjSUK/v3uNRYb2AjkOJMVem54EiQX7O/vOSF4xMKs4xjjxA0D66dW",
  "role": "user"
}
```

---

### 9. `PUT /api/users/:id/role`

Admin-only endpoint to update a user's role.

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{adminToken}}
```

**Body:**

```json
{
  "id": 1,
  "role": "moderator"
}
```

**Response:**

```json
{
  "id": 1,
  "username": "hell",
  "email": "john.doe.new@example.com",
  "password": "$2b$10$NjSUK/v3uNRYb2AjkOJMVem54EiQX7O/vOSF4xMKs4xjjxA0D66dW",
  "role": "moderator"
}
```
