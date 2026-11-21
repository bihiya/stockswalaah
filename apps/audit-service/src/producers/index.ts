import { createKafkaClient, createProducer } from "@stockwallah/shared-kafka";
import { env } from "../config/env.js";
export const createServiceProducer = () =>
  createProducer(
    createKafkaClient(
      "audit-service",
      env.KAFKA_BROKERS.split(",").map((value) => value.trim()),
    ),
  );
