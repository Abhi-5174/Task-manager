
const Report = require('../models/reportModel');

// Get a report for a specific user
exports.getReportForUser = async (req, res, next) => {
  try {
    const report = await Report.findOne({ user: req.params.userId }).sort({ createdAt: -1 });
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

// Generate a new productivity report
exports.generateReport = async (req, res, next) => {
  try {
    const { userId, period, tasksCompleted, totalTimeSpent } = req.body;

    const newReport = new Report({
      user: userId,
      period,
      tasksCompleted,
      totalTimeSpent
    });

    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    next(err);
  }
};