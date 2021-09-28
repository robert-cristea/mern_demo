import { combineReducers } from "redux";
import alertReducer from "./alert/reducer";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  users: userReducer,
});
