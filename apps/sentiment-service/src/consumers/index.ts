import { createConsumer, createKafkaClient } from "@stockwallah/shared-kafka";
import { env } from "../config/env.js";
export const createServiceConsumer = (groupId = "sentiment-service") =>
  createConsumer(
    createKafkaClient(
      "sentiment-service",
      env.KAFKA_BROKERS.split(",").map((value) => value.trim()),
    ),
    groupId,
  );
