// nutritionModel.js

const { MongoClient } = require('mongodb');

let db;

async function connectDB(dbURI) {
    try {
        const client = new MongoClient(dbURI);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(); // Assign the database instance to the db variable
        console.log('Database initialized:', db !== undefined);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

async function createNutrition(userId, meal, calories, date) {
    if (!db) {
        throw new Error('Database not initialized');
    }
    try {
        const result = await db.collection('nutritions').insertOne({
            userId,
            meal,
            calories,
            date,
        });
        console.log('Nutrition created:', result.insertedId);
        return result.insertedId;
    } catch (err) {
        console.error('Error creating nutrition:', err);
        throw err;
    }
}

module.exports = {
    connectDB,
    createNutrition,
};
