// nutritionRoutes.js

const express = require('express');
const router = express.Router();

// Import controller functions for handling nutrition-related operations
const { addNutrition } = require('../controllers/nutritionController');

// Define routes for nutrition-related operations
router.post('/', addNutrition);

module.exports = router;
