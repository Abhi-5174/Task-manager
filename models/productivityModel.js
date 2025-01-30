
const mongoose = require('mongoose');

const productivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    efficiencyScore: { type: Number, required: true },
    tasksCompleted: { type: Number, required: true },
    tasksOverdue: { type: Number, required: true },
    tasksPending: { type: Number, required: true }
});

module.exports = mongoose.model('Productivity', productivitySchema);