// Load environment variables from .env file
require('dotenv').config();

// Configuration settings
const config = {
  // MongoDB URI for connecting to the database
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task-productivity',

  // JWT secret for generating tokens
  jwtSecret: process.env.JWT_SECRET,

  // Port for the server to run on
  port: process.env.PORT || 3000,

  // SendGrid API Key (or any email service you use)
  emailAPIKey: process.env.EMAIL_API_KEY,

  // API base URL (useful for external services)
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5000/',

  // Optional: third-party service configurations (if any)
  thirdPartyServiceAPI: process.env.THIRD_PARTY_SERVICE_API_KEY
};

module.exports = config;