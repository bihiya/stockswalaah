Act as a Principal Engineer.

Generate the INITIAL WORKING MONOREPO SETUP for a project named "StockWallah".

IMPORTANT:
This repository is the ROOT PLATFORM REPOSITORY.

Do NOT implement complete business logic.

Create only the foundation architecture, scaffolding, configuration, infrastructure setup, and shared packages.

====================================================
TECH STACK
====================================================

Frontend
- React 19
- Vite
- TypeScript
- Material UI
- Redux Toolkit
- React Query

Backend
- Node.js
- Express.js
- TypeScript

Messaging
- Kafka

Cache
- Redis

Database
- MongoDB Atlas

Authentication
- JWT

Containerization
- Docker
- Docker Compose

====================================================
MONOREPO TOOLING
====================================================

Use:

- Turborepo
- npm workspaces
- eslint
- prettier
- husky
- lint-staged

====================================================
CREATE THIS STRUCTURE
====================================================

stockwallah/

apps/

  api-gateway/

  auth-service/

  portfolio-service/

  notification-service/

  audit-service/

  sentiment-service/

  corporate-news-service/

  web/

packages/

  shared-config/

  shared-logger/

  shared-auth/

  shared-kafka/

  shared-errors/

  shared-types/

  shared-response/

infrastructure/

  kafka/

  redis/

  monitoring/

.github/

docs/

====================================================
FOR EACH NODE SERVICE GENERATE
====================================================

src/

  controllers/

  routes/

  services/

  repositories/

  middleware/

  config/

  models/

  events/

  consumers/

  producers/

  validators/

  utils/

  app.ts

  server.ts

TypeScript configuration.

Health endpoint.

Swagger setup.

Logger integration.

Kafka integration placeholders.

Redis integration placeholders.

Mongo connection setup.

Error handling middleware.

Request validation middleware.

Environment configuration.

====================================================
FOR WEB APP GENERATE
====================================================

src/

  pages/

  features/

  components/

  services/

  hooks/

  layouts/

  routes/

  store/

  styles/

Implement:

- React Router
- Redux Toolkit
- React Query
- Axios Client
- Material UI Theme
- Login Page
- Dashboard Layout
- Protected Route Placeholder

====================================================
SHARED PACKAGES
====================================================

Generate reusable packages:

shared-config

- env loader
- configuration validation

shared-logger

- winston setup

shared-auth

- JWT utility
- password utility

shared-kafka

- producer wrapper
- consumer wrapper

shared-errors

- custom exceptions

shared-types

- global types

shared-response

- standard API responses

====================================================
KAFKA SETUP
====================================================

Create common topics constants.

user.created
user.loggedin
portfolio.created
portfolio.updated
notification.requested
audit.created
news.received
sentiment.generated

Generate producer and consumer abstractions.

====================================================
REDIS SETUP
====================================================

Generate:

Redis Client
Cache Helper
TTL Helpers

====================================================
DOCKER
====================================================

Generate:

Dockerfile for each service

Docker Compose containing:

- Kafka
- Zookeeper
- Redis
- MongoDB
- Mongo Express

====================================================
CI/CD
====================================================

Generate GitHub Actions workflows:

lint.yml

test.yml

build.yml

====================================================
CODING STANDARDS
====================================================

Use:

SOLID

Clean Architecture

Repository Pattern

DTO Pattern

Domain Driven Design principles

====================================================
OUTPUT FORMAT
====================================================

1. Complete directory structure

2. Root package.json

3. Root turbo.json

4. Shared packages code

5. API Gateway setup

6. Auth Service setup

7. Portfolio Service setup

8. Remaining service scaffolds

9. React app scaffold

10. Docker setup

11. GitHub Actions

12. Swagger setup

13. README.md

Generate production-ready boilerplate code.
Every file should be fully implemented and compilable.
