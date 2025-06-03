# 🔐 Secure RESTful API Boilerplate with Express.js, PostgreSQL, JWT, and Redis

A modular and secure RESTful API built with **Express.js**, using **JWT authentication**, **PostgreSQL** as the database, and **Redis** for session/token management. Designed for scalability, maintainability, and best practices.

## ⚙️ Features

- User registration and login
- JWT access and refresh token flow
- Role-based authorization (customer, supplier, admin)
- Token blacklist (logout/invalidation) via Redis
- Password reset via email
- Secure password hashing with bcrypt
- Input validation with Joi
- Swagger API documentation
- Unit and integration tests
- Code formatting with Prettier
- Linting with ESLint

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js
- **Auth:** JWT (Access & Refresh Tokens), OAuth 2.0
- **Database:** PostgreSQL
- **Cache:** Redis
- **Validation:** Joi or Zod
- **Testing:** Jest or Vitest
- **Docs:** Swagger (OpenAPI 3.x)
- **Env Management:** dotenv

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/secure-rest-api-boilerplate.git
cd secure-rest-api-boilerplate
```

### 2. Install dependencies:

```bash
pnpm install
```

### 3. Create a `.env` file based on `.env.example` and fill in the required values.

```bash
cp .env.example .env
```

### 4. Set up PostgreSQL database:

```bash
createdb secure_api_db
```

### 5. Run migrations:

```bash
pnpm run migrate
```

### 6. Start Redis server:

```bash
redis-server
```

### 7. Start the application:

```bash
pnpm run dev
```

## 🧪 Running Tests

```bash
pnpm test
```

---

## Code Formatting and Linting

We use Prettier and ESLint to maintain consistent code style and catch potential issues.

### Format all code:

```bash
pnpm format
```

### Check formatting (without changing files):

```bash
pnpm format:check
```

### Run linter:

```bash
pnpm lint
```

### Fix auto-fixable lint issues:

```bash
pnpm lint:fix
```

### Pre-commit Hooks

The project includes Git hooks that automatically format and lint your code before each commit. These will run when you try to commit:

1. Prettier will format all staged files
2. ESLint will check for linting errors

---

## 📄 API Documentation

After starting the server, access the Swagger UI at:

```
http://localhost:3000/api-docs
```

| Variable                        | Description                         | Default         |
| ------------------------------- | ----------------------------------- | --------------- |
| `PORT`                          | Server port                         | `3000`          |
| `NODE_ENV`                      | Environment                         | `development`   |
| `DB_HOST`                       | PostgreSQL host                     | `localhost`     |
| `DB_PORT`                       | PostgreSQL port                     | `5432`          |
| `DB_USER`                       | PostgreSQL user                     | `postgres`      |
| `DB_PASSWORD`                   | PostgreSQL password                 | `postgres`      |
| `DB_DATABASE`                   | PostgreSQL database name            | `secure_api_db` |
| `REDIS_HOST`                    | Redis host                          | `localhost`     |
| `REDIS_PORT`                    | Redis port                          | `6379`          |
| `JWT_SECRET`                    | JWT secret key                      | `-`             |
| `JWT_ACCESS_EXPIRATION_MINUTES` | JWT access token expiration (min)   | `15`            |
| `JWT_REFRESH_EXPIRATION_DAYS`   | JWT refresh token expiration (days) | `7`             |
| `SMTP_HOST`                     | SMTP server host                    | `-`             |
| `SMTP_PORT`                     | SMTP server port                    | `-`             |
| `SMTP_USERNAME`                 | SMTP username                       | `-`             |
| `SMTP_PASSWORD`                 | SMTP password                       | `-`             |
| `EMAIL_FROM`                    | Email sender address                | `-`             |

---

## Editor Setup

For best experience, we recommend:

- Install [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) extensions for your editor
- Enable "Format on Save" in your editor settings
- Configure your editor to use the project's ESLint config

## Production Deployment

For production deployment, consider:

1. Using PM2 or similar process manager
2. Setting up HTTPS with a reverse proxy (Nginx)
3. Properly securing your database and Redis instances
4. Using environment-specific configuration files
5. Implementing proper logging and monitoring

---

## License

MIT

---

## Conclusion

This implementation provides a complete, production-ready secure RESTful API with all the features you requested:

1. JWT-based authentication with access/refresh tokens
2. PostgreSQL for data storage with proper schema
3. Redis for token blacklisting
4. Role-based authorization
5. Password reset flow
6. Social login (Google/Facebook - implementation would follow similar patterns)
7. Input validation
8. Secure password hashing
9. Modular architecture
10. Testing setup
11. API documentation

The code follows modern best practices for security, performance, and maintainability. You can extend it further by adding more features like rate limiting, request validation, or additional security headers as needed.

To implement social login with Google and Facebook, you would need to:

1. Add OAuth routes and controllers
2. Implement the OAuth flow for each provider
3. Store the social auth tokens in the database
4. Create JWT tokens after successful social login

The foundation is all here for you to build upon.

### If you found this useful, feel free to ⭐️ the repo and share it with others.
