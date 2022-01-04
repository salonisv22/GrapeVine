import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import config from "../utilities/config.json";
import { useLoginMutation } from "./authenticationApi";
import Login from "../authentication/login";
// import { tokenReceived, loggedOut } from './authSlice'

const baseQuery = fetchBaseQuery({ baseUrl: config.BASE_URL });
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      //   api.dispatch(tokenReceived(refreshResult.data))
      console.log(refreshResult);
      localStorage.removeItem("grapevine");
      localStorage.setItem("grapevine", refreshResult.data.access);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(login.endpoints.logout.initiate());

      //   api.dispatch(loggedOut())
    }
  }
  return result;
};
