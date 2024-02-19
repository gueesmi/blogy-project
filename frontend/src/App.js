import "./App.css";
import {
  NavBar,
  Register,
  Login,
  CreateBlog,
  BlogList,
  PriveteRoutes,
  Profile,
} from "./components";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const result = await axios.get("http://localhost:3310/api/user/me", {
          withCredentials: true,
        });
        setUser(result?.data);
      } catch (error) {
        setUser(error.response?.data);
      }
    };
    verifyLogin();
  }, [setUser]);

  return (
    <>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PriveteRoutes user={user} />}>
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
