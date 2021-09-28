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
  CHANGE_PASSWORD_RESET,
} from "./actionTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case REGISTER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, user: null, error: null };
    case REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case CHANGE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return {};
    default:
      return state;
  }
}
