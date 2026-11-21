

# StockWallah

StockWallah is a microservices-based stock portfolio platform built using React, Node.js, Kafka, Redis, and MongoDB Atlas.

## Features

- User Authentication
- Portfolio Management
- Watchlists
- Real Time Notifications
- Corporate News
- AI Sentiment Analysis
- Audit Logging
- Kafka Event Driven Architecture
- Redis Caching

## Tech Stack

### Frontend

- React
- Redux Toolkit
- Material UI

### Backend

- Node.js
- Express.js

### Messaging

- Apache Kafka

### Database

- MongoDB Atlas

### Cache

- Redis

### Authentication

- JWT
- Refresh Tokens

## Services

- API Gateway
- Auth Service
- Portfolio Service
- Notification Service
- Sentiment Service
- Corporate News Service
- Audit Service

## Local Setup

```bash
docker-compose up -d
```

```bash
npm install
```

```bash
npm run dev
```

## Environment Variables

AUTH_SERVICE_URL=

MONGO_URI=

REDIS_URL=

KAFKA_BROKERS=

JWT_SECRET=

OPENAI_API_KEY=
```


stockwallah/

├── apps/
│
├── api-gateway/
│
├── auth-service/
│
├── portfolio-service/
│
├── notification-service/
│
├── sentiment-service/
│
├── corporate-news-service/
│
├── audit-service/
│
├── shared/
│
├── docker/
│
├── kafka/
│
├── docs/
│
└── frontend/



user-created

user-login

portfolio-created

portfolio-updated

stock-price-alert

audit-event

news-received

sentiment-generated

notification-requested


                       ┌─────────────┐
                       │ React Front │
                       │  NextJS UI  │
                       └──────┬──────┘
                              │
                              ▼
                      ┌──────────────┐
                      │ API Gateway  │
                      │ Express/Nest │
                      └──────┬───────┘
                             │ JWT
 ────────────────────────────┼──────────────────────────

      ┌──────────────┐
      │ Auth Service │
      │ Login Signup │
      └──────┬───────┘
             │
             ▼
        MongoDB Atlas


      ┌──────────────────┐
      │ Portfolio Service│
      │ Holdings/SIPs    │
      └──────┬───────────┘
             │
             ▼
          Kafka


      ┌──────────────────┐
      │ Notification Svc │
      │ Email/SMS/Push   │
      └──────────────────┘

      ┌──────────────────┐
      │ Audit Service    │
      │ Activity Logs    │
      └──────────────────┘

      ┌──────────────────┐
      │ Sentiment Svc    │
      │ News Analysis    │
      └──────────────────┘

      ┌──────────────────┐
      │ Corporate News   │
      │ Market News      │
      └──────────────────┘

             ▲
             │
         Kafka Bus

   Redis Cache (shared)

   MongoDB Atlas

