const socket = io();

const chatForm = document.getElementById('chat-form');
var chatWindow = document.getElementById('chat-window');

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatWindow.scrollTop = chatWindow.scrollHeight;
})

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const msg = e.target.elements.message.value;

    if (msg !== '')
    {
        socket.emit('chatMessage', msg);
        
        e.target.elements.message.value = '';
        e.target.elements.message.focus();
    }
    
})

function outputMessage (message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p> <strong>${message.name}:</strong>  ${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}