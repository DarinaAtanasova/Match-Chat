const express = require('express');
const path = require('path')
const hbs = require('hbs')
require('../database/database')
var User = require('../database/models/user.js');
const bcrypt = require('bcryptjs');

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

    user.save().then(() => {
        res.status(201);
        res.redirect('/');
    }).catch(() => {
        res.status(400).send(e);
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.listen(PORT, () => console.log('Server started on port ' + PORT));
