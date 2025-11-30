// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function(req,res,next){
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = await User.findById(data.id).select('-password');
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
