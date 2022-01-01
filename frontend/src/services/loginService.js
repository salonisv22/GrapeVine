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
  }),
});

export const { useLoginMutation } = login;
