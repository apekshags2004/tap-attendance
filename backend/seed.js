// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function run(){
  await mongoose.connect(process.env.MONGO_URI);
  const u1 = await User.findOne({ email: 'employee@example.com' });
  if (!u1) {
    await User.create({ name:'Employee', email:'employee@example.com', password: await bcrypt.hash('password',10), role:'employee', employeeId:'EMP001' });
  }
  const m1 = await User.findOne({ email: 'manager@example.com' });
  if (!m1) {
    await User.create({ name:'Manager', email:'manager@example.com', password: await bcrypt.hash('password',10), role:'manager', employeeId:'M001' });
  }
  console.log('Seed completed');
  process.exit(0);
}
run();
