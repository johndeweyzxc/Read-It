import React from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";
import SearchIcon from "./Assets/search-icon.png";
import MessagesIcon from "./Assets/message-icon.png";
import LogoutIcon from "./Assets/logout-icon.png";
import MenuIcon from "./Assets/menu-icon.png";
import UserIcon from "./Assets/user-icon.png";

export default function Header({ showMessages, mobileMenuRef, UserName }) {
  const navigate = useNavigate();
  const UnderDev = () => {
    alert("This feature is under development");
  };

  return (
    <div className="fixed z-[2] filter blur-none">
      <div className="HeaderDiv">
        <div className="HeaderReadIt">Read It</div>

        <div className="flex mr-24 tablet:mr-4 sphone:hidden">
          <div className="self-center font-JetBrains">
            <div className="HeaderUserName">@{UserName}</div>
          </div>
        </div>

        <div className="HeaderSearchDiv">
          <img
            className="mr-2 ml-2 h-4 aspect-square hover:cursor-pointer"
            alt={"Search"}
            src={SearchIcon}
          />
          <input className="HeaderSearchInput" placeholder={"Seach a User"} onClick={UnderDev} />
        </div>

        <div className="mr-2 self-center flex">
          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img
              className="HeaderMenuImages"
              src={MessagesIcon}
              alt={"Messages"}
              onClick={showMessages}
            />
          </div>

          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img
              className="HeaderMenuImages"
              src={UserIcon}
              alt={"User"}
              onClick={() => navigate("/UpdateProfile")}
            />
          </div>

          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img
              className="HeaderMenuImages"
              src={LogoutIcon}
              alt={"Logout"}
              onClick={() => {
                localStorage.removeItem("tokenId");
                navigate("/");
              }}
            />
          </div>

          <div className="hidden stablet:block">
            <img
              className="p1 rounded-sm h-6 aspect-square"
              src={MenuIcon}
              alt={"Menu"}
              onClick={() => (mobileMenuRef.current.style.display = "flex")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
