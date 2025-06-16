const express = require('express');
const Vendor = require('../models/Vendor');
const Alert = require('../models/Alert');
const { isAdmin } = require('../middleware/isAdmin');

const router = express.Router();

// ✅ GET all vendors
router.get('/vendors', isAdmin, async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all alerts
router.get('/alerts', isAdmin, async (req, res) => {
  try {
    const alerts = await Alert.find().populate('vendorId', 'name');
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new alert
router.post('/alerts', isAdmin, async (req, res) => {
  const { vendorId, message } = req.body;
  try {
    const newAlert = new Alert({ vendorId, message });
    await newAlert.save();
    res.status(201).json({ message: 'Alert added!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PATCH: Toggle verify/unverify vendor
router.patch('/vendor/verify/:id', isAdmin, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    vendor.isVerified = !vendor.isVerified;
    await vendor.save();

    res.status(200).json({
      message: `Vendor ${vendor.isVerified ? 'verified' : 'unverified'}`,
      vendor,
    });
  } catch (err) {
    console.error('Error verifying vendor:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT: Update vendor info
router.put('/vendor/:id', isAdmin, async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE: Vendor
router.delete('/vendor/:id', isAdmin, async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
