const jwt = require('jsonwebtoken');
const User = require('../model/User');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: "Invalid token - user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: `Authentication error: ${error.message}` });
  }
};

module.exports = {
  authenticateToken
};