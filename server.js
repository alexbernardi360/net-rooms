// Requires external modules
const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io');

// Requires internal modules
const createMessage     = require('./utils/message.js');
const joinUser          = require('./utils/user.js').joinUser;
const leaveUser         = require('./utils/user.js').leaveUser;
const getUserById       = require('./utils/user.js').getUserById;
const getUsersByRoom    = require('./utils/user.js').getUsersByRoom;


const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

const PORT      = process.env.PORT || 8080;
const listener  = server.listen(PORT, () =>
    console.log(`The server is listening on port: ${listener.address().port}`)
);

// Define static directory public_html
app.use(express.static(`${__dirname}/public_html`));

const bot = 'net-room';

// Run when a client connects
io.on('connection', socket => {
    socket.on('join', ({username, room}) => {
        console.log(`${username} joins ${room} room.`);

        // Add the user at the users list
        var user = joinUser(socket.id, username, room);

        socket.join(user.room)

        // Send to the client who connected
        socket.emit('message', createMessage(bot, `Welcome to ${room} room.`));

        // Broadcast when a user connects
        // Send to everyone except those who connected
        socket.broadcast.to(user.room).emit('message', createMessage(bot, `${username} connected.`));

        // Send new informations when user join a room
        io.to(user.room).emit('informations', {
            room: user.room,
            users: getUsersByRoom(user.room)
        });
    });

    // Run when a client emit newMessage
    socket.on('newMessage', message => {
        // Get the user connect with that socket id
        var user = getUserById(socket.id);
        console.log(message);
        // Sending the received message to all connected clients
        io.to(user.room).emit('message', createMessage(user.username, message));
    });

    // Run when a client disconnets
    socket.on('disconnect', () => {
        var user = leaveUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', createMessage(bot, `${user.username} has disconnected.`));
            console.log(`${user.username} has disconnected.`);
            
            // Send new informations when a user disconnects
            io.to(user.room).emit('informations', {
                room: user.room,
                users: getUsersByRoom(user.room)
            });
        }

    });
});