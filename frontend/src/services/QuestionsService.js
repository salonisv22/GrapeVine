import { createApi } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const Questions = createApi({
  reducerPath: "Questions",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    questionList: builder.query({
      query: () => ({
        url: "question/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),
    askQuestion: builder.mutation({
      query: (newQues) => ({
        url: "question/",
        method: "POST",
        body: newQues,
        headers: {
          ...config.POST_HEADER,
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),

    getQuestionById: builder.query({
      query: (id) => ({
        url: `question/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),
  }),
});

export const {
  useAskQuestionMutation,
  useQuestionListQuery,
  useGetQuestionByIdQuery,
} = Questions;
