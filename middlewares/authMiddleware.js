
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    
    // const token = req.header('x-auth-token');

    // if (!token) {
    //     return res.status(401).json({ msg: 'No token, authorization denied' });
    // }

    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        let user = await User.findById(decoded);
        req.user = user; // Adds the user to the request object
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};