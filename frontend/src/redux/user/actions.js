import { toast } from "react-toastify";
import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  RETRIEVE_USER_REQUEST,
  RETRIEVE_USER_SUCCESS,
  RETRIEVE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes";
import userApi from "../../service/userApi";

const userActions = {
  getAll: () => async (dispatch) => {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    });
    const res = await userApi.getAll();
    console.log("userActions->getAll", res);
    if (res.data) {
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: {
          items: res.data,
        },
      });
    }
    if (res.message) {
      dispatch({
        type: GET_ALL_USERS_FAIL,
        payload: {
          error: res.message,
        },
      });
    }
  },

  retrieve: (userId) => async (dispatch) => {
    dispatch({
      type: RETRIEVE_USER_REQUEST,
    });
    const res = await userApi.retrieve(userId);
    console.log("userActions->retrieve", res);
    if (res.data) {
      dispatch({
        type: RETRIEVE_USER_SUCCESS,
        payload: {
          item: res.data,
        },
      });
    }
    if (res.message) {
      dispatch({
        type: RETRIEVE_USER_FAIL,
        payload: {
          error: res.message,
        },
      });
    }
  },

  create: (user, history) => async (dispatch) => {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    console.log("userActions->create", user);
    const res = await userApi.create(user);
    if (res.data) {
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: {
          item: res.data,
        },
      });
      toast.success("Created successfully");
      history.push("/admin/user");
    }
    if (res.message) {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: {
          error: res.message,
        },
      });
      toast.warning(res.message);
    }
  },

  update: (user, history) => async (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    console.log("userActions->update", user);
    const res = await userApi.update(user);
    if (res.data) {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          item: res.data,
        },
      });
      toast.success("Updated successfully");
      history.push("/admin/user");
    }
    if (res.message) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: {
          error: res.message,
        },
      });
      toast.warning(res.message);
    }
  },

  delete: (userId, history) => async (dispatch) => {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    console.log("userActions->delete", userId);
    const res = await userApi.delete(userId);
    if (res.data) {
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: {
          item: res.data,
        },
      });
      toast.success("Deleted successfully");
      history.push("/admin/user");
    }
    if (res.message) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: {
          error: res.message,
        },
      });
      toast.warning(res.message);
    }
  },
};

export default userActions;
