// backend/models/Vendor.js
import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  upiId: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  location: { type: String, default: 'Not updated' },
  cartStatus: { type: String, default: 'Pending' },
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
