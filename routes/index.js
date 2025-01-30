
const express = require('express');
const router = express.Router();

// Import route modules
const taskRoutes = require('./tasksRoutes');
const userRoutes = require('./userRoutes');
const notificationRoutes = require('./notificationRoutes');
const reportRoutes = require('./reportRoutes');
const productivityRoutes = require('./productivityRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');

// Use route modules

router.use('/', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reports', reportRoutes);
router.use('/productivity', productivityRoutes);
router.use('/leaderboard', leaderboardRoutes);

module.exports = router;