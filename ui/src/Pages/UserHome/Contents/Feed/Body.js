import React from "react";
import styled from "styled-components";

const BodyDiv = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-family: "JetBrains mono", monospace;
  @media screen and (max-width: 720px) {
    font-size: 0.8rem;
  }
`;

export default function Body({ Content }) {
  return <BodyDiv>{Content}</BodyDiv>;
}
