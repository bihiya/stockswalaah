import { createKafkaClient, createProducer } from "@stockwallah/shared-kafka";
import { env } from "../config/env.js";

export function createServiceProducer() {
  const kafka = createKafkaClient(
    "api-gateway",
    env.KAFKA_BROKERS.split(",").map((broker) => broker.trim()),
  );
  return createProducer(kafka);
}
