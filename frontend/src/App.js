import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

import "./app.scss";

// importing page components
import Home from "./homepage";
import NotFound from "./404";
import Authentication from "./authentication/";
import Profile from "./profile/";
import Login from "./authentication/login";
import Register from "./authentication/register";
import AskQuestion from "./AskQuestion";
import MainLayout from "./Layout/MainLayout";
import Questions from "./questions/questionByID";
import AllQuestions from "./questions/questionList";
import { hideAlertMessage } from "./redux/alertMessage";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const dispatch = useDispatch();
  const alertMessage = useSelector((state) => state.alertMessage);

  const closeAlertMessage = () => {
    dispatch(hideAlertMessage());
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/question" element={<Questions />} />
          <Route path="/questions/ask" element={<AskQuestion />} />
          <Route path="/questions" element={<AllQuestions />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertMessage.isVisible}
        autoHideDuration={1500}
        onClose={closeAlertMessage}
        key="alertMessage"
      >
        <Alert severity={alertMessage.severity} sx={{ width: "100%" }}>
          {alertMessage.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
