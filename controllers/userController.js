
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
// const config = require('../config/config');
const generateToken = require('../utils/generateToken');
const Task = require('../models/taskModel');

// Register a new user (employee or employer)
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role || role === "") {
      return res.render('register', { input: "All field requires!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.render('register', { input: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    const token = generateToken(newUser._id);
    res.cookie('token', token);

    res.render("login", { input: false });

  } catch (err) {
    next(err);
  }
};

// Login an existing user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { input: "Email and password required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { input: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { input: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.cookie('token', token);

    res.redirect('/profile');

  } catch (err) {
    next(err);
  }
};

// Get the current user's profile
exports.getProfile = async (req, res, next) => {
  try {

    if (!req.user) {
      return res.render('dashboard');
    }

    req.user.tasks = await Task.find();
    
    if (req.user.role === 'employee') {
      res.render('dashboard', {user: req.user});
    } else {
      res.render('adminDashboard', {user: req.user});
    }

  } catch (err) {
    next(err);
  }
};

// Update the current user's profile
exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if(updatedUser.role === 'employer'){
      res.render('adminDashboard', {input: updatedUser});
    } else{
      res.render('dashboard', {input: updatedUser});
    }

  } catch (err) {
    next(err);
  }
};