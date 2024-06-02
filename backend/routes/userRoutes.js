// userRoutes.js

const express = require('express');
const {
    addUser,
    getAllUsers,
    getUser,
    updateUserById,
    deleteUserById,
} = require('../controllers/userController');
const router = express.Router();

router.post('/', addUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
