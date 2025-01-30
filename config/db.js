
const mongoose = require('mongoose');
const config = require('./config'); // Import config file

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from the config file
        await mongoose.connect(config.mongoURI);

    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);

        // Retry connection every 5 seconds if the connection fails
        setTimeout(connectDB, 5000);
    }
};

// MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection lost, attempting to reconnect...');
});

module.exports = connectDB;