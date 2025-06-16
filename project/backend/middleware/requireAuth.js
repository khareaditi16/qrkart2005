const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // Check for token
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required ❌' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select('_id');
    next(); // ✅ Move to the next middleware/controller
  } catch (err) {
    res.status(401).json({ error: 'Request not authorized 🔐' });
  }
};

module.exports = requireAuth;
