require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const vendorRoutes = require('./routes/vendorRoutes');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/vendor', vendorRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5000}`)
  );
})
.catch((err) => console.error('❌ MongoDB connection error:', err));
