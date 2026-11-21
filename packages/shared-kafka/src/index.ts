import {
  Kafka,
  type Consumer,
  type EachMessagePayload,
  type Producer,
} from "kafkajs";
import type { DomainEvent } from "@stockwallah/shared-types";

export const KAFKA_TOPICS = {
  USER_CREATED: "user.created",
  USER_LOGGED_IN: "user.loggedin",
  PORTFOLIO_CREATED: "portfolio.created",
  PORTFOLIO_UPDATED: "portfolio.updated",
  NOTIFICATION_REQUESTED: "notification.requested",
  AUDIT_CREATED: "audit.created",
  NEWS_RECEIVED: "news.received",
  SENTIMENT_GENERATED: "sentiment.generated",
} as const;

export function createKafkaClient(
  clientId: string,
  brokers = ["localhost:9092"],
) {
  return new Kafka({ clientId, brokers });
}

export function createProducer(kafka: Kafka): Producer {
  return kafka.producer();
}

export async function publishEvent<T>(
  producer: Producer,
  topic: string,
  event: DomainEvent<T>,
): Promise<void> {
  await producer.send({
    topic,
    messages: [{ key: event.eventId, value: JSON.stringify(event) }],
  });
}

export function createConsumer(kafka: Kafka, groupId: string): Consumer {
  return kafka.consumer({ groupId });
}

export async function consumeTopic(
  consumer: Consumer,
  topic: string,
  handler: (message: EachMessagePayload) => Promise<void>,
): Promise<void> {
  await consumer.subscribe({ topic, fromBeginning: false });
  await consumer.run({ eachMessage: handler });
}
