import { createConsumer, createKafkaClient } from "@stockwallah/shared-kafka";
import { env } from "../config/env.js";
export const createServiceConsumer = (groupId = "corporate-news-service") =>
  createConsumer(
    createKafkaClient(
      "corporate-news-service",
      env.KAFKA_BROKERS.split(",").map((value) => value.trim()),
    ),
    groupId,
  );
