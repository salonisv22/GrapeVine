import { createApi } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const Comments = createApi({
  reducerPath: "Comments",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    questionComment: builder.mutation({
      query: (newComment) => ({
        url: "question-comment/",
        method: "POST",
        body: newComment,
        headers: {
          ...config.POST_HEADER,
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),

    answerComment: builder.mutation({
      query: (newComment) => ({
        url: "answer-comment/",
        method: "POST",
        body: newComment,
        headers: {
          ...config.POST_HEADER,
          Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
        },
      }),
    }),
  }),
});

export const { useQuestionCommentMutation, useAnswerCommentMutation } =
  Comments;
