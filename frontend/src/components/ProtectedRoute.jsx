// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roleAllowed }) {
  const MOCK = import.meta.env.VITE_MOCK === 'true';

  let token = localStorage.getItem('token');
  let user = JSON.parse(localStorage.getItem('user') || 'null');

  // In mock mode, if no user stored create a manager or employee automatically depending on roleAllowed
  if (MOCK && !token) {
    const mockUser = roleAllowed === 'manager'
      ? { name: 'Manager', role: 'manager', employeeId: 'M001' }
      : { name: 'Apeksha', role: 'employee', employeeId: 'EMP001' };

    token = 'fake-jwt-token-123';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(mockUser));
    user = mockUser;
  }

  if (!token) return <Navigate to="/login" replace />;
  if (roleAllowed && user?.role !== roleAllowed) return <Navigate to="/" replace />;

  return children;
}
