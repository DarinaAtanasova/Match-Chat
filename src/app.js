const express = require('express');
const session = require('express-session');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');
const formatMessage = require('../utils/formatMessage.js');

require('../database/database');

var User = require('../database/models/user.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 5000;

// Set paths to directories
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'match'
}))

// Setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    const { userId } = req.session;
    if (userId) {
        res.render('index', { id: userId });
    }
    else
    {
        res.render('index');
    }
})

app.get('/about',(req, res) => {
    const { userId } = req.session;
    if (userId) {
        res.render('about', { id: userId });
    }
    else
    {
        res.render('about');
    }
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {

    await User.findOne({ email: req.body.email }).then(() => {
        res.redirect('/signup');
    }).catch(async () => {
        var user = new User(req.body);
    
        try {
            await user.save();
            res.status(201);
            req.session.userId = user._id;
            res.redirect('/profile');
        } catch (e) {
            res.status(400).send(e);
        }
    })
});
        
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user.username + " has succesfully logged in!");
        req.session.userId = user._id;
        res.redirect('/profile');
    } catch (e) {
        res.redirect('/login');
        res.status(400).send();
    }
})

app.get('/profile', async (req, res) => {
    const { userId } = req.session;
    var user = await User.findById(userId);
    
    if (!user) {
        res.redirect('/');
    }
    else
    {
        res.render('profile', {
            username: user.username,
            email: user.email,
            birthday: user.birthday
        });
    }
    
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.redirect('/');
        }
        
        res.clearCookie();
        res.redirect('/login');
        console.log("User has succesfully logged out.");

    })
})

var name = "";

app.get('/chat', async (req, res) => {
    const { userId } = req.session;
    if (userId) {
        var user = await User.findById(userId);
        name = user.username;
        res.render('chat', { id: userId });
    }
    else
    {
        res.render('chat');
    }

})

io.on('connection', socket => {
    socket.username = name
    socket.emit('message', formatMessage("!Bugs Bunny", 'Welcome!'));
    
    socket.broadcast.emit('message', formatMessage("!Bugs Bunny",'User has joined!'));
    
    socket.on('chatMessage', message => {
        io.emit('message', formatMessage(socket.username, message));
    })

    socket.on('disconnect', () => {
        io.emit('message', formatMessage("!Bugs Bunny", "User has disconnected"));
    })
    
})

server.listen(PORT, () => console.log('Server started on port ' + PORT));
