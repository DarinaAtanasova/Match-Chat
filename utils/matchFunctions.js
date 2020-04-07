const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

ObjectID = mongodb.ObjectID

const findBestMatch = require('./findBest.js')

const connectionURL = 'mongodb://127.0.0.1:27017'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, database) => {
    if (error) {
        throw error
    }

    var db = database.db("match-and-chat")

    const matchByBirthday = (user) => {  
        db.collection('users').aggregate([
            {
                $match: {
                    birthday: user.birthday
                }
            }
        ]).toArray().then(allMatches => {
            allMatches.forEach(matchedUser => {
                if (matchedUser._id !== user._id){
                    console.log('User ' + user.name + ' matched by birthday with: ' + matchedUser.name)
                }
            });
        })
    }
    
    // Match user with common interests
    function matchByInterest (user, interest, callback) {
        db.collection('users').find(
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
        ).toArray((error, result) => {
            if (error) {
                callback(error, undefined)
            }

            callback(undefined, result)
        })
    }

    const allInterests = (user) => {
        let allMatchedUsers = []
        user.interests.forEach(interest => {
            matchByInterest(user, interest, function(error, result){
                result.forEach(m => {
                    // Uncomment below for getting matched user ids in string format
                    // allMatchedUsers.push(m._id.toString())
                    allMatchedUsers.push(m.name)
                });
            })
        });

        setTimeout(() => {
            console.log(user.name + ' matched with: ')
            console.log(allMatchedUsers)
            console.log('Best match with: ' + findBestMatch(allMatchedUsers))
        }, 2000)
    }

    db.collection('users').find({}).toArray((error, users) => {
        if (error) {
            throw error
        }

        users.forEach(user => {
            matchByBirthday(user)
            allInterests(user)
        });
        
    })

    setTimeout(() => {
        database.close()
    }, 500)
})