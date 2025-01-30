
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookie = require('cookie-parser');

const config = require('./config/config');  // Import config file
const connectDB = require('./config/db');  // Import db.js file
const router = require('./routes/index');

const app = express();
const PORT = config.port || 5000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookie());

app.use(router);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});