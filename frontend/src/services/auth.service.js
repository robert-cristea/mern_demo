import { handleError } from "./utils";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { API_URL } from "./config";

const baseUrl = `${API_URL}/api/auth/`;

const authService = {
  register: (user) => {
    console.log(`authService`, baseUrl, user);
    try {
      return axios.post(baseUrl + "signup", user);
    } catch (error) {
      return handleError(error);
    }
  },
  login: (user) => {
    try {
      return axios.post(baseUrl + "signin", user);
    } catch (error) {
      return handleError(error);
    }
  },

  logout: () => {
    localStorage.removeItem("user");
  },
};

export default authService;
