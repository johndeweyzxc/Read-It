import React from "react";
import { Link } from "react-router-dom";

import "../home.css";
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
  if (UserName === null || UserName === undefined) {
    alert("Fetch data error, some components might not render properly");
  }

  const UnderDev = () => {
    alert("This feature is under development");
  };

  const UserHeaderContainer = () => {
    return (
      <div className="flex mr-24 tablet:mr-4 sphone:hidden">
        <div className="self-center font-JetBrains">
          <div className="UserName">@{UserName}</div>
        </div>
      </div>
    );
  };

  const SearchBarContainer = () => {
    return (
      <div className="SearchDiv">
        <img
          className="mr-2 ml-2 h-4 aspect-square hover:cursor-pointer"
          alt={"Search"}
          src={SearchIcon}
        />
        <input className="SearchInput" placeholder={"Seach a User"} onClick={UnderDev} />
      </div>
    );
  };

  const HeaderIconsContainer = () => {
    return (
      <div className="mr-2 self-center flex">
        <div className="mr-4 hover:cursor-pointer stablet:hidden">
          <img className="NavImage" src={MessagesIcon} alt={"Messages"} onClick={showMessages} />
        </div>

        <div className="mr-4 hover:cursor-pointer stablet:hidden">
          <img className="NavImage" src={SettingsIcon} alt={"Settings"} onClick={showSettings} />
        </div>

        <div className="mr-4 hover:cursor-pointer stablet:hidden">
          <img className="NavImage" src={LogoutIcon} alt={"Logout"} onClick={logoutAccount} />
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
    );
  };

  const Menus = () => {
    return (
      <div className="fixed hidden right-16 shadow-sm" ref={settingsFloatRef}>
        <div className="flex flex-col bg-white border-[1px] border-solid border-ShallowGrey">
          <Link to={"/UpdateProfile"} className="LinkButton">
            Update Profile
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className="LinkButton">
            Preferences
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className="LinkButton">
            Privacy Policy
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className="LinkButton">
            Terms and Condition
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed z-[2] filter blur-none">
      <div className="HeaderDiv">
        <div className="TextHeader">Read It</div>
        <UserHeaderContainer />
        <SearchBarContainer />
        <HeaderIconsContainer />
      </div>
      <Menus />
    </div>
  );
}
