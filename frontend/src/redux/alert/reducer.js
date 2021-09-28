import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from "./actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALERT_SUCCESS:
    case ALERT_ERROR:
      return { message: payload, type };

    case ALERT_CLEAR:
      return { message: "" };

    default:
      return state;
  }
}
