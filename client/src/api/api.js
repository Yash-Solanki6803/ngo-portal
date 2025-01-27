import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend base URL
  timeout: 5000, // Request timeout
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can attach auth tokens here
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle errors before request is sent
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., log out on 401)
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Add logout logic if needed
    }
    return Promise.reject(error);
  }
);

export default api;
