import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";

export const users = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: () => ({
        url: "users/",
        method: "POST",
        body: {
          username: "ankitb",
          password: "salpal",
          email: "ankitb@salpal.com",
        },
        header: config.POST_HEADER,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = users;
