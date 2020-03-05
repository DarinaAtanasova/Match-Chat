const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, database) => {
    if (error) {
        throw error
    }

    var db = database.db("match-and-chat")

    db.collection('users').findOne({ name: 'Madi'}, (error, user) => {
        if (error) {
            console.log('Unable to find matches')
        }

        db.collection('users').find({ birthday: user.birthday }).toArray((error, users) => {
            if (error) {
                console.log('No user matches this birthday!')
            }

            console.log('Users matching with the same birthday are: ')
            users.forEach(user => {
                console.log(user.name)
            });
        })
    })
})