// userModel.js

const { MongoClient, ObjectId } = require('mongodb');
const { getDB } = require('../config/database');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

async function createUser(username, password, email, age, gender, height, weight) {
    const db = getDB();
    try {
        const result = await db.collection('users').insertOne({
            username,
            password,
            email,
            age,
            gender,
            height,
            weight,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log('User created:', result.insertedId);
        return result.insertedId;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

async function getUsers() {
    const db = getDB();
    try {
        const users = await db.collection('users').find({}).toArray();
        return users;
    } catch (err) {
        console.error('Error retrieving users:', err);
        throw err;
    }
}

async function getUserById(id) {
    const db = getDB();
    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
        return user;
    } catch (err) {
        console.error('Error retrieving user:', err);
        throw err;
    }
}

async function updateUser(id, updatedUser) {
    const db = getDB();
    try {
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedUser, $currentDate: { updatedAt: true } }
        );
        return result.modifiedCount > 0;
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

async function deleteUser(id) {
    const db = getDB();
    try {
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    User
};
