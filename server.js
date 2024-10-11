const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { exec } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('command', (cmd) => {
        try {
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Exec error: ${stderr}`);
                    socket.emit('output', `Error: ${stderr}`);
                } else {
                    socket.emit('output', stdout);
                }
            });
        } catch (err) {
            console.error(`Caught error: ${err}`);
            socket.emit('output', `Error: ${err.message}`);
        }
    });
});

// Use the environment variable PORT provided by Vercel
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
