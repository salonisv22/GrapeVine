import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useValidateSelfQuery } from "../services/authenticationApi";

const MainLayout = () => {
  useValidateSelfQuery();

  return (
    <div className="rootContainer">
      <Header />
      <div className="componentBody">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
