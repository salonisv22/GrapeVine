import { Routes, Route } from "react-router-dom";
import "./app.scss";

// importing page components
import Home from "./homepage";
import NotFound from "./404";
import Authentication from "./authentication/";
import Login from "./authentication/login";
import Register from "./authentication/register";
import Header from "./Header";
import Footer from "./Footer"

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Authentication />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
