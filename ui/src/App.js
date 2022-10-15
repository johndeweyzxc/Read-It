// Dependency imports
import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// App imports
import Login from "./Pages/AuthPages/Login";
import PasswordReset from "./Pages/AuthPages/PasswordReset";
import Home from "./Pages/UserHome/Home";
import User from "./Pages/UserHome/User";
import Register from "./Pages/UserModify/Register";
import UpdateProfile from "./Pages/UserModify/UpdateProfile";
import ErrorNotFound from "./Pages/ErrorPages/NotFound";
import ServerError from "./Pages/ErrorPages/ServerError";

export default function App() {
  return (
    <Router>
      <Routes>
        <>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/PasswordReset" element={<PasswordReset />} />
        </>
        <>
          <Route path="/Home" element={<Home />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
        </>
        <>
          <Route path="/User" element={<Login />} />
          <Route path="/User/:Username" element={<User />} />
        </>
        <>
          <Route path="/ServerError" element={<ServerError />} />
          <Route path="*" element={<ErrorNotFound />} />
        </>
      </Routes>
    </Router>
  );
}
