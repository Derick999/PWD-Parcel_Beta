import {
    API_CART_FAILED,
    API_CART_FILL,
    API_CART_START,
    API_CART_SUCCESS,
    NULLIFY_ERROR,
  } from "../types";
  
  const INITIAL_STATE = {
    cart: [],
    loading: false,
    error: "",
  };

  export const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case API_CART_START:
        return {
          ...state,
          loading: true,
        };
      case API_CART_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case API_CART_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case API_CART_FILL:
        return {
          ...state,
          CARTList: action.payload,
        };
      case NULLIFY_ERROR:
        return {
          ...state,
          error: "",
        };
      default:
        return state;
    }
  };
  