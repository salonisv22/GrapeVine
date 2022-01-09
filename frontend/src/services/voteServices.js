import { createApi } from "@reduxjs/toolkit/query/react";
import config from "../utilities/config.json";
import { baseQueryWithReauth } from "./baseQueryWithReauth";


 export const Votes = createApi({
   reducerPath: "Votes",
   baseQuery: baseQueryWithReauth,
   endpoints: (builder) => ({
     questionUpvote: builder.mutation({
       query: (questionId) => ({
         url: "upvote/question/",
         method: "POST",
         body: questionId,
         headers: {
           ...config.POST_HEADER,
           Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
         },
       }),
     }),
     questionDownvote: builder.mutation({
       query: (questionId) => ({
         url: "downvote/question/",
         method: "POST",
         body: questionId,
         headers: {
           ...config.POST_HEADER,
           Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
         },
       }),
     }),
     answerUpvote: builder.mutation({
       query: (answerId) => ({
         url: "upvote/answer/",
         method: "POST",
         body: answerId,
         headers: {
           ...config.POST_HEADER,
           Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
         },
       }),
     }),
     answerDownvote: builder.mutation({
       query: (answerId) => ({
         url: "downvote/answer/",
         method: "POST",
         body: answerId,
         headers: {
           ...config.POST_HEADER,
           Authorization: `Bearer ${localStorage.getItem("grapevine")}`,
         },
       }),
     }),
   }),
 });

export const {useQuestionDownvoteMutation,useQuestionUpvoteMutation,useAnswerDownvoteMutation,useAnswerUpvoteMutation} = Votes;


