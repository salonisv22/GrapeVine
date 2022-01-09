import React from "react";
import { Alert, AlertTitle, Stack, Typography } from "@mui/material";
import { Divider } from "@material-ui/core";

const notifications = [
  {
    id: 1,
    user: "user_id",
    action: "upvoted",
    question: "q_id",
    time: "12:00",
  },
  {
    id: 2,
    user: "user_id",
    action: "downvoted",
    question: "q_id",
    time: "12:00",
  },
  {
    id: 3,
    user: "user_id",
    action: "commented",
    question: "q_id",
    time: "12:00",
  },
  {
    id: 4,
    user: "user_id",
    action: "answered",
    question: "q_id",
    time: "12:00",
  },
];

const Notification = () => {
  const severity = (action) => {
    switch (action) {
      case "upvoted":
        return "success";
      case "downvoted":
        return "error";
      case "commented":
        return "warning";
      case "answered":
        return "info";
      default:
        return "info";
    }
  };
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Typography sx={{ opacity: 0.8, padding: "5px" }} variant="subtitle2">
        <div>Your notifications will appear here</div>
      </Typography>
      <Divider />
      {notifications.map((message) => {
        return (
          <Alert severity={severity(message.action)}>
            <AlertTitle>You have been {message.action}</AlertTitle>
            {message.user} has {message.action} on {message.question} at{" "}
            {message.time}
          </Alert>
        );
      })}
    </Stack>
  );
};

export default Notification;
