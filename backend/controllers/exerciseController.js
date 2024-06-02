// exerciseController.js

const { createExercise, getExercises, getExerciseById, updateExercise, deleteExercise } = require('../models/exerciseModel');
const Joi = require('joi');

// Define the schema for validation
const exerciseSchema = Joi.object({
    userId: Joi.string().required(),
    exerciseName: Joi.string().required(),
    durationMinutes: Joi.number().required(),
    caloriesBurned: Joi.number().required(),
    date: Joi.date().required(),
});

const addExercise = async (req, res) => {
    const { error } = exerciseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { userId, exerciseName, durationMinutes, caloriesBurned, date } = req.body;
        const newExercise = await createExercise(userId, exerciseName, durationMinutes, caloriesBurned, date);
        res.status(201).json({ insertedId: newExercise });
    } catch (err) {
        console.error('Error adding exercise:', err);
        res.status(500).json({ error: 'Failed to add exercise' });
    }
};

const getAllExercises = async (req, res) => {
    try {
        const exercises = await getExercises();
        res.status(200).json(exercises);
    } catch (err) {
        console.error('Error retrieving exercises:', err);
        res.status(500).json({ error: 'Failed to retrieve exercises' });
    }
};

const getExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await getExerciseById(id);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.status(200).json(exercise);
    } catch (err) {
        console.error('Error retrieving exercise:', err);
        res.status(500).json({ error: 'Failed to retrieve exercise' });
    }
};

const updateExerciseById = async (req, res) => {
    const { error } = exerciseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { id } = req.params;
        const { userId, exerciseName, durationMinutes, caloriesBurned, date } = req.body;
        const success = await updateExercise(id, { userId, exerciseName, durationMinutes, caloriesBurned, date });
        if (!success) {
            return res.status(404).json({ error: 'Exercise not found or no changes made' });
        }
        res.status(200).json({ message: 'Exercise updated successfully' });
    } catch (err) {
        console.error('Error updating exercise:', err);
        res.status(500).json({ error: 'Failed to update exercise' });
    }
};

const deleteExerciseById = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await deleteExercise(id);
        if (!success) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (err) {
        console.error('Error deleting exercise:', err);
        res.status(500).json({ error: 'Failed to delete exercise' });
    }
};

module.exports = {
    addExercise,
    getAllExercises,
    getExercise,
    updateExerciseById,
    deleteExerciseById,
};
