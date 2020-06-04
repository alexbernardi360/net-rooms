const express   = require('express');
const path      = require('path');
const http      = require('http');
const socketio  = require('socket.io');

const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

// Define public_html
app.use(express.static(path.join(__dirname, 'public_html')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS connection...');
});


const PORT = 8080 || process.env.PORT;

const listener = server.listen(PORT, () =>
    console.log(`The server is listening on port: ${listener.address().port}`)
);