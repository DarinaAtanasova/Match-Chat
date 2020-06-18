const User = require('../database/models/user');

const getUserId = async (username) => {
    let user = await User.findOne({ username });
    return user._id;
}

module.exports = getUserId;