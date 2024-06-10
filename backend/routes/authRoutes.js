//authRoutes.js

const express = require('express');
const router = express.Router();
const AuthService = require('../services/user/authService');

// Register route
router.post('/register', async (req, res) => {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get user by username route
router.get('/user/:username', async (req, res) => {
    try {
        const user = await AuthService.getUserByUsername(req.params.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
