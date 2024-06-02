// exerciseModel.js

const { MongoClient, ObjectId } = require('mongodb');
const { getDB } = require('../config/database');
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    exerciseName: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

async function createExercise(userId, exerciseName, durationMinutes, caloriesBurned, date) {
    const db = getDB();
    try {
        const result = await db.collection('exercises').insertOne({
            userId,
            exerciseName,
            durationMinutes,
            caloriesBurned,
            date,
        });
        console.log('Exercise created:', result.insertedId);
        return result.insertedId;
    } catch (err) {
        console.error('Error creating exercise:', err);
        throw err;
    }
}

async function getExercises() {
    const db = getDB();
    try {
        const exercises = await db.collection('exercises').find({}).toArray();
        return exercises;
    } catch (err) {
        console.error('Error retrieving exercises:', err);
        throw err;
    }
}

async function getExerciseById(id) {
    const db = getDB();
    try {
        const exercise = await db.collection('exercises').findOne({ _id: new ObjectId(id) });
        return exercise;
    } catch (err) {
        console.error('Error retrieving exercise:', err);
        throw err;
    }
}

async function updateExercise(id, updatedExercise) {
    const db = getDB();
    try {
        const result = await db.collection('exercises').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedExercise }
        );
        return result.modifiedCount > 0;
    } catch (err) {
        console.error('Error updating exercise:', err);
        throw err;
    }
}

async function deleteExercise(id) {
    const db = getDB();
    try {
        const result = await db.collection('exercises').deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (err) {
        console.error('Error deleting exercise:', err);
        throw err;
    }
}

module.exports = {
    createExercise,
    getExercises,
    getExerciseById,
    updateExercise,
    deleteExercise,
    Exercise
};
