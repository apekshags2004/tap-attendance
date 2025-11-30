// src/pages/Employee/MyHistory.jsx
import React, { useEffect, useState } from "react";

// FORCED MOCK - quick, temporary fix so frontend never calls backend
export default function MyHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // create mock rows immediately
    const fakeRows = [
      {
        _id: "1",
        date: new Date().toISOString(),
        checkInTime: "09:05",
        checkOutTime: "17:00",
        status: "Present",
        totalHours: "7h 55m",
      },
      {
        _id: "2",
        date: new Date(Date.now() - 86400000).toISOString(),
        checkInTime: null,
        checkOutTime: null,
        status: "Absent",
        totalHours: "-",
      },
      {
        _id: "3",
        date: new Date(Date.now() - 2 * 86400000).toISOString(),
        checkInTime: "09:10",
        checkOutTime: "17:05",
        status: "Present",
        totalHours: "7h 55m",
      },
    ];
    setRows(fakeRows);
  }, []);

  return (
    <div className="container mt-3">
      <h4>My Attendance History</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id}>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.checkInTime || "-"}</td>
              <td>{r.checkOutTime || "-"}</td>
              <td>{r.status}</td>
              <td>{r.totalHours || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
