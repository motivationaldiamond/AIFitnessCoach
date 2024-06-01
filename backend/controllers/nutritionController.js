// nutritionController.js

const { createNutrition } = require('../models/nutritionModel');

const addNutrition = async (req, res) => {
    try {
        const { userId, meal, calories, date } = req.body;
        const newNutrition = await createNutrition(userId, meal, calories, date);
        res.status(201).json({ insertedId: newNutrition });
    } catch (error) {
        console.error('Error adding nutrition:', error);
        res.status(500).json({ error: 'Failed to add nutrition' });
    }
};

module.exports = {
    addNutrition,
};

