// userController.js

const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../models/userModel');
const Joi = require('joi');

// Define the schema for validation
const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
});

const addUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { username, password, email, age, gender, height, weight } = req.body;
        const newUser = await createUser(username, password, email, age, gender, height, weight);
        res.status(201).json({ insertedId: newUser });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Failed to add user' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const updateUserById = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { id } = req.params;
        const { username, password, email, age, gender, height, weight } = req.body;
        const success = await updateUser(id, { username, password, email, age, gender, height, weight });
        if (!success) {
            return res.status(404).json({ error: 'User not found or no changes made' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await deleteUser(id);
        if (!success) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUserById,
    deleteUserById,
};
