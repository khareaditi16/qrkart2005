require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/auth');          // /api/login
const vendorRoutes = require('./routes/vendorRoutes'); // /api/vendor/...
const adminRoutes = require('./routes/admin');         // /api/admin/...

// ✅ Route Mounting
app.use('/api', authRoutes);          // POST /api/login
app.use('/api/vendor', vendorRoutes); // GET /api/vendor/...
app.use('/api/admin', adminRoutes);   // GET /api/admin/...

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected ✅'))
.catch((err) => console.error('MongoDB connection error:', err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
