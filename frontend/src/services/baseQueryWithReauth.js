import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";
import { login } from "./authenticationApi";
import { addAlertMessage } from "../redux/alertMessage";
// import { tokenReceived, loggedOut } from './authSlice'

// const baseQuery = fetchBaseQuery({
//   baseUrl: config.BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     headers.set("Content-Type", "application/json; charset=UTF-8");
//     headers.set("authorization", `Bearer ${localStorage.getItem("grapevine")}`);

//     return headers;
//   },
// });
const baseQuery = fetchBaseQuery({ baseUrl: config.BASE_URL });
export const baseQueryWithReauth = async (args, api, extraOptions = {}) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.removeItem("grapevine");

    // try to get a new token
    const refreshQuery = fetchBaseQuery({
      baseUrl: config.BASE_URL,
    });

    const refreshResult = await refreshQuery(
      {
        url: "refresh/",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions
    );
    if (refreshResult.error) {
      api.dispatch(
        addAlertMessage({
          severity: "error",
          message: "You are logged out due to inactivity, please login again!",
        })
      );
      api.dispatch(login.endpoints.logout.initiate());
    } else if (refreshResult.data) {
      localStorage.setItem("grapevine", refreshResult.data.access);

      // retry the initial query
      result = await baseQuery(
        {
          ...args,
          headers: {
            ...args.headers,
            Authorization: `Bearer ${refreshResult.data.access}`,
          },
        },
        api,
        extraOptions
      );
    }
  }
  return result;
};
