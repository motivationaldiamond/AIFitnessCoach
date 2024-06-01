//database.js

const { MongoClient } = require('mongodb');
const { dbURI } = require('../../backend/config/keys');

let db;

const connectDB = async () => {
    try {
        const client = new MongoClient(dbURI);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(); // Assuming your database name is already included in the URI
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
};

module.exports = { connectDB, getDB };
