# Library Management System

## 1. Project Overview

A RESTful API for managing a library system built with Node.js and Express. It supports two roles — **librarian** and **member**. Librarians can manage books and members, while members can borrow and return books and view their history.

---

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js v5 | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT (jsonwebtoken) | Authentication |
| bcrypt | Password hashing |
| Zod | Request validation |
| dotenv | Environment variable management |
| cors | Cross-origin resource sharing |
| lodash | Utility functions |
| nodemon | Development auto-restart |

---

## 3. Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (see [Environment Variables](#4-environment-variables))

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 4. Environment Variables

Create a `.env` file in the root of the project with the following variables:

```env
PORT=3000
URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=<your_jwt_secret>
```

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on |
| `URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

---

## 5. Database Setup

This project uses **MongoDB** (via MongoDB Atlas or local instance).

- Models:
  - `User` — stores user info with role (`member` or `librarian`)
  - `Book` — stores book details
  - `Borrow` — tracks borrow and return records

To use MongoDB Atlas:
1. Create a free cluster at [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Whitelist your IP address
3. Create a database user
4. Copy the connection string and set it as the `URI` in your `.env` file

---

## 6. API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |

### Book Routes — `/api/books`

| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/books` | Get all books | Any authenticated user |
| GET | `/api/books/:id` | Get a book by ID | Any authenticated user |
| POST | `/api/books` | Create a new book | Librarian |
| PUT | `/api/books/:id` | Update a book | Librarian |
| DELETE | `/api/books/:id` | Delete a book | Librarian |
| POST | `/api/books/:id/borrow` | Borrow a book | Member |
| POST | `/api/books/:id/return` | Return a book | Member |

### Member Routes — `/api/members`

| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/members` | Get all members | Librarian |
| DELETE | `/api/members/:id` | Delete a member | Librarian |
| GET | `/api/members/me/books` | Get my currently borrowed books | Member |
| GET | `/api/members/me/history` | Get my borrow history | Member |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check if the server is running |

---

## 7. Authentication Flow

This API uses **JWT (JSON Web Token)** based authentication.

1. **Register** — `POST /api/auth/register` with `name`, `email`, `password`, and `role`
2. **Login** — `POST /api/auth/login` with `email` and `password` → receives a `token`
3. **Access protected routes** — Include the token in the `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```
4. The token contains the user's `id` and `role`, which is used to authorize role-based access (`librarian` or `member`)

---

## 8. Deployment URL

> _Add your deployment URL here once deployed._

```
https://<your-deployment-url>
```

---

## 9. Postman Collection

You can view and test all endpoints using the Postman documentation:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/44009918/2sBXwyG7Kn)
