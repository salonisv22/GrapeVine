import { Routes, Route } from "react-router-dom";
import "./app.scss";

// importing page components
import Home from "./homepage";
import NotFound from "./404";
import Authentication from "./authentication/";
import Login from "./authentication/login";
import Register from "./authentication/register";
import AskQuestion from "./AskQuestion";
import MainLayout from "./Layout/MainLayout";
import Questions from "./questions/questionByID";
import AllQuestions from "./questions/questionList";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home />} />
          <Route path="/question" element={<Questions />} />
          <Route path="/questions/ask" element={<AskQuestion />} />
          <Route path="/questions" element={<AllQuestions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  
    </>
  );
};

export default App;
