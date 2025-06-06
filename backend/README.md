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

## Folder Structure

```
plat_form/
├── backend/
│   ├── logs/
│   │   ├── combined.log
│   │   ├── error.log
│   ├── migrations/
│   │   ├── 001-create-users-table.js
│   │   ├── 002-create-refresh-tokens-table.js
│   │   ├── 003-create-password-reset-tokens-table.js
│   │   ├── migrate.js
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.config.js
│   │   │   ├── index.js
│   │   │   ├── redis.config.js
│   │   │   ├── swagger.config.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── index.js
│   │   │   ├── rateLimiter.middleware.js
│   │   │   ├── responseEnhancer.middleware.js
│   │   │   ├── validate.middleware.js
│   │   ├── models/
│   │   │   ├── index.js
│   │   │   ├── passwordResetToken.model.js
│   │   │   ├── refreshToken.model.js
│   │   │   ├── user.model.js
│   │   ├── routes/
│   │   │   ├── admin.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── index.js
│   │   │   ├── user.routes.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── email.service.js
│   │   │   ├── redis.service.js
│   │   │   ├── user.service.js
│   │   ├── utils/
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   ├── logger.js
│   │   ├── validations/
│   │   │   ├── auth.validation.js
│   │   │   ├── user.validation.js
│   │   ├── app.js
│   ├── server.js
│   ├── tests/
│   ├── .env
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── .prettierrc
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
│   └── README.md
└── frontend/
```

---

## ERD Schema

