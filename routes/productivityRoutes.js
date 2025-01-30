
const express = require('express');
const router = express.Router();
const productivityController = require('../controllers/productivityController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get the current user's productivity metrics
router.get('/', authMiddleware, productivityController.getProductivityForUser);

// Get productivity for a specific user (e.g., employer checking employee productivity)
router.get('/:userId', authMiddleware, productivityController.getProductivityForUserById);

module.exports = router;