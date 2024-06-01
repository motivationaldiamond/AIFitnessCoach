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

async function getNutritions() {
    const db = getDB();
    try {
        const nutritions = await db.collection('nutritions').find({}).toArray();
        return nutritions;
    } catch (err) {
        console.error('Error retrieving nutritions:', err);
        throw err;
    }
}

async function getNutritionById(id) {
    const db = getDB();
    try {
        const nutrition = await db.collection('nutritions').findOne({ _id: new ObjectId(id) });
        return nutrition;
    } catch (err) {
        console.error('Error retrieving nutrition:', err);
        throw err;
    }
}

async function updateNutrition(id, updatedNutrition) {
    const db = getDB();
    try {
        const result = await db.collection('nutritions').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedNutrition }
        );
        return result.modifiedCount > 0;
    } catch (err) {
        console.error('Error updating nutrition:', err);
        throw err;
    }
}

async function deleteNutrition(id) {
    const db = getDB();
    try {
        const result = await db.collection('nutritions').deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (err) {
        console.error('Error deleting nutrition:', err);
        throw err;
    }
}

module.exports = {
    createNutrition,
    getNutritions,
    getNutritionById,
    updateNutrition,
    deleteNutrition,
};
