import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";

import {
  useValidateSelfQuery,
  useRefreshMutation,
} from "../services/authenticationApi";
import { addAlertMessage } from "../redux/alertMessage";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userPreferences = useValidateSelfQuery();
  const [refreshToken, refreshData] = useRefreshMutation();

  useEffect(() => {
    console.log(userPreferences);
    if (userPreferences.isError) {
      localStorage.removeItem("grapevine");
      refreshToken({ som: "thing" });
    }
  }, [navigate, userPreferences, refreshToken]);

  useEffect(() => {
    console.log(refreshData);
    if (refreshData.isError) {
      dispatch(
        addAlertMessage({
          severity: "error",
          message: "You are logged out due to inactivity, please login again!",
        })
      );
      navigate("/auth/login");
    }
    if (refreshData.isSuccess) {
      localStorage.setItem("grapevine", refreshData.data.access);
    }
  }, [dispatch, navigate, refreshData]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
