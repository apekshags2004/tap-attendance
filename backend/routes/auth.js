// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// register
router.post('/register', async (req, res) => {
  try {
    const { name,email,password,role,employeeId,department } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing email/password' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name,email,password:hashed,role,employeeId,department });
    res.json({ ok:true, user });
  } catch(e){
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

// login
router.post('/login', async (req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch(e){
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
