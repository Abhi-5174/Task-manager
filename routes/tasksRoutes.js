
const express = require('express');

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Middleware to authenticate and check user roles (optional, depending on access level)
router.use(authMiddleware);

// Get all tasks assigned to the logged-in user
router.get('/', taskController.getAllTasksForUser);

// Create a new task
router.post('/', taskController.createTask); // Only employers can create tasks

// Get a specific task by ID
router.get('/:taskId', taskController.getTaskById);

// Update a task's details (e.g., status, time spent)
router.put('/:taskId', taskController.updateTask);

// Delete a task
router.delete('/:taskId', taskController.deleteTask); // Only employers can delete tasks

module.exports = router;