import { createApi } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const users = createApi({
  reducerPath: "users",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "user/",
        method: "POST",
        body: newUser,
        headers: config.POST_HEADER,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, newInfo }) => ({
        url: `user/${id}/`,
        method: "PATCH",
        body: newInfo,
        headers: {
          ...config.POST_HEADER,
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),
  }),
});

export const { useCreateUserMutation,useUpdateUserMutation } = users;
