const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Generate JWT
const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});
// PUT /api/admin/verify-vendor/:id
router.put('/verify-vendor/:id', async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    vendor.isVerified = !vendor.isVerified; // toggle
    await vendor.save();

    res.status(200).json({ message: 'Vendor verification status updated', vendor });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
