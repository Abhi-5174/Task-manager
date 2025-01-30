
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Utility function to generate a JWT token
const generateToken = (userId) => {
  const token = jwt.sign(userId.toString(), config.jwtSecret);
  // const token = jwt.sign(userId, config.jwtSecret);
  return token;
};

module.exports = generateToken;