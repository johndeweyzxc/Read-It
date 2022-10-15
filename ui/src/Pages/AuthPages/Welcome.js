import React from "react";
import styled from "styled-components";

const GreetingsDiv = styled.div`
  margin: 0;
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "JetBrains mono", sans-serif;
`;

const GreetingsText = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 4rem;
  margin-right: 2rem;
  @media screen and (max-width: 970px) {
    margin-left: 2rem;
  }
`;

const ReadItText = styled.div`
  margin: 0;
  padding: 0;
  font-size: 3rem;
  font-weight: bolder;
  letter-spacing: 3px;
  color: #ff4722;
  @media screen and (max-width: 970px) {
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    font-size: 2rem;
  }
`;

const ReadItDescription = styled.div`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #000;
  white-space: nowrap;
  @media screen and (max-width: 500px) {
    white-space: normal;
    text-align: center;
  }
`;

export default function Welcome() {
  return (
    <GreetingsDiv>
      <GreetingsText>
        <ReadItText>Read It</ReadItText>
        <ReadItDescription>
          Express yourself and connect to your friends
        </ReadItDescription>
      </GreetingsText>
    </GreetingsDiv>
  );
}
