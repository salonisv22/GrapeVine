import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";

export const login = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginCredentials) => ({
        url: "login/",
        method: "POST",
        body: loginCredentials,
        headers: config.POST_HEADER,
        credentials: "include",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "refresh/",
        method: "POST",
        body: {},
        headers: config.POST_HEADER,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => {
        console.log("logging out");
        localStorage.removeItem("grapevine");
        document.cookie =
          "refresh=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        return {
          url: "logout/",
          method: "POST",
          body: {},
          headers: config.POST_HEADER,
        };
      },
    }),
  }),
});

export const validateSelf = createApi({
  reducerPath: "me",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    validateSelf: builder.query({
      query: () => ({
        url: "me/",
        method: "GET",
        headers: {
          ...config.POST_HEADER,
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  login;
export const { useValidateSelfQuery } = validateSelf;
