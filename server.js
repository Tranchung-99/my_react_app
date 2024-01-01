const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve your React app (build) as static files
app.use(express.static(path.join(__dirname, 'build')));

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('A client connected.');

  // Handle messages from the client (e.g., video frames)
  ws.on('message', (message) => {
    // Broadcast the message (video frames) to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});

// Start the server
const PORT = process.env.PORT || 3500;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});