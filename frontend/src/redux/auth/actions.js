import { toast } from "react-toastify";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "./actionTypes";
import authService from "../../services/auth.service";
import { ALERT_SUCCESS, ALERT_ERROR } from "../alert/actionTypes";

const authActions = {
  login: (user, history) => async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const { data } = await authService.login(user);
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      dispatch({
        type: ALERT_SUCCESS,
        payload: "login success",
      });

      toast.success("Login success");
      history.push("/dashboard");
    } catch (error) {
      toast.warning(error.message);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.message,
      });
      dispatch({
        type: ALERT_ERROR,
        payload: "Login failed",
      });
    }
  },

  register: (user, history) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });

      const { data } = await authService.register(user);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      toast.success("register success");
      history.push("/register-success");
    } catch (error) {
      toast.warning(error.message);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.message,
      });
      dispatch({
        type: ALERT_ERROR,
        payload: "Register failed",
      });
    }
  },

  logout: (history) => (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
  },

  // updateProfile: (user, history) => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: UPDATE_PROFILE_REQUEST,
  //     });

  //     const {
  //       data: { token },
  //     } = await axiosInstance.put(`api/auth/`, user);

  //     localStorage.setItem("token", token);

  //     dispatch({
  //       type: UPDATE_PROFILE_SUCCESS,
  //       payload: token,
  //     });
  //     toast.success("Profile updated successful!");
  //     history.push("/admin");
  //   } catch (error) {
  //     console.log("error", error);
  //     if (!error.response) {
  //       toast.warning("Can't find server!");
  //       return;
  //     }

  //     toast.warning(error.response.data.message || "Server error");
  //     dispatch({
  //       type: UPDATE_PROFILE_FAIL,
  //       payload:
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message,
  //     });
  //   }
  // },

  // changePassword: (user, history) => async (dispatch) => {
  //   try {
  //     console.log("changePassword->");
  //     dispatch({
  //       type: CHANGE_PASSWORD_REQUEST,
  //     });

  //     const {
  //       data: { token },
  //     } = await axiosInstance.post(`api/password/change`, user);

  //     localStorage.setItem("token", token);

  //     dispatch({
  //       type: CHANGE_PASSWORD_SUCCESS,
  //       payload: token,
  //     });
  //     toast.success("Password updated successful!");
  //     history.push("/admin");
  //   } catch (error) {
  //     if (!error.response) {
  //       toast.warning("Can't find server!");
  //       return;
  //     }

  //     toast.warning(error.response.data.message || "Server error");
  //     dispatch({
  //       type: CHANGE_PASSWORD_FAIL,
  //       payload:
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message,
  //     });
  //   }
  // },
};

export default authActions;
