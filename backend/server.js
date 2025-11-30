// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

// ⭐⭐⭐ PASTE EXPORT CSV ROUTE HERE ⭐⭐⭐
app.get("/api/export/attendance", async (req, res) => {
  const date = req.query.date;

  // Placeholder sample data (later replace with DB query)
  const data = [
    { name: "Apeksha", status: "Present" },
    { name: "Rohit", status: "Absent" },
  ];

  let csv = "Name,Status\n";
  data.forEach(d => {
    csv += `${d.name},${d.status}\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="attendance-${date}.csv"`
  );

  res.send(csv);
});
// ⭐⭐⭐ END OF EXPORT CSV ROUTE ⭐⭐⭐

const PORT = process.env.PORT || 5000;

// connect to MongoDB (no legacy options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server running on', PORT));
  })
  .catch(err => {
    console.error('Mongo connect error', err);
    process.exit(1);
  });
