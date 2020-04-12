const express = require('express');
const path = require('path')

require('../database/database')

var User = require('../database/models/user.js');

const app = express();

const PORT = 5000;

// Set paths to directories
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about',(req, res) => {
    res.render('about');
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    var user = new User(req.body);

    try {
        await user.save();
        res.status(201);
        // TO DO: Redirecting to user profile route
        res.redirect('/');
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user.username + " has succesfully logged in!");
        // TO DO: Redirecting to user profile route
        res.redirect('/');
    } catch (e) {
        res.status(400).send();
    }
})

app.listen(PORT, () => console.log('Server started on port ' + PORT));
