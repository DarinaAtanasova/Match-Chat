const connectionURL = 'mongodb://localhost:27017/match-and-chat'

var mongoose = require('mongoose');
mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected!')
});
