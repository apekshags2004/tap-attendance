// src/pages/Manager/AllAttendance.jsx
import React, { useEffect, useState } from "react";

// FORCED MOCK — quick dev/demo version that does not call backend
export default function AllAttendance() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fake = [
      {
        _id: "1",
        name: "Apeksha GS",
        employeeId: "EMP001",
        date: new Date().toISOString(),
        checkInTime: "09:03",
        checkOutTime: "17:00",
        status: "Present",
        totalHours: "7h 57m",
      },
      {
        _id: "2",
        name: "Rahul",
        employeeId: "EMP002",
        date: new Date().toISOString(),
        checkInTime: null,
        checkOutTime: null,
        status: "Absent",
        totalHours: "-",
      },
      {
        _id: "3",
        name: "Sita",
        employeeId: "EMP003",
        date: new Date(Date.now() - 86400000).toISOString(),
        checkInTime: "09:10",
        checkOutTime: "17:05",
        status: "Present",
        totalHours: "7h 55m",
      },
    ];
    setRows(fake);
  }, []);

  const downloadCSV = () => {
    // mock behavior for export
    alert("Mock: CSV export not available in mock mode.");
  };

  return (
    <div className="container mt-4">
      <h3>All Attendance Records</h3>

      <div className="mb-3">
        <button className="btn btn-success" onClick={downloadCSV}>
          Export CSV
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.employeeId}</td>
              <td>{new Date(row.date).toLocaleDateString()}</td>
              <td>{row.checkInTime || "-"}</td>
              <td>{row.checkOutTime || "-"}</td>
              <td>{row.status}</td>
              <td>{row.totalHours || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
