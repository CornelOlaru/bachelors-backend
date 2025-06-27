# bachelors-backend
This is the back-end of my bachelor's project

The backend powers a digital restaurant ordering system, providing secure REST APIs for menu management, order processing, session handling, and user authentication.

## Main Features

- **RESTful API:** Structured endpoints for products, orders, users, sessions, and authentication.
- **Session management:** Generates and tracks unique session IDs for guest users scanning QR codes. Sessions control access to menu and order functionality.
- **Authentication:** Supports user registration and login with JWT-based authentication. Both guest and authenticated sessions are handled securely.
- **Order handling:** Allows both guest and registered users to place orders, view order history, and track the status of their orders.
- **Soft delete:** Implements soft delete for records, using `deleted` and `deletedAt` fields to mark data as logically removed while preserving database integrity.
- **Input validation:** All endpoints validate incoming data for security and reliability.
- **Role flexibility:** Designed to be extended with admin/staff dashboards for managing menu items, viewing statistics, or processing orders (future development).

## Tech stack

- **Node.js** + **Express.js** — Fast, scalable REST API with modular routing and middleware.
- **MongoDB** (+ Mongoose) — Flexible, schema-based database for storing products, orders, users, and sessions.
- **JWT (JSON Web Tokens)** — For secure authentication of users and protected routes.
- **Express middleware** — For input validation, error handling, and CORS management.
- **Postman** — Used extensively for endpoint testing and workflow verification.

## API structure

- `/api/products/` — CRUD endpoints for menu products.
- `/api/orders/` — Endpoints for creating and retrieving orders, available to both guests and authenticated users.
- `/api/users/` — Endpoints for user management.
- `/auth/login`, `/user/register` — Authentication and user creation.
- Session tokens — `sessionId` are validated with every request to ensure security and isolation between clients.

## Key principles

- Stateless, token-based session handling for both anonymous and registered users.
- Endpoints are protected based on session or authentication status.
- Errors are handled gracefully, with meaningful messages and consistent status codes.
- Codebase is modular, easy to refactor and extend (e.g., for role-based access or additional restaurant logic).

## Development

- All business logic is separated into controllers and services for maintainability.
- Environment variables are used for configuration (e.g., database URL, JWT secrets).
- Thoroughly tested with Postman collections and unit tests for core functionality.
- Designed for easy deployment (Docker or cloud-friendly if needed).

---

For setup instructions, API docs, or contributor guidelines, see the relevant sections below or contact the project author.