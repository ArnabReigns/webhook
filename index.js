const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
    res.send('Arnab you made it!');
});
// Handle HTTP requests
app.get('/api', (req, res) => {
    res.json({ message: 'Hello, this is your HTTP API response!' });
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Server received your message: ${message}`);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
