
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Performance Alert', 'Deadline Reminder', 'General'], required: true },
    message: { type: String, required: true },
    readStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    actionRequired: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);