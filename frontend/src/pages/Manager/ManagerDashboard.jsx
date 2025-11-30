// src/pages/Manager/ManagerDashboard.jsx
import React from "react";

export default function ManagerDashboard() {
  return (
    <div className="container mt-4">
      <h3>Manager Dashboard</h3>
      <p>Welcome, manager — this is a simple placeholder dashboard.</p>

      <div className="mt-3">
        <a href="/manager/all-attendance" className="btn btn-primary me-2">
          View All Attendance
        </a>
        <a href="/" className="btn btn-secondary">
          Go to Employee Home
        </a>
      </div>

      <div className="mt-4">
        <h5>Quick stats (mock)</h5>
        <div className="d-flex gap-3">
          <div className="card p-3">
            <strong>Employees</strong>
            <div>25</div>
          </div>
          <div className="card p-3">
            <strong>Present Today</strong>
            <div>20</div>
          </div>
          <div className="card p-3">
            <strong>Absent Today</strong>
            <div>5</div>
          </div>
        </div>
      </div>
    </div>
  );
}
