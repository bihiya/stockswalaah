import { createConsumer, createKafkaClient } from "@stockwallah/shared-kafka";
import { env } from "../config/env.js";

export function createServiceConsumer(groupId = "api-gateway") {
  const kafka = createKafkaClient(
    "api-gateway",
    env.KAFKA_BROKERS.split(",").map((broker) => broker.trim()),
  );
  return createConsumer(kafka, groupId);
}
