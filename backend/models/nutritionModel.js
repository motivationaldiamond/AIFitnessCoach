// nutritionModel.js

const { getDB } = require('../config/database');

async function createNutrition(userId, meal, calories, date) {
    const db = getDB();
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
    createNutrition,
};
