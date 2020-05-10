const User = require('../database/models/user');

const matchByBirthday = async (user) => {

    const res = await User.aggregate([
        {
            $match: {
                _id: {
                    $ne: user._id
                },
                birthday: user.birthday
            } 
        }
    ]);
    return res;
}

module.exports = matchByBirthday;