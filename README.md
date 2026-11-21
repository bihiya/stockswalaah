# StockWallah

StockWallah is the root platform repository for a TypeScript microservices platform. It contains working scaffolds and shared infrastructure; domain workflows are intentionally left for service teams to implement.

## Repository layout

```text
apps/                 Express services and the React web application
packages/             Reusable config, auth, Kafka, logger, errors, types, responses
infrastructure/       Local Kafka, Redis, and monitoring configuration
docs/                 Architecture and development notes
.github/workflows/    CI lint, test, and build workflows
```

Node services: API Gateway, Auth, Portfolio, Notification, Audit, Sentiment, and Corporate News. Each service exposes `/health` and `/docs` and has its own environment and Docker configuration.

## Prerequisites

- Node.js 20.11+ and npm 10+
- Docker Compose v2

## Quick start

```bash
npm install
cp .env.example .env
docker compose up -d
npm run dev
```

The root `dev` task starts the API services and web app through Turborepo. Web runs on port 5173; API services run on ports 3000-3006. Local infrastructure is configured in `docker-compose.yml`. Services use local MongoDB by default; replace `MONGO_URI` with a MongoDB Atlas connection string when needed.

Useful commands:

```bash
npm run build
npm run lint
npm test
npm run format:check
```

## Configuration

Copy `.env.example` to `.env`. Values there are local development defaults only. Use a unique `JWT_SECRET` and managed secrets in deployed environments. The services validate configuration at startup; optional infrastructure URLs allow health-only development without external dependencies.

## API conventions

- `GET /health` reports service liveness.
- `GET /docs` serves the service's OpenAPI/Swagger UI.
- API responses use the shared response envelope; errors are normalized by shared middleware.
- Kafka event topic names are centralized in `packages/shared-kafka`.

## Engineering boundaries

Services own their domain logic and persistence. Shared packages contain cross-cutting primitives only. Kafka producers/consumers, Redis, and MongoDB connectors are explicit building blocks, not automatically connected unless configured. Add domain routes, DTOs, repositories, and tests within the owning service.
