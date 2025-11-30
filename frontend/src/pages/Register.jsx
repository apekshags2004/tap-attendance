// src/pages/Register.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
    department: "",
    role: "employee", // default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + (err?.message || err));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="mb-4">Register</h3>

          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Employee ID</label>
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                className="form-control"
                placeholder="EMP001"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                className="form-control"
                placeholder="IT / HR / Sales..."
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                minLength="6"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>

            <p className="mt-3">
              Already have an account?{" "}
              <a href="/login">Login</a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
