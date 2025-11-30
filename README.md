📝 TAP Attendance Management System

A full-stack web application for managing employee attendance with secure authentication, daily check-in/check-out, attendance history, calendar view, monthly summary, and manager dashboard with CSV export.

Built using:

Frontend: React + Vite

Backend: Node.js + Express

Database: MongoDB Atlas

Auth: JWT

UI: Bootstrap + Custom Components

🚀 Features

👤 Employee Features

Register / Login

Mark Attendance (Check-In & Check-Out)

View Daily Attendance Status

Monthly Summary (Present, Absent, Late)

Attendance History Table

Calendar View with Highlighted Present Days

Fully Responsive Dashboard

👨‍💼 Manager Features

Manager Login

View All Employees’ Attendance

Filter by Employee / Date Range / Status

Team Summary (Present / Absent / Total)

Export Attendance Records as CSV

Dashboard with Team Analytics

📂 Project Folder Structure

tap-attendance/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── package.json
│
└── README.md

⚙️ Environment Variables

Backend (backend/.env)

MONGO_URI=mongodb+srv://apeksha:shivamogga@cluster0.icvj3.mongodb.net/attendance?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=c01c513907304538bb977cb039d4fa0da888268064c8e1ab1ae64a398c52e2f4

Frontend (frontend/.env)

VITE_API_URL=http://localhost:5000
VITE_MOCK=false

> ⚠️ Never commit real .env values — only use .env.example.

▶️ How to Run the Project Locally

1️⃣ Install Backend Dependencies

cd backend
npm install

2️⃣ Install Frontend Dependencies

cd ../frontend
npm install

3️⃣ Start Backend

cd backend
npm run dev

4️⃣ Start Frontend

cd frontend
npm run dev

Frontend runs at:
👉 http://localhost:5173

Backend runs at:
👉 http://localhost:5000

🧪 Seeding Attendance Data (Optional)

To generate sample attendance records:

cd backend
node seedAttendance.js

This helps in testing dashboard, calendars, and manager views.

📦 CSV Export Example

Manager can export CSV using:

GET /api/attendance/export

CSV contains:

date

employeeId

name

checkIn

checkOut

status

totalHours

🔒 Authentication

Uses JWT stored in browser localStorage.

Protected routes for employee & manager.

Middleware verifies user role.

🌟 Future Enhancements

Email reports

Late calculations using working hours

Pie charts for attendance statistics

Role-based UI improvements



---

🧑‍💻 Author

Apeksha G S

GitHub: https://github.com/apekshags2004