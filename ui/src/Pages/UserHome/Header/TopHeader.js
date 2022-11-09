import React from "react";
import styled from "styled-components";
import SearchIcon from "./Assets/search-icon.png";
import MessagesIcon from "./Assets/message-icon.png";
import SettingsIcon from "./Assets/settings-icon.png";
import LogoutIcon from "./Assets/logout-icon.png";
import MenuIcon from "./Assets/menu-icon.png";

const TextHeader = styled.div`
  margin-right: 4rem;
  min-height: 5vh;
  font-size: 2rem;
  font-family: "JetBrains mono", sans-serif;
  color: #ff4722;
  align-self: center;
  letter-spacing: 1px;
  font-weight: bold;
  display: block;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const UserHeaderInfo = styled.div`
  display: flex;
  margin-right: 6rem;
  @media screen and (max-width: 880px) {
    margin-right: 1rem;
  }
  @media screen and (max-width: 300px) {
    display: none;
  }
`;

const Name = styled.div`
  align-self: center;
  font-family: "JetBrains Mono", monospace; ;
`;

const UserName = styled.div`
  font-size: 1.15rem;
  color: #000;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const SearchDiv = styled.div`
  height: 2rem;
  width: 30vw;
  align-self: center;
  display: flex;
  align-items: center;
  background-color: #d8d8d83f;
  border: 1px solid #d8d8d83f;
  border-radius: 5px;
  margin-right: auto;
  @media screen and (max-width: 880px) {
    width: 40vw;
    margin-right: 2rem;
    flex-grow: 1;
  }
  @media screen and (max-width: 600px) {
    margin-right: 1rem;
  }
  &:hover {
    border: 1px solid #238aff;
  }
`;

const SearchIcons = styled.img`
  margin: 0.5rem;
  height: 1rem;
  aspect-ratio: 1;
  &:hover {
    cursor: pointer;
  }
`;

const SearchText = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: #dbdbdb00;
  font-size: 1rem;
  font-family: "JetBrains Mono", monospace;
  ::placeholder {
    color: #6d6d6dcc;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
    ::placeholder {
      font-size: 0.7rem;
    }
  }
`;

const HeaderIcons = styled.div`
  margin-right: 2rem;
  align-self: center;
  display: flex;
  @media screen and (max-width: 600px) {
    margin-right: 2rem;
  }
`;

const IconsToolTip = styled.div`
  position: absolute;
  padding: 0.5rem;
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 3px;
  font-size: 0.8rem;
  font-family: "JetBrains mono", monospace;
  visibility: hidden;
  display: block;
  letter-spacing: 1px;
  z-index: 1;
`;

const IconsPicture = styled.img`
  padding: 5px;
  border-radius: 3px;
  height: 2rem;
  aspect-ratio: 1;
  &:hover {
    background-color: #b4b4b477;
  }
`;

const Icons = styled.div`
  margin-right: 1rem;
  & ${IconsPicture}:hover + ${IconsToolTip} {
    visibility: visible;
  }
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const MenuIcons = styled.div`
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const MenuIconsPicture = styled.img`
  padding: 5px;
  border-radius: 3px;
  height: 1.5rem;
  aspect-ratio: 1;
`;

export default function TopHeaderContent({
  showMessages,
  showSettings,
  showMenu,
  logoutAccount,
  UserNameInfo,
}) {
  const UserHeaderContainer = () => {
    return (
      <UserHeaderInfo>
        <Name>
          <UserName>@{UserNameInfo}</UserName>
        </Name>
      </UserHeaderInfo>
    );
  };

  const SearchBarContainer = () => {
    return (
      <SearchDiv>
        <SearchIcons src={SearchIcon} />
        <SearchText
          placeholder={"Search a User"}
          onClick={() => {
            alert("This feature is under development");
          }}
        />
      </SearchDiv>
    );
  };

  const HeaderIconsContainer = () => {
    return (
      <HeaderIcons>
        <Icons onClick={showMessages}>
          <IconsPicture src={MessagesIcon} />
          <IconsToolTip>Messages</IconsToolTip>
        </Icons>
        <Icons onClick={showSettings}>
          <IconsPicture src={SettingsIcon} />
          <IconsToolTip>Settings</IconsToolTip>
        </Icons>
        <Icons onClick={logoutAccount}>
          <IconsPicture src={LogoutIcon} />
          <IconsToolTip>Log out</IconsToolTip>
        </Icons>
        <MenuIcons>
          <MenuIconsPicture onClick={showMenu} src={MenuIcon} />
        </MenuIcons>
      </HeaderIcons>
    );
  };

  return (
    <>
      <TextHeader>Read It</TextHeader>
      <UserHeaderContainer />
      <SearchBarContainer />
      <HeaderIconsContainer />
    </>
  );
}
