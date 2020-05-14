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

const getAll = (user, callback) => {
    let matches = [];
    user.interests.forEach(async (interest) => {
        let match = await matchByInterest(user, interest);
        matches.push(match);
    });
    setTimeout(() => {
        let distinctMatches = [];
        matches.forEach(element => {
            element.forEach(e => {
                distinctMatches.push(e);
            });
        });
        
        // Remove all duplicates user matched by interest if any
        const result = Array.from(new Set(distinctMatches.map(s => s._id.toString())))
                .map(id => {
                    return {
                        _id: id,
                        username: distinctMatches.find(s => s.id === id).username,
                        interests: distinctMatches.find(s => s.id === id).interests,
                        birthday: distinctMatches.find(s => s.id === id).birthday,
                        profilePic: distinctMatches.find(s => s.id === id).profilePic
                    }
                });
        callback(undefined, result);
    }, 500);
}

module.exports = getAll;
