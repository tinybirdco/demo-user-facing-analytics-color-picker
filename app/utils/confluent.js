"use server";

import { Kafka } from "kafkajs";

const confluent = new Kafka({
    brokers: ['YOUR BOOTSTRAP SERVER ADDRESS'],
    ssl: {
        },
    sasl: {
        mechanism: "scram-sha-256",
        username: "YOUR CONFLUENT KEY",
        password: "YOUR CONFLUENT SECRET"
    }
});

const producer = confluent.producer();

export async function connect() {
  try {
    await producer.connect()
    console.log('Connected to Confluent')
  } catch (error) {
    console.error("Could not connect to Confluent:", error);
  }
}

export async function sendMessage(message) {

  try {
    await producer.send({
      topic: "game-events",
      messages: [{
        value: JSON.stringify(message)
      }]
    });
  } catch (error) {
    console.error(`Unable to send message: ${error.message}`, error)
  }
};

export async function disconnect() {
  try {
    await producer.disconnect();
    console.log("Disconnected from Confluent");
  } catch (error) {
    console.error("Error:", error);
  }
}