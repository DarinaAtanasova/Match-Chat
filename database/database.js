const connectionURL = 'mongodb://localhost:27017'

var mongoose = require('mongoose');
mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected!')
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:  String, 
    password: String,
    username: String,
    birthday: Date,
    interests: [{
        type: String
    }]
});

var User = mongoose.model('User', userSchema);

db.close();
