# Kafka

The local Kafka broker runs with Zookeeper via the root Compose file. Host applications connect to `localhost:9092`; containers on the Compose network use `kafka:29092`. Shared topic names and KafkaJS wrappers live in `packages/shared-kafka`.
