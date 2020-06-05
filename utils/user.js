// Array of connected users
var users = [];

// Push user in chat room when join
function joinUser(id, username, room) {
    const user = {id, username, room};
    users.push(user);
    return user;
}

// Remove user when leave the chat
function leaveUser(id) {
    // Get the index of the user to remove
    // returns -1, not found
    const i = users.findIndex(user => user.id == id);

    if (i != -1) {
        // get and remove one element starting from i
        const result = users.splice(i, 1);
        return result[0];
    }

    return null;
}

// Push user in chat room when join
function joinUser(id, username, room) {
    const user = {id, username, room};
    users.push(user);
    return user;
}

// Get user from array by id
function getUserById(id) {
    return users.find(user => user.id == id);
}

// Get all users in a room
function getUsersByRoom(room) {
    // Get new array with the elements that passed the test.
    return users.filter(user => user.room == room);
}

exports.joinUser        = joinUser;
exports.getUserById     = getUserById;
exports.leaveUser       = leaveUser;
exports.getUsersByRoom  = getUsersByRoom;