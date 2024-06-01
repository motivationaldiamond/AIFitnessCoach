// exerciseController.js

const { createExercise } = require('../models/exerciseModel');

async function addExercise(req, res) {
    const { userId, type, duration, date } = req.body;
    try {
        const exerciseId = await createExercise(userId, type, duration, date);
        res.status(201).json({ exerciseId });
    } catch (err) {
        console.error('Error adding exercise:', err);
        res.status(500).json({ error: 'Failed to add exercise' });
    }
}

module.exports = {
    addExercise,
};
