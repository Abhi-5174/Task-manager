
const Notification = require('../models/notificationModel');
const sendEmail = require('../utils/sendEmail');

// Get all notifications for the logged-in user
exports.getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        next(err);
    }
};

// Send a notification email to the user
exports.sendNotification = async (req, res, next) => {
    try {
        const { email, subject, message } = req.body;

        // Use sendEmail utility to send the notification email
        await sendEmail(email, subject, message, `<p>${message}</p>`);

        res.status(200).json({ msg: 'Notification sent successfully' });
    } catch (err) {
        next(err);
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.notificationId, { read: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (err) {
        next(err);
    }
};