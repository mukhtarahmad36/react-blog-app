import { useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { UserContext, UserProvider } from "./components/UserContext";
import { useContext } from "react";
import { Post } from "./components/Post";
import { SignUp } from "./components/SignUp";
import SinglePost from "./components/SinglePost";
import CreatePost from "./models/CreatePost";
import { GlobalContext } from "./components/GlobalContext";
import ButtonAppBar from "./components/Navbar";
import Navbar from "./components/Navbar";

export const baseUrl = "http://localhost:3000/data";

const App = () => {
  const { isLogin } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <Router>
      <Navbar />
        <Routes>
          <Route
            path="/"
            element={isLogin ? <Post /> : <Navigate to="/sign_up" />}
          />
          <Route
            path="/sign_up"
            element={!isLogin ? <SignUp /> : <Navigate to="/" />}
          />

          <Route
            path="/post/:id"
            element={isLogin ? <SinglePost /> : <Navigate to="/" />}
          />
          <Route
            path="/post/:id/comments"
            element={isLogin ? <SinglePost /> : <Navigate to="/" />}
          />

          <Route
            path="/post/create"
            element={isLogin ? <CreatePost /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
