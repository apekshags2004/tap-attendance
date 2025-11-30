// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Employee/Dashboard";
import MarkAttendance from "./pages/Employee/MarkAttendance";
import MyHistory from "./pages/Employee/MyHistory";

import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import AllAttendance from "./pages/Manager/AllAttendance";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mark-attendance"
          element={
            <ProtectedRoute>
              <MarkAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-history"
          element={
            <ProtectedRoute>
              <MyHistory />
            </ProtectedRoute>
          }
        />

        {/* Manager protected */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute roleAllowed="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/all-attendance"
          element={
            <ProtectedRoute roleAllowed="manager">
              <AllAttendance />
            </ProtectedRoute>
          }
        />

        {/* Fallback: simple not found route */}
        <Route path="*" element={<div style={{padding:40}}>404 — Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
