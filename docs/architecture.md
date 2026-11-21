# Platform Architecture

StockWallah is organized as a Turborepo with independent deployable applications in `apps/` and cross-cutting packages in `packages/`. The API Gateway is the browser-facing API boundary; each service owns its routes, data models, persistence decisions, and event handlers.

## Runtime boundaries

- Services are standalone Express processes with separate ports, environment validation, health checks, and OpenAPI docs.
- MongoDB connections are optional at startup for local health-only development; production environments should provide managed MongoDB Atlas URIs.
- Redis and Kafka clients are created by service configuration and connected at startup when configured. Producers and consumers remain opt-in until a service defines its event contract.
- Shared packages provide infrastructure primitives, not cross-service domain logic.
- The web client uses React Router, Redux Toolkit for session state, React Query for server state, and an Axios client for HTTP.

## Event topics

The canonical topics are `user.created`, `user.loggedin`, `portfolio.created`, `portfolio.updated`, `notification.requested`, `audit.created`, `news.received`, and `sentiment.generated`. Event payloads use the shared `DomainEvent` envelope.

## Local ports

API Gateway 3000, Auth 3001, Portfolio 3002, Notification 3003, Audit 3004, Sentiment 3005, Corporate News 3006, Web 5173, Kafka 9092, Redis 6379, MongoDB 27017, and Mongo Express 8081.
