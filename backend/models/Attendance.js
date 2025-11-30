const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },  // YYYY-MM-DD
  checkInTime: { type: String },
  checkOutTime: { type: String },
  status: { type: String, default: "Present" },
  totalHours: { type: String }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);