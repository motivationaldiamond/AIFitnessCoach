//nutritionRoutes.js

const express = require('express');
const router = express.Router();

// Import controller functions for handling nutrition-related operations
const { getNutritionData, addNutritionData } = require('../controllers/nutritionController');

// Define routes for nutrition-related operations
router.get('/', getNutritionData);
router.post('/', addNutritionData);

module.exports = router;
