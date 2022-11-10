import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const SettingsDiv = styled.div`
  position: fixed;
  display: none;
  right: 4rem;
  box-shadow: 0 0 2px;
`;

export const SettingsButtons = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #7c7c7c;
`;

export const Buttons = styled(Link)`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  font-family: "Noto Sans", monospace;
  &:hover {
    cursor: pointer;
    background-color: #b4b4b477;
  }
`;

// This is a popped out list of navigations when settings is clicked from the header
export default function Settings({settingsFloatRef}) {
  const UnderDev = () => {
    alert("This feature is under development");
  };

  return (
    <SettingsDiv ref={settingsFloatRef}>
      <SettingsButtons>
        <Buttons to={"/UpdateProfile"}>Update Profile</Buttons>
        <Buttons to={"/Home"} onClick={UnderDev}>
          Preferences
        </Buttons>
        <Buttons to={"/Home"} onClick={UnderDev}>
          Privacy Policy
        </Buttons>
        <Buttons to={"/Home"} onClick={UnderDev}>
          Terms and Condition
        </Buttons>
      </SettingsButtons>
    </SettingsDiv>
  );
}
