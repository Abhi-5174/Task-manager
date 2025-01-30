
// Error handling middleware
module.exports = (err, req, res, next) => {
    console.error(err.stack);  // Log error stack for debugging (can be replaced with a logger)

    // If it's a validation error or a custom error, return a 400 status with the message
    if (err.name === 'ValidationError') {
        return res.status(400).json({ msg: 'Validation error', errors: err.errors });
    }

    // If it's a mongoose cast error (invalid object ID), return 400
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }

    // Handle other types of errors (e.g., authentication failure, etc.)
    if (err.status) {
        return res.status(err.status).json({ msg: err.message });
    }

    // Default error handler for unhandled cases
    res.status(500).json({
        msg: 'Server error, please try again later.',
        error: err.message || 'Unknown error',
    });
};  