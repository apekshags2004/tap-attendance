// routes/attendance.js (append or replace)
// requires Attendance mongoose model and auth middleware

const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance'); // create below if not present
const auth = require('../middleware/auth'); // ensure JWT middleware sets req.user
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // store 'YYYY-MM-DD' to simplify queries
  checkIn: { type: String, default: null }, // ISO timestamp
  checkOut: { type: String, default: null },
  status: { type: String, default: null } // optional derived field
}, { timestamps: true });

AttendanceSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);

// helper: date-only ISO string 'YYYY-MM-DD'
const dateOnly = (d = new Date()) => d.toISOString().slice(0,10);

// GET /attendance/today
router.get('/today', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const day = dateOnly();
    const record = await Attendance.findOne({ user: userId, date: day });
    if (!record) return res.json({ status: 'Not Checked' });
    res.json({
      status: record.checkIn && record.checkOut ? 'Checked Out' : (record.checkIn ? 'Present' : 'Not Checked'),
      checkIn: record.checkIn || null,
      checkOut: record.checkOut || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /attendance/checkin
router.post('/checkin', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const day = dateOnly();
    const now = new Date().toISOString();
    let rec = await Attendance.findOne({ user: userId, date: day });
    if (!rec) {
      rec = new Attendance({ user: userId, date: day, checkIn: now });
    } else {
      // if checkIn already exists, optionally ignore or update
      rec.checkIn = rec.checkIn || now;
    }
    await rec.save();
    res.json({ message: 'Checked in', checkIn: rec.checkIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Check-in failed' });
  }
});

// POST /attendance/checkout
router.post('/checkout', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const day = dateOnly();
    const now = new Date().toISOString();
    let rec = await Attendance.findOne({ user: userId, date: day });
    if (!rec) {
      // User didn't check in but checking out – create record with checkOut only (or deny)
      rec = new Attendance({ user: userId, date: day, checkOut: now });
    } else {
      rec.checkOut = now;
    }
    await rec.save();
    res.json({ message: 'Checked out', checkOut: rec.checkOut });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Check-out failed' });
  }
});

module.exports = router;
