const socket = io();

const msg_form          = document.getElementById('msg_form');
const roomName          = document.getElementById('roomName');
const connectedUsers    = document.getElementById('connectedUsers');

// Get params from URL: username and room
const urlParams = new URLSearchParams(window.location.search);
const username  = urlParams.get('username');
const room      = urlParams.get('room');

// Join room
socket.emit('join', {username, room});

// Get chat room informations
socket.on('informations', ({room, users}) => {
    printInfo({room, users});
});

// Run when the server emits a message
socket.on('message', message => {
    console.log(message);

    // Add the new message on the screen
    printMessage(message);
});

// Event on submitting  message
msg_form.addEventListener('submit', event => {
    // Prevent the default behavior
    event.preventDefault();

    const message = event.target.elements.message.value;
    msg_form.reset();   // Clear the form from the submitted message
    event.target.elements.message.focus();  // When submit focus on input

    console.log(`Message sent: ${message}`);

    // Send the message to the server
    socket.emit('newMessage', message);
});

// Create a div with the new message to append in the chat
function printMessage(message) {
    let newMsg = document.createElement('div');
    let attribute = document.createAttribute('class');
    attribute.value = 'container-fluid msg';
    newMsg.setAttributeNode(attribute);
    newMsg.innerHTML = `<p class="font-weight-bold">${message.user}</p>
                        <p>${message.string}</p>
                        <span class="time-right">${message.time}</span>`;
    let chat = document.getElementById('chat');
    chat.appendChild(newMsg);

    // Auto scroll on bottom
    chat.scrollTop = chat.scrollHeight;
}

function printInfo({room, users}){
    // Add room name
    roomName.innerText = `${room}`;
    // Add connected users list
    connectedUsers.innerHTML = '';
    users.forEach(element => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        let text = document.createTextNode(element.username);
        a.appendChild(text);
        li.appendChild(a);
        connectedUsers.appendChild(li);
    });
}