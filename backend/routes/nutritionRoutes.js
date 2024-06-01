// nutritionRoutes.js

const express = require('express');
const {
    addNutrition,
    getAllNutritions,
    getNutrition,
    updateNutritionById,
    deleteNutritionById,
} = require('../controllers/nutritionController');
const router = express.Router();

router.post('/', addNutrition);
router.get('/', getAllNutritions);
router.get('/:id', getNutrition);
router.put('/:id', updateNutritionById);
router.delete('/:id', deleteNutritionById);

module.exports = router;
