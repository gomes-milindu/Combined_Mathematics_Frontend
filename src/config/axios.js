import axios from 'axios';
import toast from 'react-hot-toast';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Track whether we've already shown a session expired toast + redirect
let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && !isRedirecting) {
      isRedirecting = true;
      localStorage.removeItem("token");
      toast.error("Session expired. Please log in again.", { id: "session-expired" });
      setTimeout(() => {
        isRedirecting = false;
        window.location.href = "/login";
      }, 1000);
    }

    if (status === 403) {
      toast.error(
        error.response?.data?.message || "Access denied. You don't have permission.",
        { id: "forbidden" }
      );
    }

    return Promise.reject(error);
  }
);

export default api;