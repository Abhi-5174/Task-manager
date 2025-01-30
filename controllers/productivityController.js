const Task = require('../models/taskModel');
const User = require('../models/userModel');

// Get the current user's productivity metrics
exports.getProductivityForUser = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id });
    const completedTasks = tasks.filter(task => task.status === 'Completed');
    const timeSpent = completedTasks.reduce((acc, task) => acc + task.timeSpent, 0);

    res.status(200).json({ totalTasks: tasks.length, completedTasks: completedTasks.length, timeSpent });
  } catch (err) {
    next(err);
  }
};

// Get productivity for a specific user (for employers)
exports.getProductivityForUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const tasks = await Task.find({ assignedTo: user._id });
    const completedTasks = tasks.filter(task => task.status === 'Completed');
    const timeSpent = completedTasks.reduce((acc, task) => acc + task.timeSpent, 0);

    res.status(200).json({ totalTasks: tasks.length, completedTasks: completedTasks.length, timeSpent });
  } catch (err) {
    next(err);
  }
};