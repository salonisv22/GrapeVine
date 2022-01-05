import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

import { useValidateSelfQuery } from "../services/authenticationApi";

const MainLayout = () => {
  useValidateSelfQuery();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
