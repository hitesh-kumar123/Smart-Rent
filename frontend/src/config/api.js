import axios from "axios";

// Get the API URL from environment or use fallback
const getApiUrl = () => {
  // Check if we're in production and environment variable is set
  if (process.env.NODE_ENV === "production" && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Fallback to hardcoded URL for production
  if (process.env.NODE_ENV === "production") {
    return "https://smart-rent-g3vd.onrender.com";
  }

  // Development fallback
  return process.env.REACT_APP_API_URL || "http://localhost:8000";
};

console.log("API Base URL:", getApiUrl());

// Create axios instance with default config
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to handle auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log("API Success:", response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error("API Error Details:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      baseURL: error.config?.baseURL,
    });
    return Promise.reject(error);
  }
);

export default api;
