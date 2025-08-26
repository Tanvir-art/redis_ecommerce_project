# E-commerce Backend API

A scalable and robust **E-commerce backend system** built with **Node.js, TypeScript, Express, MongoDB, Redis, JWT authentication, and Multer for file uploads**. Designed to handle users, products, carts, and orders with access control, token-based authentication, and caching.

---

## 🛠 Tech Stack

- **Node.js** & **TypeScript** – Full type safety and modern JS features.
- **Express.js** – Web framework for building REST APIs.
- **MongoDB** + **Mongoose** – NoSQL database with schema validation.
- **Redis** – In-memory caching for frequently accessed data (products, carts).
- **JWT (jsonwebtoken)** – Authentication using Access & Refresh tokens.
- **bcrypt** – Password hashing for secure authentication.
- **Multer** – File upload handling (images for users/products).
- **CORS** – Cross-Origin Resource Sharing enabled.
- **Morgan** – HTTP request logger.
- **Zod** – Input validation (optional, schema validation for requests).

---

## 📦 Features

- **User Management**
  - Signup & Login with hashed passwords.
  - Role-based access control (`user`, `admin`).
  - Profile image upload with Multer.

- **Product Management**
  - CRUD operations for products.
  - Stock management.
  - Redis caching for frequently accessed products.

- **Cart & Order System**
  - Add/remove/update products in cart.
  - Place orders, automatically decreasing product stock.
  - Orders retrieval for users.

- **Authentication**
  - JWT-based access and refresh tokens.
  - Protected routes with role-based authorization.

- **Performance & Scalability**
  - Redis caching for products to reduce database load.
  - Modular code structure (Controllers → Services → Models → Routes).
  - TypeScript strict mode and proper type definitions.

---


---

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/redis_ecommerce_project.git
cd redis_ecommerce_project 
npm install
``` 
2. **.env file**
```bash
PORT=5000
DATABASE_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
REDIS_URL=redis://localhost:6379
``` 

🧩 API Endpoints
Users

POST /api/users/signup – Create new user

POST /api/users/login – Login user & get JWT

GET /api/users – List all users (admin only)

GET /api/users/:id – Get user by ID

PUT /api/users/:id – Update user

DELETE /api/users/:id – Delete user

Products:

POST /api/products – Create product

GET /api/products – Get all products (cached in Redis)

GET /api/products/:id – Get product by ID

PUT /api/products/:id – Update product

DELETE /api/products/:id – Delete product

Cart:

POST /api/cart – Add product to cart

GET /api/cart/:userId – Get user cart

PUT /api/cart/:id – Update quantity

DELETE /api/cart/:id – Remove from cart

Orders:

POST /api/orders/:userId – Place order (reduces stock)

GET /api/orders/:userId – Get user orders