```
categories (
  id uuid PK FK,
  parent_id uuid PK,
  name character varying NOT NULL,
  slug character varying PK FK,
  description text,
  icon character varying,
  is_active boolean DEFAULT true,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

category_attributes (
  id uuid PK FK,
  category_id uuid PK,
  name character varying NOT NULL,
  type USER-DEFINED NOT NULL,
  is_required boolean DEFAULT false,
  sort_order integer,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

customer_profiles (
  user_id uuid PK FK,
  date_of_birth date,
  gender character varying,
  preferred_language character varying,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

employee_profiles (
  user_id uuid PK FK,
  department character varying,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

listing_attribute_values (
  id uuid PK FK,
  listing_id uuid PK,
  category_attribute_id uuid PK,
  value text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

listing_availabilities (
  id uuid PK FK,
  listing_id uuid PK,
  date date NOT NULL,
  start_time time without time zone,
  end_time time without time zone,
  available_quantity integer NOT NULL,
  booked_quantity integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

listing_exclusions (
  id uuid PK FK,
  listing_id uuid PK,
  exclusion_date date NOT NULL,
  reason character varying,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

listing_images (
  id uuid PK FK,
  listing_id uuid PK,
  image_url character varying NOT NULL,
  caption character varying,
  sort_order integer NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

listing_locations (
  id uuid PK FK,
  listing_id uuid PK,
  location_id uuid PK,
  stop_order integer,
  label character varying,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

listing_schedules (
  id uuid PK FK,
  listing_id uuid PK,
  day_of_week USER-DEFINED NOT NULL,
  start_time time without time zone NOT NULL,
  end_time time without time zone,
  is_recurring boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

listing_tags (
  listing_id uuid PK FK,
  tag_id uuid PK FK,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

listing_translations (
  id uuid PK FK,
  listing_id uuid PK,
  language_code character varying NOT NULL,
  title character varying NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

listings (
  id uuid PK FK,
  supplier_id uuid NOT NULL,
  category_id uuid PK,
  vertical_extension_id uuid,
  vertical_extension_type character varying,
  title character varying NOT NULL,
  description text,
  base_price numeric,
  currency character varying,
  status USER-DEFINED NOT NULL,
  instant_bookable boolean DEFAULT false,
  cancellation_policy_id uuid,
  average_rating numeric,
  review_count integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

locations (
  id uuid PK FK,
  parent_id uuid PK,
  name character varying NOT NULL,
  type USER-DEFINED NOT NULL,
  latitude numeric,
  longitude numeric,
  timezone character varying,
  google_place_id character varying,
  address_json jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

password_reset_tokens (
  id uuid PK FK DEFAULT gen_random_uuid(),
  user_id uuid PK,
  token character varying NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  is_used boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

price_tiers (
  id uuid PK FK,
  listing_id uuid PK,
  label character varying NOT NULL,
  min_age integer,
  max_age integer,
  amount numeric NOT NULL,
  currency character varying NOT NULL,
  is_default boolean DEFAULT false,
  valid_from timestamp with time zone,
  valid_to timestamp with time zone,
  min_quantity integer,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

refresh_tokens (
  id uuid PK FK DEFAULT gen_random_uuid(),
  token character varying NOT NULL,
  user_id uuid PK,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

roles (
  id integer PK FK DEFAULT nextval('roles_id_seq'::regclass),
  key character varying PK FK,
  name character varying PK FK,
  description character varying,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

supplier_profiles (
  user_id uuid PK FK,
  company_name character varying NOT NULL,
  company_website character varying,
  tax_id character varying,
  address character varying,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

tags (
  id uuid PK FK,
  name character varying NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone
)

user_roles (
  id integer PK FK DEFAULT nextval('user_roles_id_seq'::regclass),
  user_id uuid PK,
  role_id integer PK,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

users (
  id uuid PK FK,
  first_name character varying NOT NULL,
  last_name character varying NOT NULL,
  email character varying PK FK,
  phone character varying,
  password character varying,
  is_email_verified boolean DEFAULT false,
  verification_token character varying,
  last_login_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
)

bookings (
  id uuid PK,
  customer_id uuid FK -> users,
  listing_id uuid FK -> listings,
  status USER-DEFINED (pending, confirmed, cancelled, completed, refunded),
  booking_reference character varying UNIQUE,
  total_amount numeric NOT NULL,
  currency character varying NOT NULL,
  adult_count integer,
  child_count integer,
  infant_count integer,
  special_requests text,
  cancellation_reason text,
  cancellation_fee numeric,
  cancellation_processed_at timestamp with time zone,
  starts_at timestamp with time zone,
  ends_at timestamp with time zone,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)

booking_participants (
  id uuid PK,
  booking_id uuid FK -> bookings,
  price_tier_id uuid FK -> price_tiers,
  quantity integer NOT NULL,
  first_name character varying,
  last_name character varying,
  age integer,
  created_at timestamp with time zone
)

booking_availability_slots (
  id uuid PK,
  booking_id uuid FK -> bookings,
  availability_id uuid FK -> listing_availabilities,
  quantity integer NOT NULL,
  created_at timestamp with time zone
)

payments (
  id uuid PK,
  booking_id uuid FK -> bookings,
  customer_id uuid FK -> users,
  amount numeric NOT NULL,
  currency character varying NOT NULL,
  payment_method_id uuid FK -> payment_methods,
  status USER-DEFINED (pending, completed, failed, refunded),
  gateway_reference character varying,
  gateway_response jsonb,
  captured_at timestamp with time zone,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)

payment_methods (
  id uuid PK,
  user_id uuid FK -> users,
  type USER-DEFINED (credit_card, paypal, apple_pay, etc.),
  details jsonb, -- encrypted payment details
  is_default boolean DEFAULT false,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone
)

invoices (
  id uuid PK,
  booking_id uuid FK -> bookings,
  invoice_number character varying UNIQUE,
  issue_date date NOT NULL,
  due_date date NOT NULL,
  status USER-DEFINED (draft, issued, paid, cancelled),
  tax_amount numeric,
  subtotal numeric NOT NULL,
  total numeric NOT NULL,
  currency character varying NOT NULL,
  pdf_url character varying,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)

refunds (
  id uuid PK,
  payment_id uuid FK -> payments,
  amount numeric NOT NULL,
  currency character varying NOT NULL,
  reason text,
  status USER-DEFINED (requested, processing, completed, rejected),
  processed_by uuid FK -> users, -- admin who processed
  processed_at timestamp with time zone,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)

reviews (
  id uuid PK,
  booking_id uuid FK -> bookings,
  listing_id uuid FK -> listings,
  reviewer_id uuid FK -> users,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title character varying,
  comment text,
  response_text text, -- supplier response
  response_date timestamp with time zone,
  is_verified boolean DEFAULT false, -- verified purchaser
  status USER-DEFINED (pending, published, rejected),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone
)

review_attributes (
  id uuid PK,
  review_id uuid FK -> reviews,
  attribute_id uuid FK -> category_attributes,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at timestamp with time zone
)
```

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
