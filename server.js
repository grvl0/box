const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Store votes in memory (or replace with a database like MongoDB)
let votes = { boxer1: 0, boxer2: 0 };

// Endpoint to fetch current vote counts
app.get('/votes', (req, res) => {
    res.json(votes);
});

// Endpoint to handle voting
app.post('/vote', (req, res) => {
    const { boxer } = req.body;

    if (votes[boxer] !== undefined) {
        votes[boxer]++;
        io.emit('voteUpdate', votes); // Broadcast the new vote counts to all clients
        res.json({ success: true, votes });
    } else {
        res.status(400).json({ success: false, message: 'Invalid boxer' });
    }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('voteUpdate', votes); // Send current votes to newly connected client
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
