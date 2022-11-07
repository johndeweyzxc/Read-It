import React from "react";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";

import Login from "./Pages/AuthPages/Login";
import PasswordReset from "./Pages/AuthPages/PasswordReset";
import Home from "./Pages/UserHome/Home";
import User from "./Pages/UserHome/User";
import Register from "./Pages/UserModify/Register";
import UpdateProfile from "./Pages/UserModify/UpdateProfile";

function NotFound() {
  return <div className='m-4'>404 Error not found</div>;
}

function ServerError() {
  return (
    <div className='m-4'>
      500 Internal Server Error, contact the administrator
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/PasswordReset' element={<PasswordReset />} />
        </>
        <>
          <Route path='/Home' element={<Home />} />
          <Route path='/UpdateProfile' element={<UpdateProfile />} />
        </>
        <>
          <Route path='/User' element={<Login />} />
          <Route path='/User/:Username' element={<User />} />
        </>
        <>
          <Route path='/ServerError' element={<ServerError />} />
          <Route path='*' element={<NotFound />} />
        </>
      </Routes>
    </Router>
  );
}
