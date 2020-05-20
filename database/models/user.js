const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:  String, 
    password: String,
    username: String,
    birthday: Date,
    profilePic: String,
    interests: [{
        type: String
    }],
    likedUsers: [Schema.Types.ObjectId],
    usersThatLikedMe: [Schema.Types.ObjectId]
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

// Check if the user you liked isn't already in the likes documents
userSchema.pre('save', function (next) {
    
    if (this.isModified('likedUsers')) {
        for (let index = 0; index < this.likedUsers.length - 1; index++) {
            const element = this.likedUsers[index];
            if (element.toString() === this.likedUsers[this.likedUsers.length - 1].toString() && this.likedUsers.length > 1) {
                throw new Error();
            }
        }
    }
    next();
})

userSchema.pre('save', function (next) {
    
    if (this.isModified('usersThatLikedMe')) {
        for (let index = 0; index < this.usersThatLikedMe.length - 1; index++) {
            const element = this.usersThatLikedMe[index];
            if (element.toString() === this.usersThatLikedMe[this.usersThatLikedMe.length - 1].toString() && this.usersThatLikedMe.length > 1) {
                throw new Error();
            }
        }
    }
    next();
})

var User = mongoose.model('User', userSchema);

module.exports = User;