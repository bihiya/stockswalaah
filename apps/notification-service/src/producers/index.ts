import { createKafkaClient, createProducer } from "@stockwallah/shared-kafka";
import { env } from "../config/env.js";
export const createServiceProducer = () =>
  createProducer(
    createKafkaClient(
      "notification-service",
      env.KAFKA_BROKERS.split(",").map((value) => value.trim()),
    ),
  );
