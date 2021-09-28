import axios from "axios";
import { API_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   config.headers.common["Authorization"] = `Bearer ${token}`;
//   return config;
// });

export default axiosInstance;
