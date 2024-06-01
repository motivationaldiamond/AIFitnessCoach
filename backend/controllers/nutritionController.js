// nutritionController.js

const { createNutrition } = require('../models/nutritionModel');
const Joi = require('joi');

// Define the schema for validation
const nutritionSchema = Joi.object({
    userId: Joi.string().required(),
    meal: Joi.string().required(),
    calories: Joi.number().required(),
    date: Joi.date().required(),
});

const addNutrition = async (req, res) => {
    const { error } = nutritionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { userId, meal, calories, date } = req.body;
        const newNutrition = await createNutrition(userId, meal, calories, date);
        res.status(201).json({ insertedId: newNutrition });
    } catch (err) {
        console.error('Error adding nutrition:', err);
        res.status(500).json({ error: 'Failed to add nutrition' });
    }
};

module.exports = {
    addNutrition,
};


