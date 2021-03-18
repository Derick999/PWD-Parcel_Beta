import {
    API_USER_FAILED,
    API_USER_START,
    API_USER_SUCCESS,
  } from "../types";
  
  const INITIAL_STATE = {
    id: 0,
    username: "",
    email: "",
    roleID: 0,
    verified: null,
    loading: false,
    error: "",
  };
  export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case API_USER_START:
        return {
          ...state,
          loading: true,
        };
      case API_USER_FAILED:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case API_USER_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
  