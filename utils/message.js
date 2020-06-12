// Requires imported modules
const moment    = require('moment-timezone');

// Set italian format 24h.
moment.locale('it');

// Create an obj with username, text, and time of a message
function createMessage(user, string) {
    var message = {
        user: user,
        string: string,
        time: moment().tz('Europe/Rome').format('LT')
    }
    return message;
}

exports.createMessage = createMessage;