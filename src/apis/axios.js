// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Your base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally handle request and response interceptors
axiosInstance.interceptors.request.use((config) => {
  // Add authentication token if needed
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
