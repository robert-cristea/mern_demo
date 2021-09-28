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

const initialState = {
  items: [],
  selectedItem: null,
  error: null,
  loading: false,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        error: null,
      };
    case GET_ALL_USERS_FAIL:
      return { ...state, loading: false, error: action.payload.error };

    case RETRIEVE_USER_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };

    case RETRIEVE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedItem: action.payload.item,
        error: null,
      };
    case CREATE_USER_SUCCESS:
      state.items.push(action.payload.item);
      return {
        ...state,
        loading: false,
        items: state.items,
        selectedItem: action.payload.item,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) => {
          if (item._id === action.payload.item._id) return action.payload.item;
          return item;
        }),
        selectedItem: action.payload.item,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload.item),
        loading: false,
      };

    case RETRIEVE_USER_FAIL:
    case CREATE_USER_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
}
