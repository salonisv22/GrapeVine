import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

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
        localStorage.removeItem("grapevine");
        return {
          url: "logout/",
          method: "POST",
          body: {},
          headers: config.POST_HEADER,
          credentials: "include",
        };
      },
    }),
  }),
});

export const validateSelf = createApi({
  reducerPath: "validateSelf",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    self: builder.query({
      query: () => ({
        url: "me/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),
    sendWS: builder.mutation({
      query: () => ({
        url: "sendws/",
        method: "POST",
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
export const { useSelfQuery, useSendWSMutation } = validateSelf;
