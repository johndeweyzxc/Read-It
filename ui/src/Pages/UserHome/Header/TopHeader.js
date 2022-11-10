import React from "react";

import "./home.css";
import SearchIcon from "./Assets/search-icon.png";
import MessagesIcon from "./Assets/message-icon.png";
import SettingsIcon from "./Assets/settings-icon.png";
import LogoutIcon from "./Assets/logout-icon.png";
import MenuIcon from "./Assets/menu-icon.png";

export default function TopHeaderContent({
  showMessages,
  showSettings,
  showMenu,
  logoutAccount,
  UserNameInfo,
}) {
  const UserHeaderContainer = () => {
    return (
      <div className='flex mr-24 tablet:mr-4 sphone:hidden'>
        <div className='self-center font-JetBrains'>
          <div
            className='text-lg color-white 
          hover:cursor-pointer underline
          phone:text-sm'
          >
            @{UserNameInfo}
          </div>
        </div>
      </div>
    );
  };

  const SearchBarContainer = () => {
    return (
      <div className='SearchDiv'>
        <img
          className='mr-2 ml-2 h-4 aspect-square hover:cursor-pointer'
          alt={"Search"}
          src={SearchIcon}
        />
        <input
          className='SearchInput'
          placeholder={"Seach a User"}
          onClick={() => alert("This feature is under development")}
        />
      </div>
    );
  };

  const HeaderIconsContainer = () => {
    return (
      <div className='mr-2 self-center flex'>
        <div className='mr-4 hover:cursor-pointer stablet:hidden'>
          <img
            className='p-1 rounded-sm h-8 aspect-square hover:bg-BgGrey'
            src={MessagesIcon}
            alt={"Messages"}
            onClick={showMessages}
          />
        </div>

        <div className='mr-4 hover:cursor-pointer stablet:hidden'>
          <img
            className='p-1 rounded-sm h-8 aspect-square hover:bg-BgGrey'
            src={SettingsIcon}
            alt={"Settings"}
            onClick={showSettings}
          />
        </div>

        <div className='mr-4 hover:cursor-pointer stablet:hidden'>
          <img
            className='p-1 rounded-sm h-8 aspect-square hover:bg-BgGrey'
            src={LogoutIcon}
            alt={"Logout"}
            onClick={logoutAccount}
          />
        </div>

        <div className='hidden stablet:block'>
          <img
            className='p1 rounded-sm h-6 aspect-square'
            src={MenuIcon}
            alt={"Menu"}
            onClick={showMenu}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='TextHeader'>Read It</div>
      <UserHeaderContainer />
      <SearchBarContainer />
      <HeaderIconsContainer />
    </>
  );
}
