const socket = io();

const chatForm = document.getElementById('chat-form');
var chatMessage = document.querySelector('.chat-messages');
var username = document.querySelector('#username');

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // chatMessage.scrollTop = chatMessage.scrollHeight;
})

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const msg = e.target.elements.message.value;
    
    socket.emit('chatMessage', msg);
    
    e.target.elements.message.value = '';
    e.target.elements.message.focus();
})

function outputMessage (message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p> ${message.name}:  ${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}