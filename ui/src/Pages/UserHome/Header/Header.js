// Dependency imports
import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
// App imports
import TopHeader from "./TopHeader";
import "./home.css";

const TopHeaderDiv = styled.div`
  margin: 0;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-width: 100vw;
  display: flex;
  border-bottom: 1px solid #999999c5;
  background-color: #fff;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`;

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

  const Menus = () => {
    return (
      <div className='fixed hidden right-16 shadow-sm' ref={settingsFloatRef}>
        <div className='flex flex-col bg-white border-[1px] border-solid border-ShallowGrey'>
          <Link to={"/UpdateProfile"} className='LinkButton'>
            Update Profile
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className='LinkButton'>
            Preferences
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className='LinkButton'>
            Privacy Policy
          </Link>
          <Link to={"/Home"} onClick={UnderDev} className='LinkButton'>
            Terms and Condition
          </Link>
        </div>
      </div>
    );
  };

  const TopHeaderContainer = () => {
    return (
      <TopHeaderDiv>
        <TopHeader
          showMessages={showMessages}
          showSettings={showSettings}
          showMenu={showMenu}
          logoutAccount={logoutAccount}
          UserNameInfo={UserName}
        />
      </TopHeaderDiv>
    );
  };

  return (
    <div className='fixed z-[2] filter blur-none'>
      <TopHeaderContainer />
      <Menus />
    </div>
  );
}
