import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS } from "./actionTypes";

const alertActions = {
  alertSuccess: (message) => ({
    type: ALERT_SUCCESS,
    message,
  }),
  alertError: (message) => ({
    type: ALERT_ERROR,
    message,
  }),
  alertClear: () => ({
    type: ALERT_CLEAR,
  }),
};

export default alertActions;
