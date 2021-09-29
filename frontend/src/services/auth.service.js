import { handleError } from "./utils";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { API_URL } from "./config";

const baseUrl = `${API_URL}/api/auth/`;

const authService = {
  register: async (user) => {
    try {
      return await axios.post(baseUrl + "signup", user);
    } catch (error) {
      return handleError(error);
    }
  },
  login: async (user) => {
    try {
      return await axios.post(baseUrl + "signin", user);
    } catch (error) {
      return handleError(error);
    }
  },
  verifyEmail: async (token) => {
    try {
      return await axios.post(baseUrl + "verify-email", { token });
    } catch (error) {
      return handleError(error);
    }
  },

  logout: () => {
    localStorage.removeItem("user");
  },
};

export default authService;
