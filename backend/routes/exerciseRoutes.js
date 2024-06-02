// exerciseRoutes.js

const express = require('express');
const {
    addExercise,
    getAllExercises,
    getExercise,
    updateExerciseById,
    deleteExerciseById,
} = require('../controllers/exerciseController');
const router = express.Router();

router.post('/', addExercise);
router.get('/', getAllExercises);
router.get('/:id', getExercise);
router.put('/:id', updateExerciseById);
router.delete('/:id', deleteExerciseById);

module.exports = router;
