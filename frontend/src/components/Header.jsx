// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={brandStyle}>
        <img
          src="/tap-attendance-logo.png"
          alt="TAP Attendance"
          style={logoStyle}
        />
        <div>
          <div style={{ fontWeight: 700 }}>TAP Attendance</div>
          <small style={{ color: "#666", fontSize: 12 }}>Attendance System</small>
        </div>
      </div>

      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/mark-attendance" style={linkStyle}>Mark Attendance</Link>
        <Link to="/my-history" style={linkStyle}>My History</Link>
        <Link to="/manager/all-attendance" style={linkStyle}>Manager</Link>
      </nav>
    </header>
  );
}

/* Inline styles (small and easy to edit) */
const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 18px",
  borderBottom: "1px solid #eee",
  background: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 50,
};

const brandStyle = { display: "flex", alignItems: "center", gap: 12 };

const logoStyle = { width: 44, height: 44, objectFit: "contain" };

const navStyle = { display: "flex", gap: 14, alignItems: "center" };

const linkStyle = { color: "#333", textDecoration: "none", fontWeight: 500 };