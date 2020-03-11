const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, database) => {
    if (error) {
        throw error
    }

    var db = database.db("match-and-chat")


    // Find user Madi and then search who has the same birthday as Madi's
    db.collection('users').findOne({ name: 'Madi'}, (error, user) => {
        if (error) {
            console.log('Unable to find matches')
        }

        db.collection('users').find({ birthday: user.birthday }).toArray((error, users) => {
            if (error) {
                console.log('No user matches this birthday!')
            }

            console.log('Users matching with birthday are: ')
            users.forEach(user => {
                console.log(user.name)
            });
        })
    })

    // Find all users with the name of Johnny
    db.collection('users').aggregate([
        {
            $match: {
                name: "Johnny"
            }
        }
    ]).toArray().then(result => {
        console.log('Users with the name of Johnny are: ')
        console.log(result)
    })

    // Find all users with birthday 2002-08-25
    db.collection('users').aggregate([
        {
            $match: {
                birthday: new Date("2002-08-25")
            }
        }
    ]).toArray().then(result => {
        console.log('Users with the same birthday are: ')
        console.log(result)
    })

    // Find all users with interests in cooking
    db.collection('users').aggregate([
        {
            $match: {
                interests: "cooking"
            }
        }
    ]).toArray().then(result => {
        console.log('Users with interest in cooking are: ')
        console.log(result)
    })
})