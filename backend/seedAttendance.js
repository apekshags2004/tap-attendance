// seedAttendance.js — create sample attendance for employee@example.com
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Attendance = require('./models/Attendance');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');

  const user = await User.findOne({ email: 'employee@example.com' });
  if (!user) {
    console.error('employee user not found');
    await mongoose.disconnect();
    process.exit(1);
  }

  // create last 5 days of data
  const docs = [1,2,3,4,5].map(n => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    const isoDate = d.toISOString().slice(0,10);
    return {
      user: user._id,
      date: isoDate,
      checkInTime: '09:05',
      checkOutTime: '17:00',
      status: 'Present',
      totalHours: '7h 55m'
    };
  });

  for (const doc of docs) {
    // use updateOne with upsert (safe and supported)
    await Attendance.updateOne(
      { user: doc.user, date: doc.date },
      { $set: doc },
      { upsert: true }
    );
    console.log('Upserted', doc.date);
  }

  console.log('Seeding done');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });