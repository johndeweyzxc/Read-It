import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import SearchIcon from "./Assets/search-icon.png";
import MessagesIcon from "./Assets/message-icon.png";
import SettingsIcon from "./Assets/settings-icon.png";
import LogoutIcon from "./Assets/logout-icon.png";
import MenuIcon from "./Assets/menu-icon.png";

export default function Header({
  showMessages,
  showSettings,
  showMenu,
  logoutAccount,
  settingsFloatRef,
  UserName,
}) {
  const UnderDev = () => {
    alert("This feature is under development");
  };

  return (
    <div className="fixed z-[2] filter blur-none">
      <div className="HeaderDiv">
        <div className="ReadIt">Read It</div>

        <div className="flex mr-24 tablet:mr-4 sphone:hidden">
          <div className="self-center font-JetBrains">
            <div className="HeaderUserName">@{UserName}</div>
          </div>
        </div>

        <div className="SearchDiv">
          <img
            className="mr-2 ml-2 h-4 aspect-square hover:cursor-pointer"
            alt={"Search"}
            src={SearchIcon}
          />
          <input className="SearchInput" placeholder={"Seach a User"} onClick={UnderDev} />
        </div>

        <div className="mr-2 self-center flex">
          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img className="MenuImages" src={MessagesIcon} alt={"Messages"} onClick={showMessages} />
          </div>

          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img className="MenuImages" src={SettingsIcon} alt={"Settings"} onClick={showSettings} />
          </div>

          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img className="MenuImages" src={LogoutIcon} alt={"Logout"} onClick={logoutAccount} />
          </div>

          <div className="hidden stablet:block">
            <img
              className="p1 rounded-sm h-6 aspect-square"
              src={MenuIcon}
              alt={"Menu"}
              onClick={showMenu}
            />
          </div>
        </div>
      </div>

      <div className="fixed hidden right-16 shadow-sm" ref={settingsFloatRef}>
        <div className="flex flex-col bg-white border-[1px] border-solid border-ShallowGrey">
          <Link to={"/UpdateProfile"} className="MenuButton">
            Update Profile
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className="MenuButton">
            Preferences
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className="MenuButton">
            Privacy Policy
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className="MenuButton">
            Terms and Condition
          </Link>
        </div>
      </div>
    </div>
  );
}
