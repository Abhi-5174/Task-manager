
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    timeSpent: { type: Number}, // in hours
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    deadline: { type: Date, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, enum: ['BAU', 'Ad Hoc', 'Project-Based'] },
    estimatedTime: { type: Number }, // in hours
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    reference: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String },
        timestamp: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Task', taskSchema);