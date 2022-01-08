import { createApi } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const Answers = createApi({
  reducerPath: "Answers",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postAnswer: builder.mutation({
      query: (newAnswer) => ({
        url: "answer/",
        method: "POST",
        body: newAnswer,
        headers: {
          ...config.POST_HEADER,
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),

    getAnswerById: builder.query({
      query: (id) => ({
        url: `answer/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),
  }),
});

export const {
    usePostAnswerMutation,
    useGetAnswerByIdQuery
} = Answers;
