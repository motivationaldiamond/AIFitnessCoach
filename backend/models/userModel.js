// userModel.js

const { MongoClient } = require('mongodb');

let db;

async function connectDB(dbURI) {
    try {
        const client = new MongoClient(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(); // Assuming your database name is already included in the URI
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

async function createUser(username, email, age, height, weight) {
    try {
        const result = await db.collection('users').insertOne({
            username,
            email,
            age,
            height,
            weight,
        });
        console.log('User created:', result.insertedId);
        return result.insertedId;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

module.exports = {
    connectDB,
    createUser,
};
