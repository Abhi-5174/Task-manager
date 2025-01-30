const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get the leaderboard (top-performing employees)
router.get('/leaderboard', authMiddleware, leaderboardController.getLeaderboard);

// Get the badges and rewards for the current user
router.get('/badges', authMiddleware, leaderboardController.getUserBadges);

module.exports = router;