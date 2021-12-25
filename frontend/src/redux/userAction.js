import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from "./userConstant";
import axios from "axios";

    export const login = (email, password) => async (dispatch) => {
        try {
          dispatch({ type: LOGIN_REQUEST });
      
          const config = { headers: { "Content-Type": "application/json" } };
      
          const { data } = await axios.post(
            `/`,
            { email, password },
            config
          );
      
          dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        } catch (error) {
          dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        }
      };
      
      // Register
      export const register = (userData) => async (dispatch) => {
        try {
          dispatch({ type: REGISTER_USER_REQUEST });
      
          const config = { headers: { "Content-Type": "application/json" } };
      
          const { data } = await axios.post(``, userData, config);
      
          dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        } catch (error) {
          dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
          });
        }
      };

      // Logout User
export const logout = () => async (dispatch) => {
    try {
      await axios.get(`/api/users/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };