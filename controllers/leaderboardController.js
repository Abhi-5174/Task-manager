const Task = require('../models/taskModel');
const User = require('../models/userModel');

// Get leaderboard of top-performing employees
exports.getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'employee' });
    const leaderboard = await Promise.all(users.map(async (user) => {
      const tasks = await Task.find({ assignedTo: user._id });
      const completedTasks = tasks.filter(task => task.status === 'Completed');
      const timeSpent = completedTasks.reduce((acc, task) => acc + task.timeSpent, 0);
      return { user, tasksCompleted: completedTasks.length, timeSpent };
    }));

    leaderboard.sort((a, b) => b.tasksCompleted - a.tasksCompleted); // Sort by tasks completed
    res.status(200).json(leaderboard);
  } catch (err) {
    next(err);
  }
};

// Get badges and rewards for a user
exports.getUserBadges = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Dummy example of badge logic
    const badges = [];
    const tasks = await Task.find({ assignedTo: req.user._id });
    if (tasks.length >= 10) badges.push('Task Master');
    if (tasks.filter(task => task.status === 'Completed').length >= 5) badges.push('Efficient Worker');

    res.status(200).json({ badges });
  } catch (err) {
    next(err);
  }
};