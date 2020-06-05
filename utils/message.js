const moment = require("moment");

moment.locale('it');

// Create an obj with username, text, and time of a message
function createMessage(user, string) {
    var message = {
        user: user,
        string: string,
        time: moment().format('LT')
    }
    return message;
}

module.exports = createMessage;