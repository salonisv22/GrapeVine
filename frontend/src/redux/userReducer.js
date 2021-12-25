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
    

const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: localStorage.getItem('token') ? true : false, // or just !!localStorage.getItem('token')
   isLoading: false,
}

const userReducer = (state = initialState, action) => {
        switch (action.type) {
          case LOGIN_REQUEST:
          case REGISTER_USER_REQUEST:
            return {
              loading: true,
              isAuthenticated: false,
            };
          
          case LOGIN_SUCCESS:
             localStorage.setItem('token', action.payload.token);
            return {
              ...state,
              loading: false,
              isAuthenticated: true,
              message:"Login Successfully"
            };
      
          case REGISTER_USER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
              ...state,
              loading: false,
              isAuthenticated: true,
              message:"User Registered Successfully!!"
            };
      
          case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
              loading: false,
              isAuthenticated: false,
            };
          case LOGIN_FAIL:
          case REGISTER_USER_FAIL:
            localStorage.removeItem('token');
            console.log(action.payload)
            return {
              ...state,
              loading: false,
              isAuthenticated: false,
              error: "Invalid Email or Password",
            };
      
          case LOGOUT_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state;
        }
      };

export default userReducer;      
      
  