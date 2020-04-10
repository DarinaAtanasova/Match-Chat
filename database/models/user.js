const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Setup Middleware
userSchema.pre('save', async function (next) {
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
})

var User = mongoose.model('User', userSchema);

module.exports = User;