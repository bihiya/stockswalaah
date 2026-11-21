import { env } from "./env.js";

export const swaggerSpec = {
  openapi: "3.0.3",
  info: { title: "StockWallah API Gateway", version: "0.1.0" },
  servers: [{ url: `http://localhost:${env.PORT}` }],
  paths: {},
};
