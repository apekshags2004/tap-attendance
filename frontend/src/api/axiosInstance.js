// attendance-frontend/src/api/axiosInstance.js
import axios from 'axios';

// baseURL must point to the backend API root (includes /api)
const baseURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

const axiosInstance = axios.create({
  baseURL,
});

// attach token automatically
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers = { ...(config.headers||{}), Authorization: `Bearer ${token}` };
  return config;
}, error => Promise.reject(error));

export default axiosInstance;