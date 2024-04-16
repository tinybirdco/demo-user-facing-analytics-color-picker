"use server";

import { Kafka } from "kafkajs";

const redpanda = new Kafka({
    brokers: ['YOUR BOOTSTRAP SERVER ADDRESS'],
    ssl: {
        },
    sasl: {
        mechanism: "scram-sha-256",
        username: "YOUR REDPANDA USERNAME",
        password: "YOUR REDPANDA PASSWORD"
    }
});

const producer = redpanda.producer();

export async function connect() {
  try {
    await producer.connect()
    console.log('Connected to Redpanda')
  } catch (error) {
    console.error("Could not connect to Redpanda:", error);
  }
}

export async function sendMessage(message) {

  try {
    await producer.send({
      topic: "color-picker",
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
    console.log("Disconnected from Redpanda");
  } catch (error) {
    console.error("Error:", error);
  }
}