import styled from "styled-components";

export const HomeDiv = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: auto;
`;

export const LoadingScreen = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 3;
`;

export const LoadingText = styled.div`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  font-family: "JetBrains mono", monospace;
  letter-spacing: 1px;
  text-decoration: underline;
`;
