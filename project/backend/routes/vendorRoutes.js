const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');

// 📋 Get all vendors
router.get('/all', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// ✅ Register a new vendor
router.post('/register', async (req, res) => {
  try {
    const { name, upiId, location, coordinates, cartStatus } = req.body;

    if (!name || !upiId) {
      return res.status(400).json({ message: 'Name and UPI ID are required' });
    }

    const existingVendor = await Vendor.findOne({ upiId });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already registered' });
    }

    const vendor = new Vendor({
      name,
      upiId,
      location: location || 'Not updated',
      cartStatus: cartStatus || 'Pending',
      coordinates: coordinates || {},
    });

    await vendor.save();
    res.status(201).json({ message: 'Vendor registered successfully ✅', vendor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔍 Get vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vendor' });
  }
});

// 🗑️ Delete vendor
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Vendor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json({ message: 'Vendor deleted 🗑️' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
});

// ✏️ Update vendor
router.put('/:id', async (req, res) => {
  try {
    const { name, upiId, location, coordinates, cartStatus } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { name, upiId, location, coordinates, cartStatus },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ message: 'Vendor updated successfully ✅', vendor });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update vendor' });
  }
});

module.exports = router;
