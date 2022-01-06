import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";




export const Questions = createApi({
  reducerPath: "Questions",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
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
          "Content-Type": "application/json",
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

export const { useAskQuestionMutation,useQuestionListQuery,useGetQuestionByIdQuery } = Questions;
