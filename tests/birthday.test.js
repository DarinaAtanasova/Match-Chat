const {MongoClient} = require('mongodb');

ObjectID = require('mongodb').ObjectID

describe('match birthday', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://127.0.0.1:27017');
        db = await connection.db("match-and-chat");
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it('test if user have matches born on the same date', async () => {

        const matchByBirthday = (user, callback) => {  
            db.collection('users').aggregate([
                {
                    $match: {
                        birthday: user.birthday
                    }
                }
            ]).toArray().then(allMatches => {
                allMatches.forEach(matchedUser => {
                    if (matchedUser._id !== user._id) {
                        callback(undefined, matchedUser)
                    }
                });
            })
        }

        user_Madi = {
            _id: 1,
            name: 'Madi',
            birthday: new Date("2002-08-25"),
            interests: ['books', 'movies', 'tv']
        }

        matchByBirthday(user_Madi, (error, result) => {
            expect(result.name).toBe('Nick')
        })
    });
});