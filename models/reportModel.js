
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reportType: { type: String, enum: ['Weekly', 'Monthly'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tasksCompleted: { type: Number, required: true },
    tasksMissed: { type: Number, required: true },
    efficiencyScore: { type: Number, required: true },
    generatedAt: { type: Date, default: Date.now },
    content: {
        totalTimeSpent: { type: Number, required: true },
        timeSpentOnHighPriority: { type: Number, required: true }
    }
});

module.exports = mongoose.model('Report', reportSchema);