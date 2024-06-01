// nutritionController.js

const { createNutrition, getNutritions, getNutritionById, updateNutrition, deleteNutrition } = require('../models/nutritionModel');
const Joi = require('joi');
const { ObjectId } = require('mongodb');

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

const getAllNutritions = async (req, res) => {
    try {
        const nutritions = await getNutritions();
        res.status(200).json(nutritions);
    } catch (err) {
        console.error('Error retrieving nutritions:', err);
        res.status(500).json({ error: 'Failed to retrieve nutritions' });
    }
};

const getNutrition = async (req, res) => {
    try {
        const { id } = req.params;
        const nutrition = await getNutritionById(id);
        if (!nutrition) {
            return res.status(404).json({ error: 'Nutrition not found' });
        }
        res.status(200).json(nutrition);
    } catch (err) {
        console.error('Error retrieving nutrition:', err);
        res.status(500).json({ error: 'Failed to retrieve nutrition' });
    }
};

const updateNutritionById = async (req, res) => {
    const { error } = nutritionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { id } = req.params;
        const { userId, meal, calories, date } = req.body;
        const success = await updateNutrition(id, { userId, meal, calories, date });
        if (!success) {
            return res.status(404).json({ error: 'Nutrition not found or no changes made' });
        }
        res.status(200).json({ message: 'Nutrition updated successfully' });
    } catch (err) {
        console.error('Error updating nutrition:', err);
        res.status(500).json({ error: 'Failed to update nutrition' });
    }
};

const deleteNutritionById = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await deleteNutrition(id);
        if (!success) {
            return res.status(404).json({ error: 'Nutrition not found' });
        }
        res.status(200).json({ message: 'Nutrition deleted successfully' });
    } catch (err) {
        console.error('Error deleting nutrition:', err);
        res.status(500).json({ error: 'Failed to delete nutrition' });
    }
};

module.exports = {
    addNutrition,
    getAllNutritions,
    getNutrition,
    updateNutritionById,
    deleteNutritionById,
};

