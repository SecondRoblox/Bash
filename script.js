const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { exec } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('command', (cmd) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                socket.emit('output', `Error: ${stderr}`);
            } else {
                socket.emit('output', stdout);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

