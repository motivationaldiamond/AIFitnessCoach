// nutritionModel.js

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

async function createNutrition(userId, meal, calories, date) {
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
