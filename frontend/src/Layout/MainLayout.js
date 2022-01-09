import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useSelfQuery, useSendWSMutation } from "../services/authenticationApi";
const MainLayout = () => {
  useSelfQuery();
  const [send, data] = useSendWSMutation();

  useEffect(() => {
    let socket = new WebSocket(
      `ws://localhost:8000/notifications/?token=${localStorage.getItem(
        "grapevine"
      )}`
    );
    socket.onmessage = function (event) {
      console.log("received");
      var data = JSON.parse(event.data);
      console.log(data);
    };
  }, []);
  return (
    <div className="rootContainer">
      <Header />
      <div className="componentBody">
        <button onClick={() => send()}>ws</button>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
