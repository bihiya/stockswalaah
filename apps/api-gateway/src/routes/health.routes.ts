import { Router } from "express";
import { successResponse } from "@stockwallah/shared-response";

export const healthRoutes = Router();

healthRoutes.get("/", (request, response) => {
  response.json(
    successResponse(
      { service: "api-gateway", status: "ok" },
      request.get("x-request-id"),
    ),
  );
});
