import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";

export const users = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "user/",
        method: "POST",
        body: newUser,
        header: config.POST_HEADER,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = users;
