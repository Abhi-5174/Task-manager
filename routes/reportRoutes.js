
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Get a report for a specific user (could be weekly, monthly)
router.get('/:userId', reportController.getReportForUser);

// Generate a new report (for admins or employers)
router.post('/generate', reportController.generateReport);

module.exports = router;