const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

ObjectID = mongodb.ObjectID

const findBestMatch = require('./utils/findBest.js')

const connectionURL = 'mongodb://127.0.0.1:27017'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, async (error, database) => {
    if (error) {
        throw error
    }

    var db = database.db("match-and-chat")

    // Match users with the same birthdays
    db.collection('users').find({}).toArray((error, users) => {
        if (error) {
            throw error
        }
        
        users.forEach(user => {
            matchByBirthday(user)
        });
    })

    const matchByBirthday = (user) => {  
        db.collection('users').aggregate([
            {
                $match: {
                    birthday: user.birthday
                }
            }
        ]).toArray().then(allMatches => {
            allMatches.forEach(matchedUser => {
                if (!matchedUser._id.equals(user._id)) {
                    console.log('User ' + user.name + ' matched by birthday with: ' + matchedUser.name)
                }
            });
        })
    }
    
    // Match user with common interests
    function matchByInterest (interest, callback) {
        db.collection('users').find(
            {
                interests: {
                    $elemMatch: {
                        $eq: interest
                    }
                }
            }
        ).toArray((error, result) => {
            if (error) {
                throw error
            }
            
            return callback(undefined, result)
            // result.forEach(match => {
            //     if (user.name !== match.name) {
            //         console.log(user.name + ' matched with ' + match.name)                    
            //         console.log('They are both interest in ' + interest)
            //         console.log()
            //     }
            // });
        })
    }

    const allInterests = (user) => {
        let allMatchedUsers = []
        var match;
        user.interests.forEach(interest => {
            matchByInterest(interest, function(error, result){
                match = result
                match.forEach(m => {
                    allMatchedUsers.push(m)
                });
            })
        });

        setTimeout(() => {
            console.log(allMatchedUsers)
        }, 3000)
        // return allMatchedUsers
    }

    db.collection('users').find({}).toArray((error, users) => {
        if (error) {
            throw error
        }

        allInterests(users[0])
        
    })

    setTimeout(() => {
        database.close()
    }, 500)
})