import React from "react";
import styled from "styled-components";

const Navigations = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  border-bottom: 1px solid #999999c5;
  display: flex;
  justify-content: center;
`;

const NavigationButtons = styled.button`
  margin: 0;
  padding: 0;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: none;
  font-family: "Roboto Mono", monospace;
  letter-spacing: 1px;
  background-color: #fff;
  font-size: 1rem;
  color: #6d6d6dcc;
  &:hover {
    cursor: pointer;
    color: #238aff;
  }
`;

// This is currently under development as there is not use for this.
export default function BotHeaderContent() {
  return (
    <Navigations>
      <NavigationButtons>OVERVIEW</NavigationButtons>
      <NavigationButtons>POSTS</NavigationButtons>
      <NavigationButtons>COMMENTS</NavigationButtons>
      <NavigationButtons>SAVED</NavigationButtons>
      <NavigationButtons>LIKED</NavigationButtons>
    </Navigations>
  );
}
