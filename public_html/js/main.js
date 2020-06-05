const socket = io();

const msg_form = document.getElementById('msg_form');

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
    msg_form.reset();   // Clear the form from the submitted message;

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
    newMsg.innerHTML = `    <p class="font-weight-bold">Frank</p>
                            <p>${message}</p>
                            <span class="time-right">11:00</span>`;
    let chat = document.getElementById('chat');
    chat.appendChild(newMsg);
}