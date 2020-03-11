const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'match-and-chat'


MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw error;
    }
    console.log('Database ' + databaseName + ' created!')
    
    const db = client.db(databaseName)
    const userCollection = db.collection("users")

    userCollection.insertMany([
        {
            name: 'Madi',
            birthday: new Date("2002-08-25"),
            interests: ['books', 'movies', 'tv']
        },
        {
            name: 'Johnny',
            birthday: new Date("2005-12-05"),
            interests: ['cooking', 'movies', 'bikes']
        },
        {
            name: 'Mike',
            birthday: new Date("2010-01-10"),
            interests: ['cooking', 'football', 'sports']
        },
        {
            name: 'Nick',
            birthday: new Date("2002-08-25"),
            interests: ['fashion', 'cooking', 'singing']
        },
        {
            name: 'Dari',
            birthday: new Date("2002-06-25"),
            interests: ['sports', 'tv', 'magic']
        },
        {
            name: 'Mimi',
            birthday: new Date("2004-07-12"),
            interests: ['football', 'baking', 'magic']
        },
        {
            name: 'Josh',
            birthday: new Date("2008-02-15"),
            interests: ['baking', 'tv', 'ckricket']
        },
        {
            name: 'Pete',
            birthday: new Date("1998-04-20"),
            interests: ['fashion', 'singing']
        },
        {
            name: 'Kate',
            birthday: new Date("1978-10-13"),
            interests: ['drama', 'talk-shows', 'cleaning']
        },
        {
            name: 'Porsha',
            birthday: new Date("1989-04-20"),
            interests: ['boxing', 'modeling', 'baking']
        },
        {
            name: 'Johnny',
            birthday: new Date("2006-09-13"),
            interests: ['drama', 'bikes', 'glasses']
        }
    ], (error, result) => {
        if (error) {
            return console.log('Error!')
        }
    })
})