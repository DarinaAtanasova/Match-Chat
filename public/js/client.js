const socket = io();

const chatForm = document.getElementById('chat-form');
var chatWindow = document.getElementById('chat-window');
const chatRoomForm = document.querySelector('.chat-form');
const chatRoomWindow = document.querySelector('.chat-window');
const chatMessages = document.querySelector('.chat-messages');
const currentUser = document.querySelector('.username');

const {room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(room);
                          

socket.emit('joinRoom', {room});

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// chatForm.addEventListener('submit', e => {
//     e.preventDefault();
    
//     const msg = e.target.elements.message.value;

//     if (msg !== '')
//     {
//         socket.emit('chatMessage', msg);
        
//         e.target.elements.message.value = '';
//         e.target.elements.message.focus();
//     }
// })

chatRoomForm.addEventListener('submit', e => {
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

    let username = returnCurrentUsername();

    if (username === message.name) {
        div.classList.add('you-message');
        div.innerHTML = `<p> <span class="message__name">${message.name}</span> <span class="message__meta">${message.time}</span></p>
            <p>
            ${message.text}
            </p>`;
            document.querySelector('.chat-messages').appendChild(div);
    } else {
        if (message.name == '!Bugs Bunny')
        {
            div.classList.add('admin-message'); 
            div.innerHTML = `<p> <span class="message__name">${message.name}</span> <span>${message.time}</span></p>
            <p>
            ${message.text}
            </p>`;
            document.querySelector('.admin-notifications').appendChild(div);           
        } else {
            div.classList.add('other-message');
            div.innerHTML = `<p> <span class="message__name">${message.name}</span> <span class="message__meta">${message.time}</span></p>
            <p>
            ${message.text}
            </p>`;
            document.querySelector('.chat-messages').appendChild(div);
        }
    }
}