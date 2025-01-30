
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['employee', 'employer'], required: true },
    name: { type: String, required: true },
    hireDate: { type: Date, default: Date.now },
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    performanceMetrics: {
        averageEfficiencyScore: { type: Number, default: 0 },
        totalTasksCompleted: { type: Number, default: 0 },
        tasksCompletedOnTime: { type: Number, default: 0 }
    },
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }]
});

module.exports = mongoose.model('User', userSchema);