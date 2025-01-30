
const Task = require('../models/taskModel');
const User = require('../models/userModel');

// Get all tasks assigned to the logged-in user
exports.getAllTasksForUser = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    // const tasks = await Task.find({ assignedTo: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, timeSpent, priority, deadline } = req.body;

    if (!title || !description || timeSpent || !priority || !deadline) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const newTask = new Task({
      title,
      description,
      timeSpent,
      priority,
      deadline,
      aassignedTo: req.user._id
    });

    await newTask.save();

    req.user.tasks = await Task.find();

    res.redirect('/profile');

  } catch (err) {
    next(err);
  }
};

// Get task details by task ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Update task details (e.g., status, time spent)
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(200).json({ msg: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
};