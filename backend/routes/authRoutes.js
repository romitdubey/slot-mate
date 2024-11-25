const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token});
});

// Protected Route (Dashboard)
router.get('/dashboard', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Welcome to the Dashboard!', userId: decoded.userId });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
});

module.exports = router;
