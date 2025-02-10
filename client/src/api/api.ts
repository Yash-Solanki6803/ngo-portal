import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend base URL
  timeout: 5000, // Request timeout
});

// Add a request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can attach auth tokens here
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error) // Handle errors before request is sent
);

// Add a response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export const handleApiError = (error: unknown): never => {
  const errorMessage =
    (error as AxiosError<{ message: string }>)?.response?.data?.message ||
    "Something went wrong!";
  throw new Error(errorMessage);
};

export default api;
