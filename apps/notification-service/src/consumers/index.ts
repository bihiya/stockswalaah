import { createConsumer, createKafkaClient } from "@stockwallah/shared-kafka";
import { env } from "../config/env.js";
export const createServiceConsumer = (groupId = "notification-service") =>
  createConsumer(
    createKafkaClient(
      "notification-service",
      env.KAFKA_BROKERS.split(",").map((value) => value.trim()),
    ),
    groupId,
  );
