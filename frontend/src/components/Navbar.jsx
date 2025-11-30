// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/tap-attendance-logo.png" alt="TAP Attendance" style={{ height: 40, width: 'auto', marginRight: 10 }} />
          <span>TAP Attendance</span>
        </Link>
        {/* rest of navbar */}
      </div>
    </nav>
  );
}