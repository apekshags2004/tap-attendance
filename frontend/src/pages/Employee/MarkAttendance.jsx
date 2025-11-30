// frontend/src/pages/Employee/MarkAttendance.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

export default function MarkAttendance() {
  const [todayStatus, setTodayStatus] = useState({ status: "Not Checked", checkIn: null, checkOut: null });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // fetch today's attendance record
  const loadToday = async () => {
    try {
      setLoading(true);
      // adjust endpoint if your backend differs
      const res = await axios.get("/attendance/today"); 
      // expected response: { status: 'Present'|'Absent'|'Not Checked', checkIn: 'HH:MM:SS', checkOut: 'HH:MM:SS' }
      setTodayStatus(res.data || { status: "Not Checked", checkIn: null, checkOut: null });
    } catch (err) {
      console.error("Load today error:", err);
      setTodayStatus({ status: "Not Checked", checkIn: null, checkOut: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadToday(); }, []);

  const checkIn = async () => {
    try {
      setBusy(true);
      const res = await axios.post("/attendance/checkin"); // backend will create/update record
      // res.data should include new checkIn time
      await loadToday(); // refresh UI
      alert(res.data?.message || "Checked in");
    } catch (err) {
      console.error("Check-in error:", err);
      alert("Check-in failed. See console.");
    } finally {
      setBusy(false);
    }
  };

  const checkOut = async () => {
    try {
      setBusy(true);
      const res = await axios.post("/attendance/checkout"); // backend should set checkout time
      await loadToday();
      alert(res.data?.message || "Checked out");
    } catch (err) {
      console.error("Check-out error:", err);
      alert("Check-out failed. See console.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mark Attendance</h2>
      <div className="card p-3" style={{maxWidth:600}}>
        <div><strong>Today's status:</strong> {loading ? 'Loading...' : todayStatus.status}</div>
        <div>Check-in: {todayStatus.checkIn || '-'}</div>
        <div>Check-out: {todayStatus.checkOut || '-'}</div>

        <div className="mt-3">
          <button className="btn btn-success me-2" onClick={checkIn} disabled={busy || todayStatus.checkIn}>
            {busy ? 'Working...' : (todayStatus.checkIn ? 'Checked In' : 'Check In')}
          </button>
          <button className="btn btn-danger" onClick={checkOut} disabled={busy || !todayStatus.checkIn || todayStatus.checkOut}>
            {busy ? 'Working...' : (todayStatus.checkOut ? 'Checked Out' : 'Check Out')}
          </button>
        </div>
      </div>
    </div>
  );
}
