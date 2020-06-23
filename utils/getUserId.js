const User = require('../database/models/user');

const getUserId = async (username) => {
    let user;
    try {
        user = await User.findOne({ username });
    }
    catch (err) {
        console.log('Error!')
    }
    if (user._id !== null) {
        return user._id;
    }
}

module.exports = getUserId;