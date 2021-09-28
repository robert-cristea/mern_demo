import { handleError } from "./utils";
import axiosInstance from "./axiosInstance";

const userApi = {
  getAll: async () => {
    try {
      return await axiosInstance.get(`api/user/`);
    } catch (error) {
      return handleError(error);
    }
  },
  retrieve: async (userId) => {
    try {
      return await axiosInstance.get(`api/user/${userId}`);
    } catch (error) {
      return handleError(error);
    }
  },
  create: async (user) => {
    try {
      return await axiosInstance.post(`api/user/`, user);
    } catch (error) {
      return handleError(error);
    }
  },
  update: async (user) => {
    try {
      return await axiosInstance.put(`api/user/${user.id}`, user);
    } catch (error) {
      return handleError(error);
    }
  },
  delete: async (userId) => {
    try {
      return await axiosInstance.delete(`api/user/${userId}`);
    } catch (error) {
      return handleError(error);
    }
  },
};

export default userApi;
