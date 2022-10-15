// Dependency imports
import React from "react";
import styled from "styled-components";
// App imports
import TopHeader from "./TopHeader";
// import BotHeader from "./BotHeader";
import Settings from "./Settings";

const HeaderDiv = styled.div`
  position: fixed;
  margin: 0;
  padding: 0;
  z-index: 2;
  filter: blur(0px);
`;

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

// const BotHeaderDiv = styled.div`
//   margin: 0;
//   padding: 0;
//   box-shadow: 0 0 1px;
//   background-color: #fff;
// `;

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

  // This is under development
  // const BotHeaderContainer = () => {
  //   return (
  //     <BotHeaderDiv>
  //       <BotHeader />
  //     </BotHeaderDiv>
  //   );
  // }

  return (
    <HeaderDiv>
      <TopHeaderContainer />
      <Settings settingsFloatRef={settingsFloatRef} />
    </HeaderDiv>
  );
}
