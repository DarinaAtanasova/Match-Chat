const User = require('../database/models/user');

const matchByInterest = async (user, interest) => {
    const result = await User.find(
        {
            _id: {
                $ne: user._id
            },
            interests: {
                $elemMatch: {
                    $eq: interest
                }
            }
        }
    );
    return result;
}

let madlen = {
    interests: ['TV', 'Books']
}

const getCommonInterests = (user, callback) => {
    let allMatches = [];
    user.interests.forEach(async interest => {
        matchByInterest(user, interest)
        .then(match => {
            allMatches.push(match);
        })
        .catch(err => callback(err, undefined));
    });

    setTimeout(() => {
        return callback(undefined, allMatches);
    }, 500);
}

// getCommonInterests(madlen, (err, res) => {
//     console.log(res);
// })

module.exports = getCommonInterests;