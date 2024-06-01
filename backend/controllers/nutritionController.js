// nutritionController.js

const { createNutrition } = require('../models/nutritionModel');

async function addNutrition(req, res) {
    const { userId, meal, calories, date } = req.body;
    try {
        const nutritionId = await createNutrition(userId, meal, calories, date);
        res.status(201).json({ nutritionId });
    } catch (err) {
        console.error('Error adding nutrition:', err);
        res.status(500).json({ error: 'Failed to add nutrition' });
    }
}

module.exports = {
    addNutrition,
};
