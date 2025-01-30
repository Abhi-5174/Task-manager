
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', (req, res, next) => {
    res.render('homepage');
});

router.get('/login', (req, res, next) => {
    res.render('login', {input: false});
});

// Login an existing user
router.post('/login', userController.login);

router.get('/logout', (req, res, next) => {
    res.cookie('token', "");
    res.redirect('/');
});

router.get('/register', (req, res, next) => {
    res.render('register', {input: false});
});

// Register a new user (employee or employer)
router.post('/register', userController.register);

// Get the current user's profile
router.get('/profile', authMiddleware, userController.getProfile);

// Update the current user's profile
router.post('/updateProfile', authMiddleware, userController.updateProfile);

module.exports = router;