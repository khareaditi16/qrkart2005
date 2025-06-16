import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Alert', AlertSchema);
