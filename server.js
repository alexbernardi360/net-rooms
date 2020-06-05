const express   = require('express');
const path      = require('path');
const http      = require('http');
const socketio  = require('socket.io');

const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

const PORT = process.env.PORT || 8080;
const listener = server.listen(PORT, () =>
    console.log(`The server is listening on port: ${listener.address().port}`)
);

// Define public_html
app.use(express.static(path.join(__dirname, 'public_html')));

// Run when a client connects
io.on('connection', socket => {
    console.log('New WS connection...');

    // Send to the client who connected
    socket.emit('message', 'Welcome to net-rooms');

    // Broadcast when a user connects
    // Send to everyone except those who connected
    socket.broadcast.emit('message', 'New user connected.');

    // Run when a client disconnets
    socket.on('disconnect', () => {
        // Send to all connected clients
        io.emit('message', 'A user has disconnected.');
        console.log('A user has disconnected.');
    });

    // Run when a client emit newMessage
    socket.on('newMessage', message => {
        console.log(message);
        // Sending the received message to all connected clients
        io.emit('message', message);
    });
});