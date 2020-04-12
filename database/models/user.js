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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error("Unable to login!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login!");
    }

    return user;
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
})

var User = mongoose.model('User', userSchema);

module.exports = User;