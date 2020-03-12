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

    setTimeout(() => {
        database.close()
    }, 500)
})