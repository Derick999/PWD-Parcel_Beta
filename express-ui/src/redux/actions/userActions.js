import Swal from "sweetalert2";
import Axios from "axios";
import { api_url } from "../../helpers";
import {
  API_USER_START,
  API_USER_SUCCESS,
  API_USER_FAILED,
  LOGIN,
} from "../types";

const url = api_url + "/users";



export const registerAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_USER_START });
      const response = await Axios.post(`${url}/register`, data);
      if( response.status === 202 ){
        dispatch({
          type: API_USER_SUCCESS,
        });
        return Swal.fire(response.data.message)
      }
      const {
        id,
        username,
        email,
        roleID,
        verified,
        token,
      } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN,
        payload: { id, username, email, roleID, verified },
      });
      Swal.fire({
        icon: 'success',
        title: 'Anda telah berhasil register',
        text: 'Cek email untuk verifikasi akun ',
      })

      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};

export const emailVerificationAction = (data) => {
    return async (dispatch) => {
      dispatch({ type: API_USER_START });
      try {
        const response = await Axios.post(`${url}/email-verification`, data);
        const {
          id,
          username,
          email,
          roleID,
          verified,
          token,
        } = response.data;
        localStorage.setItem("token", token);
        dispatch({
          type: LOGIN,
          payload: { id, username, email, roleID, verified },
        });
        dispatch({
          type: API_USER_SUCCESS,
        });
      } catch (err) {
        dispatch({
          type: API_USER_FAILED,
          payload: err.message,
        });
      }
    };
  };

