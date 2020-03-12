const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

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
            db.collection('users').aggregate([
                {
                    $match: {
                        birthday: user.birthday
                    }
                }
            ]).toArray().then(allMatches => {
                allMatches.forEach(matchedUser => {
                    if (matchedUser.name !== user.name) {
                        console.log('User ' + user.name + ' matched with: ' + matchedUser.name)
                    }
                });
            })
        });
    })
    
    // Match user with common interests
    const matchByInterest = (user, interest) => {
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
            
            result.forEach(match => {
                if (user.name !== match.name) {
                    console.log(user.name + ' matched with ' + match.name)                    
                    console.log('They are both interest in ' + interest)
                    console.log()
                }
            });
        })
    }

    db.collection('users').find({}).toArray((error, users) => {
        if (error) {
            throw error
        }

        users.forEach(user => {
            // Match current user with someone who has the 1st interest as user
            matchByInterest(user, user.interests[0])
        });
    })

    setTimeout(() => {
        database.close()
    }, 500)
})