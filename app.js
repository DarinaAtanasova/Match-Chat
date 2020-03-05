const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, database) => {
    if (error) {
        throw error
    }

    var db = database.db("match-and-chat")

    db.collection("users").findOne({}, (error, res) => {
        if (error) {
            throw error
        }

        console.log(res)
        database.close()
    })
})