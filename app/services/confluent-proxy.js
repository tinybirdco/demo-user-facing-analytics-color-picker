const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');
require('dotenv').config({ path: '../.env.local'});

// Define the Confluent connection
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
let isConnected = false; 

// Create a Kafka producer
const producer = confluent.producer();

// helper functions to connect and disconnect
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

// Create an Express app for proxy
const app = express();

// Use JSON and CORS
app.use(express.json());
app.use(cors());    

// Show the service is running
app.get('/', (req, res) => {
    res.send('The Confluent microservice is running!')
});

// Get Tinybird environment variables
app.get('/api/tinybird', (req, res) => {
    const envVariables = {
        TINYBIRD_HOST: process.env.TINYBIRD_HOST,
        TINYBIRD_TOKEN: process.env.TINYBIRD_TOKEN
    }

    res.json(envVariables);
})

// Add an API route to send data to Confluent
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

// Start the proxy server on localhost:3001
const server = app.listen(3001, () => {
    console.log('Confluent microservice running on port 3001');
});

// Handle disconnecting from Confluent when the server is shut down
process.on('SIGINT', async () => {
    await disconnectFromConfluent();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});