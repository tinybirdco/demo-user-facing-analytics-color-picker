const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');
require('dotenv').config({ path: '.env.local'})

const confluent = new Kafka({
    clientId: process.env.CONFLUENT_CLIENT_ID,
    brokers: [process.env.CONFLUENT_BROKER_URL],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: process.env.CONFLUENT_API_KEY,
        password: process.env.CONFLUENT_API_SECRET,
    },
});

const producer = confluent.producer();
let isConnected = false;

const connectToConfluent = async () => {
    await producer.connect();
    isConnected = true;
    console.log('Connected to Confluent broker');
}

const disconnectFromConfluent = async () => {
    if (isConnected) {
        await producer.disconnect();
        console.log('Disconnected from Confluent broker');
    }
}

const app = express();

app.use(express.json());
app.use(cors());    

app.get('/', (req, res) => {
    res.send('The Confluent microservice is running!')
});

app.post('/api/sendToConfluent', async (req, res) => {
    const payload = req.body;
    const topic = 'game_events';

    try {
        if (!isConnected) {
            await connectToConfluent();
        }
        await producer.send({
            topic,
            messages: [
                { value: JSON.stringify(payload) },
            ],
        });

        res.json({ status: 'Message sent to Confluent' });
    } catch (error) {
        console.error('Error sending message to Confluent:', error);
        res.json({ error: error.message });
    }
});

const server = app.listen(3001, () => {
    console.log('Confluent microservice running on port 3001');
});

process.on('SIGINT', async () => {
    await disconnectFromConfluent();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});