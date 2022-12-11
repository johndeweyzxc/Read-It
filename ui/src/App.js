import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import "./Styles/login.css";
import Login from "./Login";
import { Home } from "./Home";
import User from "./User";
import Register from "./Register";
import UpdateProfile from "./UpdateProfile";

// This is the Password reset page
function PasswordReset() {
  return (
    <div className="w-screen h-screen tablet:h-auto flex flex-col justify-center">
      <form className="flex flex-col items-center">
        <div
          className="mt-4 mb-6 pl-8 pr-8 pb-2 text-3xl phone:text-lg
        font-JetBrains border-b-[1px] border-solid border-black"
        >
          Reset your Password
        </div>

        <div className="flex tablet:flex-col">
          <div className="inputSection">
            <label className="labelStyle">Email: </label>
            <input className="inputStyle" type={"text"} placeholder={"johndewey22@gmail.com"} />
          </div>
          <div className="inputSection">
            <label className="labelStyle">Email OTP: </label>
            <input className="inputStyle" type={"text"} placeholder={"OTP Code"} />
          </div>
        </div>

        <div className="flex tablet:flex-col">
          <div className="inputSection">
            <label className="labelStyle">Phone Number: </label>
            <input className="inputStyle" type={"text"} placeholder={"09993241123"} />
          </div>
          <div className="inputSection">
            <label className="labelStyle">Phone Number OTP: </label>
            <input className="inputStyle" type={"text"} placeholder={"OTP Code"} />
          </div>
        </div>

        <button
          className="mt-2 mb-4 p-2 pl-8 pr-8 font-JetBrains text-base tracking-wide
        bg-Cherry border border-solid border-Cherry rounded-lg text-white
        hover:cursor-pointer"
          onClick={() => alert("This feature is under development")}
        >
          Verify
        </button>
      </form>
    </div>
  );
}

// Error not found page
function NotFound() {
  return <div className="m-4">404 Error not found</div>;
}

// Page for telling the user that there is a server error
function ServerError() {
  return <div className="m-4">500 Internal Server Error, contact the administrator</div>;
}

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
          <Route path="*" element={<NotFound />} />
        </>
      </Routes>
    </Router>
  );
}
